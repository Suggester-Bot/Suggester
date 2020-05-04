const { dbQueryNoNew, dbQuery, dbModify, suggestionEmbed, serverLog, checkConfig, checkChannel, fetchUser } = require("../../coreFunctions.js");
const { emoji, colors, prefix } = require("../../config.json");
module.exports = {
	controls: {
		name: "mark",
		permission: 3,
		aliases: ["status"],
		usage: "mark <suggestion id> <status>",
		description: "Marks a status for a suggestion",
		enabled: true,
		docs: "staff/mark",
		permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS", "USE_EXTERNAL_EMOJIS"],
		cooldown: 10
	},
	do: async (message, client, args, Discord) => {
		let qServerDB = await dbQuery("Server", { id: message.guild.id });
		if (!qServerDB) return message.channel.send(`<:${emoji.x}> You must configure your server to use this command. Please use the \`${prefix}setup\` command.`);

		let missing = checkConfig(qServerDB);

		if (missing.length > 1) {
			let embed = new Discord.MessageEmbed()
				.setDescription(`This command cannot be run because some server configuration elements are missing. A server manager can fix this by using the \`${Discord.escapeMarkdown(qServerDB.config.prefix)}config\` command.`)
				.addField("Missing Elements", `<:${emoji.x}> ${missing.join(`\n<:${emoji.x}> `)}`)
				.setColor(colors.red);
			return message.channel.send(embed);
		}

		let missingPerms = checkChannel(qServerDB.config.channels.suggestions, message.guild.channels.cache, "suggestions", client);
		if (!missingPerms) return message.channel.send(`<:${emoji.x}> Could not find your suggestions channel! Please make sure you have configured a suggestions channel.`);
		if (missingPerms !== true) return message.channel.send(missingPerms);

		let qSuggestionDB = await dbQueryNoNew("Suggestion", { suggestionId: args[0], id: message.guild.id });
		if (!qSuggestionDB) return message.channel.send(`<:${emoji.x}> Please provide a valid suggestion ID!`);

		let id = qSuggestionDB.suggestionId;

		if (qSuggestionDB.status !== "approved") return message.channel.send(`<:${emoji.x}> You can only mark a status on approved suggestions!`);
		if (qSuggestionDB.implemented) return message.channel.send(`<:${emoji.x}> This suggestion has been marked as implemented and moved to the implemented archive channel, so no further actions can be taken on it.`);
		if (!args[1]) return message.channel.send(`<:${emoji.x}> You must provide a valid status.`);

		let statusInfo = [];
		switch (args[1].toLowerCase()) {
		case "implemented":
		case "done":
			if (qSuggestionDB.displayStatus === "implemented") return message.channel.send(`<:${emoji.x}> This suggestion is already marked as implemented.`);
			qSuggestionDB.displayStatus = "implemented";
			statusInfo = [colors.green, "Implemented"];
			break;
		case "working":
		case "progress":
			if (qSuggestionDB.displayStatus === "working") return message.channel.send(`<:${emoji.x}> This suggestion is already marked as in progress.`);
			qSuggestionDB.displayStatus = "working";
			statusInfo = [colors.orange, "In Progress"];
			break;
		case "no":
			if (qSuggestionDB.displayStatus === "no") return message.channel.send(`<:${emoji.x}> This suggestion is already marked as not happening.`);
			qSuggestionDB.displayStatus = "no";
			statusInfo = [colors.gray, "Not Happening"];
			break;
		case "default":
		case "none":
			if (!qSuggestionDB.displayStatus || qSuggestionDB.displayStatus === "default") return message.channel.send(`<:${emoji.x}> This suggestion already has no status.`);
			qSuggestionDB.displayStatus = "default";
			statusInfo = [colors.default, "Default"];
			break;
		default:
			return message.channel.send(`<:${emoji.x}> Please provide a valid status.`);
		}

		let suggester = await fetchUser(qSuggestionDB.suggester, client);
		if (!suggester) return message.channel.send(`<:${emoji.x}> The suggesting user could not be fetched! Please try again.`);

		if (qSuggestionDB.displayStatus === "implemented" && qServerDB.config.channels.archive && client.channels.cache.get(qServerDB.config.channels.archive)) {
			let messageDeleted;
			let suggestionEditEmbed = await suggestionEmbed(qSuggestionDB, qServerDB, client);
			let upCount = "Unknown";
			let downCount = "Unknown";
			await client.channels.cache.get(qServerDB.config.channels.suggestions).messages.fetch(qSuggestionDB.messageId).then(f => {
				if (qSuggestionDB.emojis.up !== "none" && f.reactions.cache.get(qSuggestionDB.emojis.up)) {
					f.reactions.cache.get(qSuggestionDB.emojis.up).me ? upCount = f.reactions.cache.get(qSuggestionDB.emojis.up).count-1 : upCount = f.reactions.cache.get(qSuggestionDB.emojis.up);
				}
				if (qSuggestionDB.emojis.down !== "none" && f.reactions.cache.get(qSuggestionDB.emojis.down)) {
					f.reactions.cache.get(qSuggestionDB.emojis.down).me ? downCount = f.reactions.cache.get(qSuggestionDB.emojis.down).count-1 : downCount = f.reactions.cache.get(qSuggestionDB.emojis.down);
				}
				f.delete();
				messageDeleted = true;
			}).catch(() => messageDeleted = false);

			if (!messageDeleted) return message.channel.send(`<:${emoji.x}> There was an error deleting the suggestion feed message. Please check that the suggestion feed message exists and try again.`);

			if (!isNaN(upCount) && !isNaN(downCount)) {
				let opinion = upCount - downCount;
				suggestionEditEmbed.addField("Vote Counts", `Opinion: ${opinion > 0 ? "+" : ""}${opinion.toString()}\nUpvotes: ${upCount.toString()}\nDownvotes: ${downCount.toString()}`);
			}

			qSuggestionDB.implemented = true;
			await dbModify("Suggestion", {suggestionId: id}, qSuggestionDB);

			client.channels.cache.get(qServerDB.config.channels.archive).send(suggestionEditEmbed).then(async sent => {
				let replyEmbed = new Discord.MessageEmbed()
					.setTitle("Status Edited")
					.setDescription(`${qSuggestionDB.suggestion || "[No Suggestion Content]"}\n[Implemented Archive Post](https://discord.com/channels/${sent.guild.id}/${sent.channel.id}/${sent.id})`)
					.setColor(statusInfo[0])
					.setFooter(`Suggestion ID: ${id.toString()}`)
					.addField("Status", statusInfo[1]);
				message.channel.send(replyEmbed);

				let qUserDB = await dbQuery("User", { id: suggester.id });
				let selfNotify;
				if (suggester.id === message.author.id) qUserDB.selfnotify ? selfNotify = true : selfNotify = false;
				else selfNotify = true;
				if (qSuggestionDB.displayStatus !== "default" && qServerDB.config.notify && qUserDB.notify && selfNotify) {
					let dmEmbed = new Discord.MessageEmbed()
						.setTitle(`The status of your suggestion in **${message.guild.name}** has been edited!`)
						.setDescription(`${qSuggestionDB.suggestion || "[No Suggestion Content]"}\n[Implemented Archive Post](https://discord.com/channels/${sent.guild.id}/${sent.channel.id}/${sent.id})`)
						.addField("Status", statusInfo[1])
						.setColor(statusInfo[0])
						.setFooter(`Suggestion ID: ${id.toString()}`);
					suggester.send(dmEmbed).catch(() => {});
				}

				if (qServerDB.config.channels.log) {
					let logEmbed = new Discord.MessageEmbed()
						.setAuthor(`${message.author.tag} set a status for #${id.toString()}`, message.author.displayAvatarURL({format: "png", dynamic: true}))
						.addField("Suggestion", qSuggestionDB.suggestion || "[No Suggestion Content]")
						.addField("New Status", statusInfo[1])
						.setColor(statusInfo[0])
						.setFooter(`Suggestion ID: ${id.toString()} | Staff Member ID: ${message.author.id}`)
						.setTimestamp();
					serverLog(logEmbed, qServerDB, client);
				}
			});
			return;
		}

		await dbModify("Suggestion", {suggestionId: id}, qSuggestionDB);

		let suggestionEditEmbed = await suggestionEmbed(qSuggestionDB, qServerDB, client);
		let messageEdited;
		await client.channels.cache.get(qServerDB.config.channels.suggestions).messages.fetch(qSuggestionDB.messageId).then(f => {
			f.edit(suggestionEditEmbed);
			messageEdited = true;
		}).catch(() => messageEdited = false);

		if (!messageEdited) return message.channel.send(`<:${emoji.x}> There was an error editing the suggestion feed message. Please check that the suggestion feed message exists and try again.`);

		let replyEmbed = new Discord.MessageEmbed()
			.setTitle("Status Edited")
			.setDescription(`${qSuggestionDB.suggestion || "[No Suggestion Content]"}\n[Suggestions Feed Post](https://discord.com/channels/${qSuggestionDB.id}/${qServerDB.config.channels.suggestions}/${qSuggestionDB.messageId})`)
			.setColor(statusInfo[0])
			.setFooter(`Suggestion ID: ${id.toString()}`)
			.addField("Status", statusInfo[1]);
		message.channel.send(replyEmbed);

		let qUserDB = await dbQuery("User", { id: suggester.id });
		let selfNotify;
		if (suggester.id === message.author.id) qUserDB.selfnotify ? selfNotify = true : selfNotify = false;
		else selfNotify = true;
		if (qSuggestionDB.displayStatus !== "default" && qServerDB.config.notify && qUserDB.notify && selfNotify) {
			let dmEmbed = new Discord.MessageEmbed()
				.setTitle(`The status of your suggestion in **${message.guild.name}** has been edited!`)
				.setDescription(`${qSuggestionDB.suggestion || "[No Suggestion Content]"}\n[Suggestions Feed Post](https://discord.com/channels/${qSuggestionDB.id}/${qServerDB.config.channels.suggestions}/${qSuggestionDB.messageId})`)
				.addField("Status", statusInfo[1])
				.setColor(statusInfo[0])
				.setFooter(`Suggestion ID: ${id.toString()}`);
			suggester.send(dmEmbed).catch(() => {});
		}

		if (qServerDB.config.channels.log) {
			let logEmbed = new Discord.MessageEmbed()
				.setAuthor(`${message.author.tag} set a status for #${id.toString()}`, message.author.displayAvatarURL({format: "png", dynamic: true}))
				.addField("Suggestion", qSuggestionDB.suggestion || "[No Suggestion Content]")
				.addField("New Status", statusInfo[1])
				.setColor(statusInfo[0])
				.setFooter(`Suggestion ID: ${id.toString()} | Staff Member ID: ${message.author.id}`)
				.setTimestamp();
			serverLog(logEmbed, qServerDB, client);
		}

	}
};
