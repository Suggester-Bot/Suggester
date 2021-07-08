const { emoji } = require("../../config.json");
const { suggestionEmbed, reviewEmbed, logEmbed } = require("../../utils/misc");
const { dbQuery, dbModify, dbQueryAll } = require("../../utils/db");
const { checkPermissions, channelPermissions, checkConfig, checkReview } = require("../../utils/checks");
const { serverLog, mediaLog } = require("../../utils/logs");
const { Suggestion } = require("../../utils/schemas");
const { checkURL } = require("../../utils/checks");
const { cleanCommand } = require("../../utils/actions");
const { string } = require("../../utils/strings");
const lngDetector = new (require("languagedetect"));
const humanizeDuration = require("humanize-duration");
const { initTrello } = require("../../utils/trello");

module.exports = {
	controls: {
		name: "suggest",
		permission: 10,
		aliases: ["submit", "suggestion"],
		usage: "suggest [suggestion]",
		description: "Submits a suggestion",
		image: "images/Suggest.gif",
		enabled: true,
		examples: "`{{p}}suggest This is a suggestion`\nSubmits a suggestion\n\nYou can also attach images to your suggestion by uploading an image when you send the command",
		permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS", "USE_EXTERNAL_EMOJIS"],
		cooldown: 20,
		docs: "sumup"
	},
	do: async (locale, message, client, args, Discord, noCommand=false) => {
		let qServerDB = await dbQuery("Server", { id: message.guild.id });
		if (!qServerDB) return message.channel.send(string(locale, "UNCONFIGURED_ERROR", {}, "error"));
		const guildLocale = qServerDB.config.locale;

		let missingConfig = await checkConfig(locale, qServerDB, client);
		if (missingConfig) return message.channel.send(missingConfig);

		let permission = await checkPermissions(message.member, client);

		if (qServerDB.config.allowed_roles && qServerDB.config.allowed_roles.length > 0 && permission > 3) {
			if (!qServerDB.config.allowed_roles.some(r => message.member.roles.cache.has(r))) {
				let roleIds = [...new Set(qServerDB.config.allowed_roles.concat(qServerDB.config.staff_roles), qServerDB.config.admin_roles)];
				let roles = roleIds.map(roleId => {
					if (message.guild.roles.cache.get(roleId)) {
						return {
							name: message.guild.roles.cache.get(roleId).name,
							id: message.guild.roles.cache.get(roleId).id
						};
					}
				});
				return message.channel.send(string(locale, "NO_ALLOWED_ROLE_ERROR", { roleList: roles.map(r => r.name).join(", ") }, "error"), {disableMentions: "everyone"}).then(sent => {
					cleanCommand(message, sent, qServerDB, noCommand);
				});
			}
		}

		let channels = qServerDB.config.channels.commands_new;
		if (qServerDB.config.channels.commands) channels.push(qServerDB.config.channels.commands);
		if (channels.length > 0 && !channels.includes(message.channel.id) && !noCommand) {
			return message.channel.send(string(locale, "SUBMIT_NOT_COMMAND_CHANNEL_ERROR", { channels: channels.map(c => `<#${c}>`).join(", ") }, "error")).then(sent => cleanCommand(message, sent, qServerDB, noCommand));
		}

		if (qServerDB.config.suggestion_cooldown && !qServerDB.config.cooldown_exempt.includes(message.author.id) && permission > 3) {
			let foundCooldown = (await dbQueryAll("Suggestion", { id: message.guild.id, suggester: message.author.id, submitted: { "$gte": new Date(Date.now()-qServerDB.config.suggestion_cooldown) } })).sort((a, b) => b.submitted - a.submitted)[0];
			if (foundCooldown) return message.channel.send(string(locale, "CUSTOM_COOLDOWN_FLAG", { time: humanizeDuration(qServerDB.config.suggestion_cooldown+(new Date(foundCooldown.submitted).getTime())-Date.now(), { language: locale, fallbacks: ["en"] }) }, "error")).then(sent => cleanCommand(message, sent, qServerDB, noCommand));
		}

		if (qServerDB.config.suggestion_cap && permission > 3) {
			if ((await dbQueryAll("Suggestion", { id: message.guild.id, status: "approved", implemented: false } )).length >= qServerDB.config.suggestion_cap) return message.channel.send(string(locale, "CAP_REACHED_ERROR", { cap: qServerDB.config.suggestion_cap }, "error"));
		}

		let attachment = message.attachments.first() ? message.attachments.first().url : "";
		if (!args.join(" ").trim() && !attachment) return message.channel.send(string(locale, "NO_SUGGESTION_ERROR", {}, "error")).then(sent => cleanCommand(message, sent, qServerDB, noCommand));
		if (attachment && !(checkURL(attachment))) return message.channel.send(string(locale, "INVALID_AVATAR_ERROR", {}, "error")).then(sent => cleanCommand(message, sent, qServerDB, noCommand));

		let suggestion = args.join(" ");

		if (suggestion.length > 1900) return message.channel.send(string(locale, "TOO_LONG_SUGGESTION_ERROR_NEW", {}, "error")).then(sent => cleanCommand(message, sent, qServerDB, noCommand));

		let id = await Suggestion.countDocuments() + 1;

		if (attachment) {
			const res = await mediaLog(message, id, attachment)
				.catch(console.error);

			if (res && res.code === 40005) return message.channel.send(string(locale, "ATTACHMENT_TOO_BIG", {}, "error")).then(sent => cleanCommand(message, sent, qServerDB, noCommand));

			if (!res || !res.attachments || !res.attachments[0]) return message.channel.send(string(locale, "ERROR", {}, "error")).then(sent => cleanCommand(message, sent, qServerDB, noCommand));

			attachment = res.attachments[0].url;
		}

		//Review
		if (qServerDB.config.mode === "review") {
			let checkStaff = checkReview(locale, message.guild, qServerDB);
			if (checkStaff) return message.channel.send(checkStaff);

			let newSuggestion = await new Suggestion({
				id: message.guild.id,
				suggester: message.author.id,
				suggestion,
				status: "awaiting_review",
				suggestionId: id,
				attachment,
				submitted: new Date()
			}).save();

			let qSuggestionDB = await dbQuery("Suggestion", { suggestionId: id, id: message.guild.id });
			if (!qSuggestionDB) return message.channel.send(string(locale, "ERROR", {}, "error"));

			let replyEmbed = new Discord.MessageEmbed()
				.setAuthor(string(locale, "SUGGESTION_FROM_TITLE", { user: message.author.tag }), message.author.displayAvatarURL({dynamic: true, format: "png"}))
				.setDescription(suggestion)
				.setFooter(string(locale, "SUGGESTION_FOOTER", { id: id.toString() }))
				.setTimestamp()
				.setColor(client.colors.default)
				.setImage(attachment);
			message.channel.send(string(locale, "SUGGESTION_SUBMITTED_STAFF_REVIEW_SUCCESS"), replyEmbed).then(sent => cleanCommand(message, sent, qServerDB, noCommand));

			let embedReview = reviewEmbed(guildLocale, qSuggestionDB, message.author, "yellow");
			embedReview.addField(string(guildLocale, "APPROVE_DENY_HEADER"), string(guildLocale, "REVIEW_COMMAND_INFO_NEW", { approve: `<:${emoji.check}>`, deny: `<:${emoji.x}>`, channel: `<#${qServerDB.config.channels.suggestions}>` }));

			let reviewMessage = await client.channels.cache.get(qServerDB.config.channels.staff).send(qServerDB.config.ping_role ? (qServerDB.config.ping_role === message.guild.id ? "@everyone" : `<@&${qServerDB.config.ping_role}>`) : "", { embed: embedReview, disableMentions: "none" });
			client.reactInProgress = true;
			await reviewMessage.react(emoji.check).then(() => newSuggestion.reviewEmojis.approve = emoji.check);
			await reviewMessage.react(emoji.x).then(() => newSuggestion.reviewEmojis.deny = emoji.x);
			newSuggestion.reviewMessage = reviewMessage.id;
			newSuggestion.channels.staff = reviewMessage.channel.id;
			await dbModify("Suggestion", { suggestionId: id, id: message.guild.id }, newSuggestion);
			client.reactInProgress = false;

			if (qServerDB.config.channels.log) {
				let embedLog = logEmbed(guildLocale, qSuggestionDB, message.author, "LOG_SUGGESTION_SUBMITTED_REVIEW_TITLE", "yellow")
					.setDescription(suggestion || string(locale, "NO_SUGGESTION_CONTENT"));
				if (attachment) {
					embedLog.setImage(attachment)
						.addField(string(locale, "WITH_ATTACHMENT_HEADER"), attachment);
				}

				serverLog(embedLog, qServerDB, client);
			}

			if (qServerDB.config.trello.board && qServerDB.config.trello.actions.find(a => a.action === "suggest")) {
				const t = initTrello();
				let c = await t.addCard(qSuggestionDB.suggestion, string(guildLocale, "SUGGESTION_TRELLO_INFO", {
					user: message.author.tag,
					id: message.author.id,
					sid: qSuggestionDB.suggestionId
				}), qServerDB.config.trello.actions.find(a => a.action === "suggest").id).catch(() => null);
				if (c) {
					qSuggestionDB.trello_card = c.id;
					qSuggestionDB.save();
					if (qSuggestionDB.attachment) await t.addAttachmentToCard(c.id, qSuggestionDB.attachment).then(a => {
						qSuggestionDB.trello_attach_id = a.id;
						qSuggestionDB.save();
					}).catch(() => null);
				}
			}
		} else if (qServerDB.config.mode === "autoapprove") {
			if (client.channels.cache.get(qServerDB.config.channels.suggestions)) {
				let perms = channelPermissions(locale,  "suggestions", client.channels.cache.get(qServerDB.config.channels.suggestions), client);
				if (perms) return message.channel.send(perms);
			} else return message.channel.send(string(locale, "NO_SUGGESTION_CHANNEL_ERROR", {}, "error"));

			let qSuggestionDB = await new Suggestion({
				id: message.guild.id,
				suggester: message.author.id,
				suggestion,
				status: "approved",
				suggestionId: id,
				staff_member: client.user.id,
				attachment,
				submitted: new Date()
			}).save();

			let embedSuggest = await suggestionEmbed(guildLocale, qSuggestionDB, qServerDB, client);
			client.channels.cache.get(qServerDB.config.channels.suggestions)
				.send(qServerDB.config.feed_ping_role ? (qServerDB.config.feed_ping_role === message.guild.id ? "@everyone" : `<@&${qServerDB.config.feed_ping_role}>`) : "", { embed: embedSuggest, disableMentions: "none" })
				.then(async (posted) => {
					qSuggestionDB.messageId = posted.id;
					qSuggestionDB.channels.suggestions = posted.channel.id;

					if (qServerDB.config.react) {
						client.reactInProgress = true;
						let reactEmojiUp = qServerDB.config.emojis.up;
						let reactEmojiMid = qServerDB.config.emojis.mid;
						let reactEmojiDown = qServerDB.config.emojis.down;
						if (reactEmojiUp !== "none") await posted.react(reactEmojiUp).catch(async () => {
							await posted.react("👍");
							reactEmojiUp = "👍";
						});
						if (reactEmojiMid !== "none") await posted.react(reactEmojiMid).catch(async () => {
							await posted.react("🤷");
							reactEmojiMid = "🤷";
						});
						if (reactEmojiDown !== "none") await posted.react(reactEmojiDown).catch(async () => {
							await posted.react("👎");
							reactEmojiDown = "👎";
						});
						qSuggestionDB.emojis = {
							up: reactEmojiUp,
							mid: reactEmojiMid,
							down: reactEmojiDown
						};
					}

					if (qServerDB.config.trello.board && qServerDB.config.trello.actions.find(a => a.action === "suggest")) {
						const t = initTrello();
						let c = await t.addCard(qSuggestionDB.suggestion, string(guildLocale, "SUGGESTION_TRELLO_INFO", {
							user: message.author.tag,
							id: message.author.id,
							sid: qSuggestionDB.suggestionId
						}), qServerDB.config.trello.actions.find(a => a.action === "suggest").id).catch(() => null);
						if (c) {
							qSuggestionDB.trello_card = c.id;
							if (qSuggestionDB.attachment) await t.addAttachmentToCard(c.id, qSuggestionDB.attachment).then(a => {
								qSuggestionDB.trello_attach_id = a.id;
								qSuggestionDB.save();
							}).catch(() => null);
							t.addAttachmentToCard(c.id, `https://discord.com/channels/${qSuggestionDB.id}/${qSuggestionDB.channels.suggestions || qServerDB.config.channels.suggestions}/${qSuggestionDB.messageId}`).catch(() => null);
						}
					}

					await dbModify("Suggestion", { suggestionId: id, id: message.guild.id }, qSuggestionDB);
					client.reactInProgress = false;
				});

			let replyEmbed = new Discord.MessageEmbed()
				.setAuthor(string(locale, "SUGGESTION_FROM_TITLE", { user: message.author.tag }), message.author.displayAvatarURL({format: "png", dynamic: true}))
				.setDescription(suggestion || string(locale, "NO_SUGGESTION_CONTENT"))
				.setFooter(string(locale, "SUGGESTION_FOOTER", { id: id.toString() }))
				.setTimestamp()
				.setColor(client.colors.default)
				.setImage(attachment);
			message.channel.send(string(locale, "SUGGESTION_SUBMITTED_AUTOAPPROVE_SUCCESS", { channel: `<#${qServerDB.config.channels.suggestions}>` }), replyEmbed).then(sent => cleanCommand(message, sent, qServerDB, noCommand));

			if (qServerDB.config.channels.log) {
				let embedLog = logEmbed(guildLocale, qSuggestionDB, message.author, "LOG_SUGGESTION_SUBMITTED_AUTOAPPROVE_TITLE", "green")
					.setDescription(suggestion || string(guildLocale, "NO_SUGGESTION_CONTENT"));
				if (attachment) {
					embedLog.setImage(attachment)
						.addField(string(guildLocale, "WITH_ATTACHMENT_HEADER"), attachment);
				}

				serverLog(embedLog, qServerDB, client);
			}
		}
		if (suggestion) {
			if (qServerDB.config.cooldown_exempt.includes(message.author.id)) {
				qServerDB.config.cooldown_exempt.splice(qServerDB.config.cooldown_exempt.findIndex(u => u === message.author.id), 1);
				await qServerDB.save();
			}

			lngDetector.setLanguageType("iso2");
			let detected = lngDetector.detect(suggestion)[0];
			if (detected && detected[1] > .3 && client.locales.find(l => l.settings.code === detected[0])) {
				return { protip: { locale: detected[0], force: "locale" } };
			}
		}
	}
};
