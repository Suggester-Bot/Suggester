const { emoji } = require("../config.json");
module.exports = {
	/**
	 * Translate something
	 * @param {string}locale The locale to use
	 * @param {string} string_name The string to use
	 * @param {object} [replaced] Stuff to replace
	 * @param {string} [prefix_with] Prefix the string with something
	 * @param {string} [suffix_with] Suffix the string with something
	 * @returns {string}
	 */
	string: function (locale, string_name, replaced, prefix_with, suffix_with) {
		const { list } = require(`../i18n/${locale}`);
		const defaultList = module.exports.list;
		const string = defaultList[string_name];
		if (!string) return null;
		let newString = list[string_name] || string.string;
		if (string.replaced) {
			Object.keys(string.replaced).forEach(r => {
				if (replaced && replaced[r]) newString = newString.replace(new RegExp(string.replaced[r].to_replace, "g"), replaced[r]);
			});
		}
		if (prefix_with) {
			switch (prefix_with) {
			case "success":
				newString = `<:${emoji.check}> ${newString}`;
				break;
			case "error":
				newString = `<:${emoji.x}> ${newString}`;
				break;
			default:
				newString = `${prefix_with} ${newString}`;
				break;
			}
		}
		if (suffix_with) {
			switch (suffix_with) {
			default:
				newString = `${newString} ${suffix_with}`;
			}
		}
		return newString;
	},
	list: {
		"NO_ACK_SET": {
			string: "No Acknowledgement Set",
			context: "Shown in the acknowledgement command when no acknowledgement is set for a user"
		},
		"ACK_FILLER_TEXT": {
			string: "{{user}}'s acknowledgement is: `{{acknowledgement}}`",
			context: "Shows a user's acknowledgement",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "The tag of a user"
				},
				acknowledgement: {
					to_replace: "{{acknowledgement}}",
					description: "The acknowledgement set for a user"
				}
			}
		},
		"ACK_RESET_SUCCESS": {
			string: "{{user}}'s acknowledgement has been reset.",
			context: "Shows after user's name when the acknowledgement has been reset",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "The tag of a user"
				}
			}
		},
		"ACK_SET_SUCCESS": {
			string: "Set `{{user}}`'s acknowledgement to **{{acknowledgement}}**.",
			context: "Text showing that the acknowledgement has been set for a user",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "The tag of a user"
				},
				acknowledgement: {
					to_replace: "{{acknowledgement}}",
					description: "The acknowledgement set for a user"
				}
			}
		},
		"NO_STATUS_ERROR": {
			string: "You must specify a valid status!",
			context: "Error that shows when the botconfig or mark commands are run without any status parameter"
		},
		"NONE_OR_INVALID_STATUS_ERROR": {
			string: "You provided none or an invalid status. Please choose a reaction below to select a status, or {{x}} to cancel.\n\n>>> **Status List:**\n{{list}}",
			context: "Error that shows when the mark command is run without any status parameter",
			replaced: {
				x: {
					to_replace: "{{x}}",
					description: "The x emoji"
				},
				list: {
					to_replace: "{{list}}",
					description: "The list of statuses"
				}
			}
		},
		"INVALID_AVATAR_ERROR": {
			string: "Please provide a valid image URL! Images can have extensions of `jpeg`, `jpg`, `png`, or `gif`",
			context: "Error that shows when the avatar specified is invalid"
		},
		"NO_DB_PARAMS_SPECIFIED_ERROR": {
			string: "You must specify whether to query or modify, a collection name, query field, and query value.",
			context: "Shown in the db command when not enough parameters are specified"
		},
		"INVALID_COLLECTION_ERROR": {
			string: "Collection {{collection}} is invalid.",
			context: "Shown when the collection specified in the db command is not a valid database collection",
			replaced: {
				collection: {
					to_replace: "{{collection}}",
					description: "The name of a database collection"
				}
			}
		},
		"NO_MODIFICATION_PARAMS_ERROR": {
			string: "You must specify modification parameters!",
			context: "Shown when trying to modify the database with no modification parameters"
		},
		"DB_EMBED_TITLE_MODIFIED": {
			string: "Database Modified",
			context: "Title of the db command embed if the database was modified"
		},
		"DB_EMBED_TITLE_QUERY": {
			string: "Database Query",
			context: "Title of the db command embed if the database was queried"
		},
		"DB_EMBED_QUERY_INFO": {
			string: "**Collection:** {{collection}}\n**Query:** {{query}}",
			context: "Description of the db command embed which shows the query information",
			replaced: {
				collection: {
					to_replace: "{{collection}}",
					description: "Collection name"
				},
				query: {
					to_replace: "{{query}}",
					description: "Query object"
				}
			}
		},
		"DB_EMBED_MODIFY_INFO": {
			string: "**Field:** {{field}}\n**Old Value:** {{oldValue}}\n**New Value:** {{newValue}}",
			context: "Information that shows if the database was modified",
			replaced: {
				field: {
					to_replace: "{{field}}",
					description: "Field name"
				},
				oldValue: {
					to_replace: "{{oldValue}}",
					description: "Old value of field"
				},
				newValue: {
					to_replace: "{{newValue}}",
					description: "New value of field"
				}
			}
		},
		"DB_NO_RESULT_FOUND": {
			string: "No Result Found",
			context: "Shows when no result is found in the database"
		},
		"RESULT_FIELD_TITLE": {
			string: "Result",
			context: "The result of a command"
		},
		"DEPLOY_NOT_PRODUCTION": {
			string: "I am not running in the production environment. You probably don't want to deploy now.",
			context: "Error produced when the bot is not running in the production environment and a deploy is attempted"
		},
		"PROCESSING": {
			string: "Processing... this may take a moment",
			context: "String used when the bot is processing an input"
		},
		"CANCELLED": {
			string: "Cancelled",
			context: "String used when an action is cancelled"
		},
		"CLOSED": {
			string: "Closed",
			context: "String used when an embed is closed"
		},
		"SPECIFY_USER_OR_GUILD_ERROR": {
			string: "You must specify `user` or `guild`",
			context: "Error sent when the specified flag type is invalid"
		},
		"USER_FLAGS_LIST": {
			string: "{{user}}'s flags are: `{{flags}}`",
			context: "String used for listing user flags",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "The tag of a user"
				},
				flags: {
					to_replace: "{{flags}}",
					description: "List of user flags"
				}
			}
		},
		"NO_FLAGS_SET": {
			string: "No Flags Set",
			context: "String shown when no flags are set for a user"
		},
		"NO_FLAG_SPECIFIED_ERROR": {
			string: "You must specify a flag!",
			context: "Error shown when no flag is specified"
		},
		"FLAG_ALREADY_PRESENT_ERROR": {
			string: "Flag {{flag}} is already present.",
			context: "Shown when a flag is already added to a user/guild",
			replaced: {
				flag: {
					to_replace: "{{flag}}",
					description: "The flag specified by the user"
				}
			}
		},
		"FLAG_NOT_PRESENT_ERROR": {
			string: "Flag {{flag}} is not present.",
			context: "Shown when a flag is not currently added to a user/guild",
			replaced: {
				flag: {
					to_replace: "{{flag}}",
					description: "The flag specified by the user"
				}
			}
		},
		"ADD_REMOVE_INVALID_ACTION_ERROR": {
			string: "You must specify `add` or `remove`.",
			context: "Error shown when an invalid action is specified in the flag command"
		},
		"FLAG_ADDED_USER_SUCCESS": {
			string: "Flag `{{flag}}` added to {{user}}",
			context: "Message shown when a flag is added to a user",
			replaced: {
				flag: {
					to_replace: "{{flag}}",
					description: "The flag specified by the user"
				},
				user: {
					to_replace: "{{user}}",
					description: "The tag of a user"
				}
			}
		},
		"FLAG_REMOVED_USER_SUCCESS": {
			string: "Flag `{{flag}}` removed from {{user}}",
			context: "Message shown when a flag is removed from a user",
			replaced: {
				flag: {
					to_replace: "{{flag}}",
					description: "The flag specified by the user"
				},
				user: {
					to_replace: "{{user}}",
					description: "The tag of a user"
				}
			}
		},
		"INVALID_GUILD_ID_ERROR": {
			string: "Invalid guild ID",
			context: "String used when a specified guild ID is invalid"
		},
		"GUILD_FLAGS_LIST": {
			string: "Guild `{{guild}}` has the following flags: `{{flags}}`",
			context: "String used for listing guild flags",
			replaced: {
				guild: {
					to_replace: "{{guild}}",
					description: "The ID of a guild"
				},
				flags: {
					to_replace: "{{flags}}",
					description: "List of user flags"
				}
			}
		},
		"FLAG_ADDED_GUILD_SUCCESS": {
			string: "Flag `{{flag}}` added to guild `{{guild}}`",
			context: "Message shown when a flag is added to a guild",
			replaced: {
				flag: {
					to_replace: "{{flag}}",
					description: "The flag specified by the user"
				},
				guild: {
					to_replace: "{{guild}}",
					description: "The ID of a guild"
				}
			}
		},
		"FLAG_REMOVED_GUILD_SUCCESS": {
			string: "Flag `{{flag}}` removed from guild `{{guild}}`",
			context: "Message shown when a flag is removed from a guild",
			replaced: {
				flag: {
					to_replace: "{{flag}}",
					description: "The flag specified by the user"
				},
				guild: {
					to_replace: "{{guild}}",
					description: "The ID of a guild"
				}
			}
		},
		"INVALID_USER_ERROR": {
			string: "You must specify a valid user!",
			context: "String used when no/an invalid user is specified in a command"
		},
		"INVALID_MEMBER_ERROR": {
			string: "You must specify a valid member!",
			context: "String used when an invalid member is specified in a command"
		},
		"INVALID_GLOBALBAN_NEW_PARAMS_ERROR": {
			string: "Invalid block setting. Use `true` to block and `false` to unblock.",
			context: "Error produced when globalban is run with an invalid block setting"
		},
		"IS_GLOBALLY_BANNED": {
			string: "{{banned}} is globally blocked.",
			context: "String used when a user/guild is globally blocked",
			replaced: {
				banned: {
					to_replace: "{{banned}}",
					description: "The user/guild identifier"
				}
			}
		},
		"IS_NOT_GLOBALLY_BANNED": {
			string: "{{banned}} is not globally blocked.",
			context: "String used when a user/guild is not globally blocked",
			replaced: {
				banned: {
					to_replace: "{{banned}}",
					description: "The user/guild identifier"
				}
			}
		},
		"USER_PROTECTED_NEW_ERROR": {
			string: "This user is protected and cannot be blocked.",
			context: "Error shown when a user is protected and someone attempts to globally block them"
		},
		"GUILD_PROTECTED_NEW_ERROR": {
			string: "This guild is protected and cannot be blocked.",
			context: "Error shown when a guild is protected and someone attempts to globally block it"
		},
		"GUILD_ALLOWLIST_ADD_SUCCESS": {
			string: "Added guild with ID `{{guild}}` to the allowed list",
			context: "Success message when a guild is allowlisted",
			replaced: {
				guild: {
					to_replace: "{{guild}}",
					description: "The ID of a guild"
				}
			}
		},
		"GUILD_ALLOWLIST_REMOVE_SUCCESS": {
			string: "Removed guild with ID `{{guild}}` from the allowed list",
			context: "Success message when a guild is unallowlisted",
			replaced: {
				guild: {
					to_replace: "{{guild}}",
					description: "The ID of a guild"
				}
			}
		},
		"NO_GUILD_DATABASE_ENTRY_ERROR": {
			string: "This guild does not have a database entry!",
			context: "String used when a guild does not have a database entry for fetching data through global commands"
		},
		"NONE_CONFIGURED": {
			string: "None Configured",
			context: "Used when a configuration element is not configured"
		},
		"NONE": {
			string: "None",
			context: "Filler for when there is none of something"
		},
		"CFG_VOTING_ROLES_APPEND": {
			string: "(all users can vote on suggestions)",
			context: "Appended to the end of the configuration value for voting roles if none are configured"
		},
		"CFG_VOTING_ROLES_APPEND_NOW": {
			string: "(All users can now vote on suggestions)",
			context: "Appended to the end of the role removed message when no more voting roles exist"
		},
		"CFG_REVIEW_NOT_NECESSARY_APPEND": {
			string: "(Unnecessary because the mode is set to autoapprove)",
			context: "Appended to the end of the review channel configuration element when none is set and the mode is set to autoapprove"
		},
		"CFG_COMMANDS_CHANNEL_APPEND": {
			string: "(Suggestions can be made in all channels)",
			context: "Appended to the end of the commands channel configuration value if none is specified"
		},
		"CFG_UPVOTE_REACTION_DISABLED": {
			string: "(Upvote Reaction Disabled)",
			context: "Shown when the upvote reaction config element is disabled"
		},
		"CFG_MID_REACTION_DISABLED": {
			string: "(Shrug/No Opinion Reaction Disabled)",
			context: "Shown when the shrug/no opinion reaction config element is disabled"
		},
		"CFG_DOWNVOTE_REACTION_DISABLED": {
			string: "(Downvote Reaction Disabled)",
			context: "Shown when the downvote reaction config element is disabled"
		},
		"ENABLED": {
			string: "Enabled",
			context: "Used when something is enabled"
		},
		"DISABLED": {
			string: "Disabled",
			context: "Used when something is disabled"
		},
		"CFG_MODE_REVIEW": {
			string: "All suggestions are held for review",
			context: "Shown when the mode is set to review"
		},
		"CFG_MODE_AUTOAPPROVE": {
			string: "All suggestions are automatically approved",
			context: "Shown when the mode is set to autoapprove"
		},
		"ERROR": {
			string: "An error occurred. Please try again.",
			context: "Used when an unknown error occurs."
		},
		"SERVER_CONFIGURATION_TITLE": {
			string: "Server Configuration for {{server}}",
			context: "Title for the configuration list embed",
			replaced: {
				server: {
					to_replace: "{{server}}",
					description: "A server name"
				}
			}
		},
		"ROLE_CONFIGURATION_TITLE": {
			string: "Role Configuration",
			context: "Title for the Role Configuration field of the configuration list"
		},
		"CHANNEL_CONFIGURATION_TITLE": {
			string: "Channel Configuration",
			context: "Title for the Channel Configuration field of the configuration list"
		},
		"OTHER_CONFIGURATION_TITLE": {
			string: "Other Configuration",
			context: "Title for the Other Configuration field of the configuration list"
		},
		"TRELLO_CONFIGURATION_TITLE": {
			string: "Trello Configuration",
			context: "Title for the Trello Configuration field of the configuration list"
		},
		"CFG_STATUS_TITLE": {
			string: "Config Status",
			context: "Title for the Config Status field of the configuration list"
		},
		"CFG_STATUS_GOOD": {
			string: "Bot configured, commands will work",
			context: "Shown when the bot is configured enough to work"
		},
		"CFG_STATUS_BAD": {
			string: "Not fully configured, bot will not work",
			context: "Shown when the bot is not configured enough to work"
		},
		"CFG_PERMISSIONS_TITLE": {
			string: "Bot Permissions",
			context: "Title for the Bot Permissions field of the configuration list"
		},
		"CFG_FLAGS_TITLE": {
			string: "Server Flags",
			context: "Title for the Server Flags field of the configuration list"
		},
		"PAGINATION_NAVIGATION_INSTRUCTIONS": {
			string: "Use the arrow reactions to navigate pages, and the ⏹ reaction to close the embed",
			context: "Included in pagination embeds to give instructions on how to navigate pages"
		},
		"PAGINATION_PAGE_COUNT": {
			string: "Page {{current}}/{{total}}",
			context: "Included in pagination embeds to show the number of pages and the current page",
			replaced: {
				current: {
					to_replace: "{{current}}",
					description: "The current page number"
				},
				total: {
					to_replace: "{{total}}",
					description: "The total number of pages"
				}
			}
		},
		"CHANGELOG_RELEASED_FOOTER": {
			string: "Changelog released at",
			context: "Included in pagination embeds to give instructions on how to navigate pages"
		},
		"CHANGELOG_EMBED_HEADER": {
			string: "Changelog: {{version}}",
			context: "The title of the changelog embed",
			replaced: {
				version: {
					to_replace: "{{version}}",
					description: "The version number of the latest release"
				}
			}
		},
		"HELP_AUTHOR": {
			string: "{{name}} Help",
			context: "Author title for the help embed",
			replaced: {
				name: {
					to_replace: "{{name}}",
					description: "The bot name"
				}
			}
		},
		"HELP_MODULE_TITLE": {
			string: "Module: {{module}}",
			context: "Title for the module in the help embed",
			replaced: {
				module: {
					to_replace: "{{module}}",
					description: "The command module"
				}
			}
		},
		"HELP_UNDERSTANDING": {
			string: "Use `{{prefix}}help [command]` to view more information about a specific command, including usage examples.\nRequired arguments are surrounded by `[brackets]`, optional arguments are surrounded by `(parenthesis)`",
			context: "Information in help that helps with understanding the format",
			replaced: {
				prefix: {
					to_replace: "{{prefix}}",
					description: "The server's prefix"
				}
			}
		},
		"HELP_PREFIX_INFO": {
			string: "My prefix in this server is {{prefix}}",
			context: "Shows prefix in the help command",
			replaced: {
				prefix: {
					to_replace: "{{prefix}}",
					description: "The server's prefix"
				}
			}
		},
		"HELP_USAGE": {
			string: "Usage",
			context: "Usage field name in help command"
		},
		"HELP_EXAMPLES": {
			string: "Examples",
			context: "Examples field name in help command"
		},
		"HELP_DOCUMENTATION": {
			string: "Documentation",
			context: "Documentation field name in help command"
		},
		"HELP_ADDITIONAL_INFO": {
			string: "Additional Information",
			context: "Additional Information field name in help command"
		},
		"HELP_ALIAS": {
			string: "Alias",
			context: "Alias field name in help command"
		},
		"HELP_ALIAS_PLURAL": {
			string: "Aliases",
			context: "Aliases field name in help command"
		},
		"HELP_DOCS_NEW": {
			string: "Documentation",
			context: "Documentation field name in help command"
		},
		"COMMAND_DISABLED": {
			string: "This command is currently disabled globally.",
			context: "Used when a command is disabled globally"
		},
		"COMMAND_DISABLED_SERVER": {
			string: "This command has been disabled on this server",
			context: "Error shown when a command is disabled for a server"
		},
		"INVITE_BOT": {
			string: "You can invite {{name}} to your server with this link: {{link}}",
			context: "The response to the invite command",
			replaced: {
				name: {
					to_replace: "{{name}}",
					description: "The bot name"
				},
				link: {
					to_replace: "{{link}}",
					description: "The bot invite link"
				}
			}
		},
		"INVITE_RESTRICTED": {
			string: "This bot cannot be invited publicly. You can invite the public version with this link: {{link}}",
			context: "Used when the invite command is run on a private instance",
			replaced: {
				link: {
					to_replace: "{{link}}",
					description: "The bot invite link"
				}
			}
		},
		"NOTIFICATIONS_ENABLED": {
			string: "Notifications are **enabled**. You will receive a DM when an action is taken on any of your suggestions.",
			context: "Shown when a user has enabled notifications"
		},
		"NOTIFICATIONS_DISABLED": {
			string: "Notifications are **disabled**. You will not receive a DM when an action is taken on any of your suggestions.",
			context: "Shown when a user has disabled notifications"
		},
		"NOTIFICATIONS_ALREADY_ENABLED": {
			string: "DM Notifications are already enabled.",
			context: "Shown when notifications are enabled and a user tries to enable them"
		},
		"NOTIFICATIONS_ALREADY_DISABLED": {
			string: "DM Notifications are already disabled.",
			context: "Shown when notifications are disabled and a user tries to disable them"
		},
		"AUTOFOLLOW_ENABLED": {
			string: "Automatic following is **enabled**. You will automatically follow suggestions when you upvote them.",
			context: "Shown when a user has enabled automatic following"
		},
		"AUTOFOLLOW_DISABLED": {
			string: "Automatic following is **disabled**. You will not automatically follow suggestions when you upvote them, and you will not receive notifications for any suggestions you've automatically followed in the past.",
			context: "Shown when a user has disabled automatic following"
		},
		"AUTOFOLLOW_ALREADY_ENABLED": {
			string: "Automatic following is already enabled.",
			context: "Shown when automatic following is enabled and a user tries to enable it"
		},
		"AUTOFOLLOW_ALREADY_DISABLED": {
			string: "Automatic following is already disabled.",
			context: "Shown when automatic following is disabled and a user tries to disable them"
		},
		"GUILD_AUTOFOLLOW_ENABLED": {
			string: "Automatic following is **enabled**. Users will automatically follow suggestions when they upvote them, and will be notified when they are updated.",
			context: "Shown when a guild has enabled automatic following"
		},
		"GUILD_AUTOFOLLOW_DISABLED": {
			string: "Automatic following is **disabled**. Users will not automatically follow suggestions when they upvote them, and not will be notified when they are updated even if they have followed them previously.",
			context: "Shown when a guild has disabled automatic following"
		},
		"PROTIPS_ENABLED": {
			string: "Protips are **enabled**.",
			context: "Shown when a user has enabled protips"
		},
		"PROTIPS_DISABLED": {
			string: "Protips are **disabled**.",
			context: "Shown when a user has disabled protips"
		},
		"PROTIPS_ALREADY_ENABLED": {
			string: "Protips are already enabled.",
			context: "Shown when protips are enabled and a user tries to enable them"
		},
		"PROTIPS_ALREADY_DISABLED": {
			string: "Protips are already disabled.",
			context: "Shown when protips are disabled and a user tries to disable them"
		},
		"ON_OFF_TOGGLE_ERROR": {
			string: "You must specify `on`, `off`, or `toggle`.",
			context: "Used when a configuration element requires on, off, or toggle parameters"
		},
		"PING_DEVELOPERS_HEADER": {
			string: "Developers",
			context: "Developers header for the ping command"
		},
		"PING_GUILD_COUNT_HEADER": {
			string: "Guild Count",
			context: "Guild Count header for the ping command (also used in stats)"
		},
		"PING_UPTIME_HEADER": {
			string: "Uptime",
			context: "Uptime header for the ping command"
		},
		"PING_SHARD_PING_HEADER": {
			string: "Shard Ping",
			context: "Shard Ping header for the ping command"
		},
		"PING_BOT_LATENCY_HEADER": {
			string: "Bot Latency",
			context: "Bot latency (previously 'Edit Time') header for the ping command"
		},
		"PING_MEMORY_HEADER": {
			string: "Memory Usage",
			context: "Memory Usage header for the ping command"
		},
		"UNCONFIGURED_ERROR": {
			string: "You must configure your server to use this command. Please use the `setup` command.",
			context: "Used when a server does not have a database entry"
		},
		"NO_ALLOWED_ROLE_ERROR": {
			string: "You do not have a role with permission to submit suggestions.\nThe following roles can submit suggestions: {{roleList}}",
			context: "Error when a user tries to suggest without an approved role",
			replaced: {
				roleList: {
					to_replace: "{{roleList}}",
					description: "A list of roles that are allowed to submit suggestions"
				}
			}
		},
		"SUBMIT_NOT_COMMAND_CHANNEL_ERROR": {
			string: "Suggestions can only be submitted in the following channels: {{channels}}",
			context: "Error when a user uses suggest in a non-command channel",
			replaced: {
				channels: {
					to_replace: "{{channels}}",
					description: "The mentions of the commands channels"
				}
			}
		},
		"EDIT_NOT_COMMAND_CHANNEL_ERROR": {
			string: "Suggestions can only be edited in the following channels: {{channels}}",
			context: "Error when a user uses edit in a non-command channel",
			replaced: {
				channels: {
					to_replace: "{{channels}}",
					description: "The mentions of the commands channels"
				}
			}
		},
		"NO_SUGGESTION_ERROR": {
			string: "Please provide a suggestion!",
			context: "Error when a user does not provide a suggestion in the suggest command"
		},
		"EDIT_NO_CONTENT_ERROR": {
			string: "Please provide new content for the suggestion!",
			context: "Error when the user does not provide a suggestion content in the edit command"
		},
		"TOO_LONG_SUGGESTION_ERROR_NEW": {
			string: "Suggestions cannot be longer than 1900 characters.",
			context: "Error when a suggestion is too long"
		},
		"NO_REVIEW_CHANNEL_ERROR": {
			string: "I could not find your suggestion review channel! Please make sure you have configured one.",
			context: "Error when the configured staff review channel is not found"
		},
		"NO_SUGGESTION_CHANNEL_ERROR": {
			string: "I could not find your approved suggestions channel! Please make sure you have configured one.",
			context: "Error when the configured suggestions channel is not found"
		},
		"SUGGESTION_FROM_TITLE": {
			string: "Suggestion from {{user}}",
			context: "Title for embeds showing who the suggesting user is",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "A user's tag"
				}
			}
		},
		"SUGGESTION_FOOTER": {
			string: "Suggestion ID: {{id}} | Submitted at",
			context: "Footer for suggestion embeds",
			replaced: {
				id: {
					to_replace: "{{id}}",
					description: "A suggestion ID"
				}
			}
		},
		"SUGGESTION_FOOTER_WITH_EDIT": {
			string: "Suggestion ID: {{id}} | Edited by {{editor}} | Submitted at",
			context: "Footer for suggestion embeds",
			replaced: {
				id: {
					to_replace: "{{id}}",
					description: "A suggestion ID"
				},
				editor: {
					to_replace: "{{editor}}",
					description: "The user who edited the suggestion"
				}
			}
		},
		"SUGGESTION_SUBMITTED_STAFF_REVIEW_SUCCESS": {
			string: "Your suggestion has been submitted to the server staff for review!",
			context: "Success message when a suggestion is sent for staff review"
		},
		"SUGGESTION_REVIEW_EMBED_TITLE": {
			string: "Suggestion Awaiting Review (#{{id}})",
			context: "Title for the suggestion review embed",
			replaced: {
				id: {
					to_replace: "{{id}}",
					description: "A suggestion ID"
				}
			}
		},
		"SUGGESTION_REVIEW_EDIT_EMBED_TITLE": {
			string: "Suggestion Edit Awaiting Review (#{{id}})",
			context: "Title for the suggestion edit review embed",
			replaced: {
				id: {
					to_replace: "{{id}}",
					description: "A suggestion ID"
				}
			}
		},
		"USER_INFO_HEADER": {
			string: "{{user}} (ID: {{id}})",
			context: "Used when a header using the user's tag and ID is present",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "A user tag"
				},
				id: {
					to_replace: "{{id}}",
					description: "A user ID"
				}
			}
		},
		"USER_INFO_HEADER_CB": {
			string: "{{user}} (ID: `{{id}}`)",
			context: "Used when a header using the user's tag and ID is present (codeblock version)",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "A user tag"
				},
				id: {
					to_replace: "{{id}}",
					description: "A user ID"
				}
			}
		},
		"APPROVE_DENY_HEADER": {
			string: "Approve/Deny",
			context: "Header for the approve/deny field of the review embed"
		},
		"REVIEW_COMMAND_INFO": { //Keeping in case of a revert to old description during testing
			string: "Use **{{prefix}}approve {{id}}** to send to {{channel}}\nUse **{{prefix}}deny {{id}}** to deny",
			context: "Information in the review embed showing instructions on how to approve/deny",
			replaced: {
				prefix: {
					to_replace: "{{prefix}}",
					description: "The server's prefix"
				},
				id: {
					to_replace: "{{id}}",
					description: "A suggestion ID"
				},
				channel: {
					to_replace: "{{channel}}",
					description: "The suggestions channel mention"
				}
			}
		},
		"REVIEW_COMMAND_INFO_NEW": {
			string: "React with {{approve}} to send to {{channel}}\nReact with {{deny}} to deny",
			context: "Information in the review embed showing instructions on how to approve/deny",
			replaced: {
				approve: {
					to_replace: "{{approve}}",
					description: "The approve reaction"
				},
				deny: {
					to_replace: "{{deny}}",
					description: "The deny reaction"
				},
				channel: {
					to_replace: "{{channel}}",
					description: "The suggestions channel mention"
				}
			}
		},
		"WITH_ATTACHMENT_HEADER": {
			string: "With Attachment",
			context: "Header used when a suggestion has an attachment"
		},
		"SUGGESTION_HEADER": {
			string: "Suggestion",
			context: "Header used for the suggestion content"
		},
		"SUGGESTION_VOTES": {
			string: "Votes:",
			context: "Header used for votes in the context \"Votes: 3\""
		},
		"LOG_SUGGESTION_SUBMITTED_REVIEW_TITLE": {
			string: "{{user}} submitted a suggestion for review",
			context: "Title in the log embed when a suggestion is submitted for review",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "A user tag"
				}
			}
		},
		"LOG_SUGGESTION_SUBMITTED_REVIEW_TITLE_ANON": {
			string: "{{user}} submitted an anonymous suggestion for review",
			context: "Title in the log embed when an anonymous suggestion is submitted for review",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "A user tag"
				}
			}
		},
		"LOG_EDIT_SUBMITTED_REVIEW_TITLE": {
			string: "{{user}} submitted a suggestion edit for review on #{{id}}",
			context: "Title in the log embed when a suggestion edit is submitted for review",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "A user tag"
				},
				id: {
					to_replace: "{{id}}",
					description: "The suggestion ID"
				}
			}
		},
		"LOG_EDIT_SUBMITTED_ON_APPROVED_TITLE": {
			string: "{{user}} edited #{{id}} (which is currently awaiting review)",
			context: "Title in the log embed when a suggestion in review is edited",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "A user tag"
				},
				id: {
					to_replace: "{{id}}",
					description: "The suggestion ID"
				}
			}
		},
		"LOG_EDIT_TITLE": {
			string: "{{user}} edited #{{id}}",
			context: "Title in the log embed when a suggestion is edited",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "A user tag"
				},
				id: {
					to_replace: "{{id}}",
					description: "The suggestion ID"
				}
			}
		},
		"LOG_EDIT_APPROVE_TITLE": {
			string: "{{user}} approved a suggestion edit on #{{id}}",
			context: "Title in the log embed when a suggestion edit is approved",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "A user tag"
				},
				id: {
					to_replace: "{{id}}",
					description: "The suggestion ID"
				}
			}
		},
		"LOG_SUGGESTION_SUBMITTED_AUTOAPPROVE_TITLE": {
			string: "{{user}} submitted a suggestion",
			context: "Title in the log embed when a suggestion is submitted in autoapprove mode",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "A user tag"
				}
			}
		},
		"LOG_SUGGESTION_SUBMITTED_AUTOAPPROVE_TITLE_ANON": {
			string: "{{user}} submitted an anonymous suggestion",
			context: "Title in the log embed when an anonymous suggestion is submitted in autoapprove mode",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "A user tag"
				}
			}
		},
		"LOG_SUGGESTION_SUBMITTED_FOOTER": {
			string: "Suggestion ID: {{id}} | User ID: {{user}}",
			context: "Description of the log embed when a user is shown",
			replaced: {
				id: {
					to_replace: "{{id}}",
					description: "A suggestion ID"
				},
				user: {
					to_replace: "{{user}}",
					description: "A user ID"
				}
			}
		},
		"SUGGESTION_SUBMITTED_AUTOAPPROVE_SUCCESS": {
			string: "Your suggestion has been added to the {{channel}} channel!",
			context: "Success message when a suggestion is submitted in the autoapprove mode",
			replaced: {
				channel: {
					to_replace: "{{channel}}",
					description: "Mention of the suggestion channel"
				}
			}
		},
		"SUPPORT_INVITE": {
			string: "Need help with the bot? Join our support server at {{link}} 😉",
			context: "Response to the support command",
			replaced: {
				link: {
					to_replace: "{{link}}",
					description: "The link to the support server"
				}
			}
		},
		"VERIFY_ACK_DEVELOPER_GA": {
			string: "Developer/Global Administrator",
			context: "Verify acknowledgement for Developer/Global Administrator"
		},
		"VERIFY_ACK_GLOBAL_STAFF": {
			string: "Suggester Staff Team",
			context: "Verify acknowledgement for Suggester Staff Team"
		},
		"VERIFY_ACK_TRANSLATOR": {
			string: "Translator",
			context: "Verify acknowledgement for Translator"
		},
		"VERIFY_ACK_GLOBAL_NO_COOLDOWN": {
			string: "Exempt From Cooldowns",
			context: "Verify acknowledgement for Exempt from Cooldowns"
		},
		"VERIFY_ACK_GLOBAL_PROTECTED": {
			string: "Protected",
			context: "Verify acknowledgement for Protected"
		},
		"VERIFY_ACK_GLOBAL_BLOCK": {
			string: "Blocked Globally",
			context: "Verify acknowledgement for Blocked Globally"
		},
		"VERIFY_ACK_SERVER_ADMIN": {
			string: "Server Admin",
			context: "Verify acknowledgement for Server Admin"
		},
		"VERIFY_ACK_SERVER_STAFF": {
			string: "Server Staff",
			context: "Verify acknowledgement for Server Staff"
		},
		"VERIFY_ACK_SERVER_BLOCK": {
			string: "Blocked on this server",
			context: "Verify acknowledgement for Blocked on this server"
		},
		"VERIFY_TITLE_GLOBAL_ACKS": {
			string: "Global Acknowledgements",
			context: "Header for the global acknowledgements section of the verify command"
		},
		"VERIFY_TITLE_SERVER_ACKS": {
			string: "Server Acknowledgements",
			context: "Header for the server acknowledgements section of the verify command"
		},
		"VERIFY_FLAGS_TITLE": {
			string: "User Flags",
			context: "Header for the user flags section of the verify embed"
		},
		"VERIFY_NO_ACKS": {
			string: "This user has no acknowledgements",
			context: "Shown in the verify command when a user has no acknowledgements"
		},
		"VERIFY_PERMISSION_LEVEL_FOOTER": {
			string: "Permission Level: {{level}}",
			context: "The footer of the verify embed showing permission level",
			replaced: {
				level: {
					to_replace: "{{level}}",
					description: "The permission level of the user"
				}
			}
		},
		"VOTE_INFO": {
			string: "You can vote for Suggester on various bot lists, which is a great way to support the bot! If you're in the Suggester support server ({{link}}), you can get special rewards for voting 🤩\n>>> __Links to Vote:__\n{{links}}",
			context: "Response to the vote command",
			replaced: {
				link: {
					to_replace: "{{link}}",
					description: "Link to the support server"
				},
				links: {
					to_replace: "{{links}}",
					description: "Links to vote for the bot (takes up multiple lines)"
				}
			}
		},
		"AUTOSETUP_WARNING": {
			string: "⚠️ Automatic Setup Warning ⚠️\n**This setup will overwrite any previous configuration and add channels to your server.**\n\nIf you would like to continue with automatic setup, click the {{check}} reaction. If you would like to abort automatic setup, click the {{x}} reaction.",
			context: "Warning when automatic setup is initiated",
			replaced: {
				check: {
					to_replace: "{{check}}",
					description: "The check emoji"
				},
				x: {
					to_replace: "{{x}}",
					description: "The X emoji"
				}
			}
		},
		"SETUP_WARNING": {
			string: "⚠️ Warning ⚠️\n**This setup will overwrite any previous server configuration.**\n\nIf you would like to continue with setup, click the {{check}} reaction. If you would like to abort setup, click the {{x}} reaction.",
			context: "Warning when setup is initiated",
			replaced: {
				check: {
					to_replace: "{{check}}",
					description: "The check emoji"
				},
				x: {
					to_replace: "{{x}}",
					description: "The X emoji"
				}
			}
		},
		"SETUP_CANCELLED": {
			string: "**Setup Cancelled**",
			context: "Message when setup is cancelled"
		},
		"AUTOMATIC_SETUP": {
			string: "Automatic setup",
			context: "Audit log reason for automatic setup"
		},
		"CREATE_LOG_CHANNEL": {
			string: "Create suggestion log channel",
			context: "Audit log reason for log channel webhook creation"
		},
		"REMOVE_LOG_CHANNEL": {
			string: "Remove old log channel",
			context: "Audit log reason for log channel webhook deletion"
		},
		"AUTOMATIC_SETUP_COMPLETE_NEW": {
			string: "Automatic setup complete!\n>>> Want to use more advanced configuration elements like custom reactions, a role given on approved suggestions, and more? Try the `{{prefix}}config` command",
			context: "Message sent when automatic setup is complete",
			replaced: {
				prefix: {
					to_replace: "{{prefix}}",
					description: "The server's prefix"
				}
			}
		},
		"CFG_HELP_TITLE": {
			string: "Configuration Help",
			context: "Title for the configuration help embed"
		},
		"CFG_HELP_INFO": {
			string: "Use `{{p}}config help [element name]` to view help for a specific element, or use the arrow reactions to navigate through the list!",
			context: "Description for navigating the config help embed",
			replaced: {
				p: {
					to_replace: "{{p}}",
					description: "The bot prefix"
				}
			}
		},
		"CFG_HELP_COMMAND": {
			string: "Command",
			context: "Command title for the config help embed"
		},
		"CFG_HELP_COMMAND_INFO": {
			string: "You can use `{{prefix}}config {{subcommand}}` to view the current value or set a new one",
			context: "Command description for the config help embed",
			replaced: {
				prefix: {
					to_replace: "{{prefix}}",
					replaced: "The bot prefix"
				},
				subcommand: {
					to_replace: "{{subcommand}}",
					replaced: "The help subcommand (ex. admin)"
				}
			}
		},
		"CFG_LIST_TITLE": {
			string: "List of Configuration Elements",
			context: "Title for the list of config elements in the config help embed"
		},
		"CFG_NO_ROLE_SPECIFIED_ERROR": {
			string: "You must specify a role name, @mention, or ID!",
			context: "Error when no role is specified for configuration"
		},
		"CFG_INVALID_ROLE_ERROR": {
			string: "I could not find a role based on your input! Make sure to specify a **role name**, **role @mention**, or **role ID**.",
			context: "Error when an invalid role is specified for configuration"
		},
		"CFG_ALREADY_ADMIN_ROLE_ERROR": {
			string: "This role has already been added as an admin role!",
			context: "Error when a role has already been added as an admin role"
		},
		"CFG_ADMIN_ROLE_ADD_SUCCESS": {
			string: "Added **{{role}}** to the list of server admin roles.",
			context: "Success message when a role is added to the server admin role list",
			replaced: {
				role: {
					to_replace: "{{role}}",
					description: "A role name"
				}
			}
		},
		"CFG_NOT_ADMIN_ROLE_ERROR": {
			string: "This role is not currently an admin role.",
			context: "Error when a role has not already been added as an admin role"
		},
		"CFG_ADMIN_ROLE_REMOVE_SUCCESS": {
			string: "Removed **{{role}}** from the list of server admin roles.",
			context: "Success message when a role is removed from the server admin role list",
			replaced: {
				role: {
					to_replace: "{{role}}",
					description: "A role name"
				}
			}
		},
		"CFG_ALREADY_STAFF_ROLE_ERROR": {
			string: "This role has already been added as a staff role!",
			context: "Error when a role has already been added as a staff role"
		},
		"CFG_STAFF_ROLE_ADD_SUCCESS": {
			string: "Added **{{role}}** to the list of server staff roles.",
			context: "Success message when a role is added to the server staff role list",
			replaced: {
				role: {
					to_replace: "{{role}}",
					description: "A role name"
				}
			}
		},
		"CFG_NOT_STAFF_ROLE_ERROR": {
			string: "This role is not currently a staff role.",
			context: "Error when a role has not already been added as a staff role"
		},
		"CFG_STAFF_ROLE_REMOVE_SUCCESS": {
			string: "Removed **{{role}}** from the list of server staff roles.",
			context: "Success message when a role is removed from the server staff role list",
			replaced: {
				role: {
					to_replace: "{{role}}",
					description: "A role name"
				}
			}
		},
		"CFG_ALREADY_ALLOWED_ROLE_ERROR": {
			string: "This role has already been given permission to submit suggestions.",
			context: "Error when a role has already been added as an allowed suggesting role"
		},
		"CFG_ALLOWED_ROLE_ADD_SUCCESS": {
			string: "Members with the **{{role}}** role can now submit suggestions.",
			context: "Success message when a role is added to the allowed suggesting role list",
			replaced: {
				role: {
					to_replace: "{{role}}",
					description: "A role name"
				}
			}
		},
		"CFG_NOT_ALLOWED_ROLE_ERROR": {
			string: "This role is not currently able to submit suggestions.",
			context: "Error when a role has not already been added as an allowed suggestion role"
		},
		"CFG_ALLOWED_ROLE_REMOVE_SUCCESS": {
			string: "Members with the **{{role}}** can no longer submit suggestions.",
			context: "Success message when a role is removed from the allowed suggesting role list",
			replaced: {
				role: {
					to_replace: "{{role}}",
					description: "A role name"
				}
			}
		},
		"CFG_ALREADY_VOTING_ROLE_ERROR": {
			string: "This role has already been given permission to vote on suggestions.",
			context: "Error when a role has already been added as an voting role"
		},
		"CFG_VOTING_ROLE_ADD_SUCCESS": {
			string: "Members with the **{{role}}** role can now vote on suggestions.",
			context: "Success message when a role is added to the voting role list",
			replaced: {
				role: {
					to_replace: "{{role}}",
					description: "A role name"
				}
			}
		},
		"CFG_NOT_VOTING_ROLE_ERROR": {
			string: "This role is not currently able to vote on suggestions.",
			context: "Error when a role has not already been added as a voting role"
		},
		"CFG_VOTING_ROLE_REMOVE_SUCCESS": {
			string: "Members with the **{{role}}** can no longer vote on suggestions.",
			context: "Success message when a role is removed from the voting role list",
			replaced: {
				role: {
					to_replace: "{{role}}",
					description: "A role name"
				}
			}
		},
		"CFG_INVALID_ROLE_PARAM_ERROR": {
			string: "Please specify `add`, `remove`, or `list`.",
			context: "Error when a user specifies an invalid action for role configuration"
		},
		"CFG_RESET_APPROVED_ROLE_SUCCESS": {
			string: "Successfully reset the approved suggestion role.",
			context: "Success message when the approved suggestion role is reset"
		},
		"CFG_NO_MANAGE_ROLES_ERROR": {
			string: "Please give {{bot}} the **Manage Roles** permission in order for the approved suggestion role to work.",
			context: "Error when an approved suggestion role is configured but the bot does not have the Manage Roles permission",
			replaced: {
				bot: {
					to_replace: "{{bot}}",
					description: "The bot mention"
				}
			}
		},
		"CFG_ALREADY_APPROVED_ROLE_ERROR": {
			string: "This role is already set to be given when a member's suggestion is approved!",
			context: "Error when the specified approved suggestion role is already set"
		},
		"CFG_UNMANAGEABLE_ROLE_ERROR": {
			string: "I am not able to give members this role. Please ensure my highest role is __above__ the **{{role}}** role and that it is not a managed role.",
			context: "Error when the bot cannot give members an approved role",
			replaced: {
				role: {
					to_replace: "{{role}}",
					description: "A role name"
				}
			}
		},
		"CFG_APPROVED_ROLE_SUCCESS": {
			string: "Members who have their suggestion approved will now receive the **{{role}}** role.",
			context: "Success message when the approved suggestion role is configured",
			replaced: {
				role: {
					to_replace: "{{role}}",
					description: "A role name"
				}
			}
		},
		"CFG_RESET_IMPLEMENTED_ROLE_SUCCESS": {
			string: "Successfully reset the implemented suggestion role.",
			context: "Success message when the implemented suggestion role is reset"
		},
		"CFG_ALREADY_IMPLEMENTED_ROLE_ERROR": {
			string: "This role is already set to be given when a member's suggestion is marked as implemented!",
			context: "Error when the specified implemented suggestion role is already set"
		},
		"CFG_IMPLEMENTED_ROLE_SUCCESS": {
			string: "Members who have their suggestion marked as implemented will now receive the **{{role}}** role.",
			context: "Success message when the implemented suggestion role is configured",
			replaced: {
				role: {
					to_replace: "{{role}}",
					description: "A role name"
				}
			}
		},
		"CFG_NO_CHANNEL_SPECIFIED_ERROR": {
			string: "You must specify a channel #mention, channel ID, or channel name.",
			context: "Error when no channel is specified for configuration"
		},
		"CFG_INVALID_CHANNEL_ERROR": {
			string: "I could not find a text channel on this server based on this input! Make sure to specify a **channel #mention**, **channel ID**, or **channel name**.",
			context: "Error when an invalid channel is specified for configuration"
		},
		"CFG_REVIEW_SET_SUCCESS": {
			string: "Successfully set {{channel}} as the suggestion review channel.",
			context: "Success message when the review channel is configured",
			replaced: {
				channel: {
					to_replace: "{{channel}}",
					description: "A channel mention"
				}
			}
		},
		"CFG_SUGGESTIONS_SET_SUCCESS": {
			string: "Successfully set {{channel}} as the approved suggestions channel.",
			context: "Success message when the suggestions channel is configured",
			replaced: {
				channel: {
					to_replace: "{{channel}}",
					description: "A channel mention"
				}
			}
		},
		"CFG_DENIED_SET_SUCCESS": {
			string: "Successfully set {{channel}} as the denied suggestions channel.",
			context: "Success message when the denied channel is configured",
			replaced: {
				channel: {
					to_replace: "{{channel}}",
					description: "A channel mention"
				}
			}
		},
		"CFG_DENIED_RESET_SUCCESS": {
			string: "Successfully reset the denied suggestions channel.",
			context: "Success message when the denied channel is reset"
		},
		"CFG_WEBHOOK_CREATION_ERROR": {
			string: "A webhook could not be created in the provided channel. Please make sure that you have less than 10 webhooks in the channel and try again.",
			context: "Error shown when a webhook cannot be created in a log channel"
		},
		"CFG_LOG_SET_SUCCESS": {
			string: "Successfully set {{channel}} as the log channel.",
			context: "Success message when the log channel is configured",
			replaced: {
				channel: {
					to_replace: "{{channel}}",
					description: "A channel mention"
				}
			}
		},
		"CFG_LOG_RESET_SUCCESS": {
			string: "Successfully reset the log channel.",
			context: "Success message when the log channel is reset"
		},
		"CFG_COMMANDS_ADD_SUCCESS": {
			string: "Successfully added {{channel}} as a suggestion commands channel.",
			context: "Success message when the suggestion commands channel is configured",
			replaced: {
				channel: {
					to_replace: "{{channel}}",
					description: "A channel mention"
				}
			}
		},
		"CFG_COMMANDS_REMOVED_SUCCESS": {
			string: "Successfully removed {{channel}} from the list of suggestion commands channels.",
			context: "Success message when a suggestion commands channel is removed",
			replaced: {
				channel: {
					to_replace: "{{channel}}",
					description: "A channel mention"
				}
			}
		},
		"CFG_DISABLED_CHNL_ADD_SUCCESS": {
			string: "The bot will no longer respond in {{channel}}.",
			context: "Success message when a channel is disabled",
			replaced: {
				channel: {
					to_replace: "{{channel}}",
					description: "A channel mention"
				}
			}
		},
		"CFG_DISABLED_CHNL_REMOVED_SUCCESS": {
			string: "The bot will now respond in {{channel}}.",
			context: "Success message when a disabled channel is removed",
			replaced: {
				channel: {
					to_replace: "{{channel}}",
					description: "A channel mention"
				}
			}
		},
		"CFG_ARCHIVE_SET_SUCCESS": {
			string: "Successfully set {{channel}} as the implemented suggestions archive channel.",
			context: "Success message when the implemented suggestions archive channel is configured",
			replaced: {
				channel: {
					to_replace: "{{channel}}",
					description: "A channel mention"
				}
			}
		},
		"CFG_ARCHIVE_RESET_SUCCESS": {
			string: "Successfully reset the implemented suggestions archive channel.",
			context: "Success message when the implemented suggestions archive channel is reset"
		},
		"CFG_PREFIX_TOO_LONG_ERROR": {
			string: "Your prefix must be 20 characters or less.",
			context: "Error shown when a specified prefix is too long"
		},
		"CFG_PREFIX_DISALLOWED_ERROR": {
			string: "This prefix is disallowed, please choose a different prefix.",
			context: "Error shown when a specified prefix is disallowed"
		},
		"CFG_PREFIX_SET_SUCCESS": {
			string: "Successfully set this server's prefix to **{{prefix}}**",
			context: "Success message when the prefix is configured",
			replaced: {
				prefix: {
					to_replace: "{{prefix}}",
					description: "The server prefix"
				}
			}
		},
		"CFG_MODE_REVIEW_SET_SUCCESS": {
			string: "Successfully set the mode for this server to **review**.",
			context: "Success message when the mode is set to review"
		},
		"CFG_MODE_AUTOAPPROVE_SET_SUCCESS": {
			string: "Successfully set the mode for this server to **autoapprove**.",
			context: "Success message when the mode is set to autoapprove"
		},
		"CFG_SUGGESTIONS_AWAITING_REVIEW_ERROR_Q": {
			string: "All suggestions awaiting review must be cleared before the autoapprove mode is set. Use the `{{prefix}}queue` command to see all suggestions awaiting review.",
			context: "Error when a user tries to set the autoapprove mode while suggestions are still awaiting review",
			replaced: {
				prefix: {
					to_replace: "{{prefix}}",
					description: "The server prefix"
				}
			}
		},
		"CFG_MODE_INVALID_ERROR": {
			string: "Please specify a valid mode. (Either `review` or `autoapprove`)",
			context: "Error shown when the specified mode is invalid."
		},
		"CFG_EMOJI_UPVOTE_TITLE": {
			string: "Upvote",
			context: "Upvote header when emojis are listed in the config command"
		},
		"CFG_EMOJI_MID_TITLE": {
			string: "Shrug/No Opinion",
			context: "Middle reaction header when emojis are listed in the config command"
		},
		"CFG_EMOJI_DOWNVOTE_TITLE": {
			string: "Downvote",
			context: "Downvote header when emojis are listed in the config command"
		},
		"CFG_NO_EMOJI_ERROR": {
			string: "You must specify an emoji.",
			context: "Error when no emoji is specified for configuration"
		},
		"CFG_EMOJI_NOT_FOUND_ERROR": {
			string: "The specified emoji was not found. Make sure to specify an emoji from __this server__ or a default Discord emoji.",
			context: "Error when the specified emoji is not found"
		},
		"CFG_EMOJI_ALREADY_SET_ERROR": {
			string: "This emoji has already been set for a different emoji setting.",
			context: "Error when the specified emoji is already set for a different emoji setting"
		},
		"CFG_EMOJI_DISABLED_ERROR": {
			string: "This emoji is already disabled.",
			context: "Error shown when an emoji is already disabled"
		},
		"CFG_EMOJI_UP_DISABLE_SUCCESS": {
			string: "Successfully disabled the upvote reaction.",
			context: "Success message when the upvote reaction is disabled"
		},
		"CFG_EMOJI_MID_DISABLE_SUCCESS": {
			string: "Successfully disabled the shrug/no opinion reaction.",
			context: "Success message when the shrug/no opinion reaction is disabled"
		},
		"CFG_EMOJI_DOWN_DISABLE_SUCCESS": {
			string: "Successfully disabled the downvote reaction.",
			context: "Success message when the downvote reaction is disabled"
		},
		"CFG_EMOJI_UP_SET_SUCCESS": {
			string: "Successfully set the upvote emoji for this server to {{emote}}.",
			context: "Success message when the upvote reaction is set",
			replaced: {
				emote: {
					to_replace: "{{emote}}",
					description: "An emoji"
				}
			}
		},
		"CFG_EMOJI_MID_SET_SUCCESS": {
			string: "Successfully set the shrug/no opinion emoji for this server to {{emote}}.",
			context: "Success message when the shrug/no opinion reaction is set",
			replaced: {
				emote: {
					to_replace: "{{emote}}",
					description: "An emoji"
				}
			}
		},
		"CFG_EMOJI_DOWN_SET_SUCCESS": {
			string: "Successfully set the downvote emoji for this server to {{emote}}.",
			context: "Success message when the downvote reaction is set",
			replaced: {
				emote: {
					to_replace: "{{emote}}",
					description: "An emoji"
				}
			}
		},
		"CFG_FEED_REACTIONS_ENABLED": {
			string: "Suggestion feed reactions are **enabled**.",
			context: "Message when suggestion feed reactions are enabled"
		},
		"CFG_FEED_REACTIONS_DISABLED": {
			string: "Suggestion feed reactions are **disabled**.",
			context: "Message when suggestion feed reactions are disabled"
		},
		"CFG_FEED_REACTIONS_ALREADY_ENABLED": {
			string: "Suggestion feed reactions are already enabled.",
			context: "Message when suggestion feed reactions are already enabled"
		},
		"CFG_FEED_REACTIONS_ALREADY_DISABLED": {
			string: "Suggestion feed reactions are already disabled.",
			context: "Message when suggestion feed reactions are already disabled"
		},
		"CFG_EMOJI_INVALID_SETTING_ERROR": {
			string: "You must specify a valid emoji setting. (`up`, `mid`, `down`, `on`, `off`, `toggle`)",
			context: "Error when a user does not specify a valid emoji config setting"
		},
		"GUILD_NOTIFICATIONS_ENABLED": {
			string: "Notifications are **enabled**. Members will receive a DM when an action is taken on any of their suggestions.",
			context: "Shown when a guild has enabled notifications"
		},
		"GUILD_NOTIFICATIONS_DISABLED": {
			string: "Notifications are **disabled**. Members will not receive a DM when an action is taken on any of their suggestions.",
			context: "Shown when a guild has disabled notifications"
		},
		"GUILD_NOTIFICATIONS_ALREADY_ENABLED": {
			string: "Server notifications are already enabled.",
			context: "Shown when notifications are enabled and a guild tries to enable them"
		},
		"GUILD_NOTIFICATIONS_ALREADY_DISABLED": {
			string: "Server notifications are already disabled.",
			context: "Shown when notifications are disabled and a guild tries to disable them"
		},
		"CFG_SELF_VOTE_ENABLED": {
			string: "Members can vote on their own suggestions.",
			context: "Shown when a guild has enabled self voting"
		},
		"CFG_SELF_VOTE_DISABLED": {
			string: "Members cannot vote on their own suggestions.",
			context: "Shown when a guild has disabled self voting"
		},
		"CFG_SELF_VOTE_ALREADY_ENABLED": {
			string: "Members can already vote on their own suggestions.",
			context: "Shown when self voting is enabled and a guild tries to enable it"
		},
		"CFG_SELF_VOTE_ALREADY_DISABLED": {
			string: "Members are already disallowed from voting on their own suggestions.",
			context: "Shown when self voting is disabled and a guild tries to disable it"
		},
		"CFG_ONE_VOTE_ENABLED": {
			string: "Members can only choose one reaction option when voting on a suggestion",
			context: "Shown when a guild has enabled only choosing one vote option"
		},
		"CFG_ONE_VOTE_DISABLED": {
			string: "Members can choose multiple reaction options when voting on a suggestion",
			context: "Shown when a guild has disabled only choosing one vote option"
		},
		"CFG_ONE_VOTE_ALREADY_ENABLED": {
			string: "Members are already limited to choosing one reaction option when voting on a suggestion.",
			context: "Shown when choosing one vote reaction is enabled and a guild tries to enable it"
		},
		"CFG_ONE_VOTE_ALREADY_DISABLED": {
			string: "Members can already choose multiple reaction options when voting on a suggestion.",
			context: "Shown when choosing one vote reaction is disabled and a guild tries to disable it"
		},
		"CFG_COMMENT_TIME_ENABLED": {
			string: "Comment timestamps will be shown on suggestion embeds",
			context: "Shown when a guild has enabled comment timestamps"
		},
		"CFG_COMMENT_TIME_DISABLED": {
			string: "Comment timestamps will not be shown on suggestion embeds",
			context: "Shown when a guild has disabled comment timestamps"
		},
		"CFG_COMMENT_TIME_ALREADY_ENABLED": {
			string: "Comment timestamps are already shown on suggestion embeds",
			context: "Shown when comment timestamps are enabled and a guild tries to enable it"
		},
		"CFG_COMMENT_TIME_ALREADY_DISABLED": {
			string: "Comment timestamps are already not shown on suggestion embeds",
			context: "Shown when comment timestamps are disabled and a guild tries to disable it"
		},
		"CFG_LIVE_VOTES_ENABLED": {
			string: "Live vote counts will be shown on suggestion embeds",
			context: "Shown when a guild has enabled live vote counts"
		},
		"CFG_LIVE_VOTES_DISABLED": {
			string: "Live vote counts will not be shown on suggestion embeds",
			context: "Shown when a guild has disabled live vote counts"
		},
		"CFG_LIVE_VOTES_ALREADY_ENABLED": {
			string: "Live vote counts are already shown on suggestion embeds",
			context: "Shown when live vote counts are enabled and a guild tries to enable it"
		},
		"CFG_LIVE_VOTES_ALREADY_DISABLED": {
			string: "Live vote counts are already not shown on suggestion embeds",
			context: "Shown when live vote counts are disabled and a guild tries to disable it"
		},
		"CFG_ANONYMOUS_ENABLED": {
			string: "Anonymous suggestions can be submitted via `/asuggest`. The identity of the submitting user will be visible to staff but not in the public suggestions feed.\n> If the command does not appear, the bot may need re-invited to allow use of slash commands using this link: {{invite}}",
			context: "Shown when a guild has enabled anonymous suggestions",
			replaced: {
				invite: {
					to_replace: "{{invite}}",
					description: "The bot invite link"
				}
			}
		},
		"CFG_ANONYMOUS_DISABLED": {
			string: "Anonymous suggestions cannot be submitted on this server",
			context: "Shown when a guild has disabled anonymous suggestions"
		},
		"CFG_ANONYMOUS_ALREADY_ENABLED": {
			string: "Anonymous suggestions can already be submitted on this server",
			context: "Shown when anonymous suggestions are enabled and a guild tries to enable it"
		},
		"CFG_ANONYMOUS_ALREADY_DISABLED": {
			string: "Anonymous suggestions are already disabled on this server",
			context: "Shown when anonymous suggestions are disabled and a guild tries to disable it"
		},
		"CFG_INCHANNEL_ENABLED": {
			string: "Suggestions can be submitted via any message the suggestions feed channel",
			context: "Shown when a guild has enabled in-channel suggestions"
		},
		"CFG_INCHANNEL_DISABLED": {
			string: "Suggestions cannot be submitted via any message in the suggestions feed channel",
			context: "Shown when a guild has disabled in-channel suggestions"
		},
		"CFG_INCHANNEL_ALREADY_ENABLED": {
			string: "Suggestions can already be submitted via any message the suggestions feed channel",
			context: "Shown when in-channel suggestions are enabled and a guild tries to enable them"
		},
		"CFG_INCHANNEL_ALREADY_DISABLED_NEW": {
			string: "Suggestions already cannot be submitted via any message in the suggestions feed channel",
			context: "Shown when in-channel suggestions are disabled and a guild tries to disable them"
		},
		"CFG_CLEAR_COMMANDS_ENABLED": {
			string: "Auto-cleaning of commands is **enabled**.",
			context: "Shown when a guild has enabled cleaning of commands"
		},
		"CFG_CLEAR_COMMANDS_DISABLED": {
			string: "Auto-cleaning of commands is **disabled**.",
			context: "Shown when a guild has cleaning of commands"
		},
		"CFG_CLEAR_COMMANDS_ALREADY_ENABLED": {
			string: "Auto-cleaning of commands is already enabled.",
			context: "Shown when cleaning of commands is enabled and a guild tries to enable them"
		},
		"CFG_CLEAR_COMMANDS_ALREADY_DISABLED": {
			string: "Auto-cleaning of commands is already disabled.",
			context: "Shown when cleaning of commands is disabled and a guild tries to disable them"
		},
		"CFG_CLEAR_COMMANDS_NO_MANAGE_MESSAGES": {
			string: "Auto-cleaning of commands requires the bot have the **Manage Messages** permission in this server. Please give the bot this permission and try again.",
			context: "Error shown when the bot does not have Manage Messages and cleaning of commands is enabled"
		},
		"CFG_NO_PARAMS_ERROR": {
			string: "Invalid configuration element specified. Please run this command with no parameters to view configuration instructions.",
			context: "Error if no configuration element is specified"
		},
		"INVALID_SUGGESTION_ID_ERROR": {
			string: "Please provide a valid suggestion ID.",
			context: "Error shown when the specified suggestion ID is invalid"
		},
		"SUGGESTION_NOT_APPROVED_ERROR": {
			string: "You can only perform this action on approved suggestions.",
			context: "Error shown when a suggestion is not approved and an action like comment/mark is used"
		},
		"SUGGESTION_IMPLEMENTED_ERROR": {
			string: "This suggestion has been marked as implemented and moved to the implemented archive channel, so no further actions can be taken on it.",
			context: "Error shown when a suggestion has already been marked as implemented and an action like comment/mark is used"
		},
		"SUGGESTION_DENIED_EDIT_ERROR": {
			string: "This suggestion has been denied, and therefore cannot be edited.",
			context: "Error shown when a suggestion has been denied and is attempted to be edited"
		},
		"NO_COMMENT_ERROR": {
			string: "You must provide a comment!",
			context: "Error shown when no comment is specified for the comment command"
		},
		"TOO_MANY_COMMENTS_ERROR_NEW": {
			string: "Due to Discord embed limitations, suggestions can only have up to 15 comments.",
			context: "Error shown when a suggestion has the maximum number of comments"
		},
		"COMMENT_TOO_LONG_ERROR": {
			string: "Comments cannot be longer than 1024 characters.",
			context: "Error shown when a specified comment is too long"
		},
		"SUGGESTION_FEED_MESSAGE_NOT_EDITED_ERROR": {
			string: "There was an error editing the suggestion feed message. Please check that the suggestion feed message exists and try again.",
			context: "Error shown when the suggestion feed embed cannot be edited"
		},
		"SUGGESTION_FEED_MESSAGE_NOT_FETCHED_ERROR": {
			string: "There was an error fetching the suggestion feed message. Please check that the suggestion feed message exists and try again.",
			context: "Error shown when the suggestion feed embed cannot be deleted"
		},
		"NO_SUGGESTION_CONTENT": {
			string: "[No Suggestion Content]",
			context: "Shown when there is a suggestion with no content"
		},
		"SUGGESTION_FEED_LINK": {
			string: "Suggestions Feed Post",
			context: "Hyperlink title to the suggestions feed post"
		},
		"COMMENT_TITLE_ANONYMOUS": {
			string: "Staff Comment",
			context: "Title for an anonymous comment"
		},
		"COMMENT_TITLE": {
			string: "Comment from {{user}} (ID {{id}})",
			context: "Title for a comment",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "A user tag"
				},
				id: {
					to_replace: "{{id}}",
					description: "A comment ID"
				}
			}
		},
		"ANONYMOUS_COMMENT_ADDED_TITLE": {
			string: "Anonymous Comment Added",
			context: "Header for the Anonymous Comment Added embed"
		},
		"COMMENT_ADDED_TITLE": {
			string: "Comment Added",
			context: "Header for the Comment Added embed"
		},
		"COMMENT_ADDED_DM_TITLE": {
			string: "A comment was added to your suggestion in **{{server}}**!",
			context: "Title for the DM notification of a comment being added to a suggestion",
			replaced: {
				server: {
					to_replace: "{{server}}",
					description: "The name of the server the command was run in"
				}
			}
		},
		"COMMENT_ADDED_DM_TITLE_FOLLOW": {
			string: "A comment was added to a suggestion you follow in **{{server}}**!",
			context: "Title for the DM notification of a comment being added to a suggestion when a user is following the suggestion",
			replaced: {
				server: {
					to_replace: "{{server}}",
					description: "The name of the server the command was run in"
				}
			}
		},
		"ANONYMOUS_COMMENT_ADDED_LOG": {
			string: "{{user}} added an anonymous comment to #{{id}}",
			context: "Title for the log embed when an anonymous comment is added",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "The staff member's tag"
				},
				id: {
					to_replace: "{{id}}",
					description: "The suggestion ID"
				}
			}
		},
		"COMMENT_ADDED_LOG": {
			string: "{{user}} added a comment to #{{id}}",
			context: "Title for the log embed when a comment is added",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "The staff member's tag"
				},
				id: {
					to_replace: "{{id}}",
					description: "The suggestion ID"
				}
			}
		},
		"SUGGESTION": {
			string: "Suggestion",
			context: "Header used throughout the bot showing the suggestion in question"
		},
		"MODE_AUTOAPPROVE_DISABLED_ERROR": {
			string: "This command is disabled when the mode is set to autoapprove.",
			context: "Error shown when a command only usable in the review mode is used in the autoapprove mode"
		},
		"SUGGESTION_ALREADY_APPROVED_APPROVE_ERROR": {
			string: "This suggestion has already been approved! Use `{{prefix}}delete {{id}}` to remove it.",
			context: "Error shown when a suggestion has already been approved and the approve command is used",
			replaced: {
				prefix: {
					to_replace: "{{prefix}}",
					description: "The server prefix"
				},
				id: {
					to_replace: "{{id}}",
					description: "The suggestion ID"
				}
			}
		},
		"SUGGESTION_ALREADY_DENIED_APPROVE_ERROR": {
			string: "This suggestion has already been denied! Previously denied suggestions cannot be approved.",
			context: "Error shown when a suggestion is already denied and a user attempts to approve it"
		},
		"SUGGESTION_ALREADY_DENIED_DENIED_ERROR": {
			string: "This suggestion has already been denied!",
			context: "Error shown when a suggestion is already denied and a user attempts to deny it"
		},
		"SUGGESTION_APPROVED_TITLE": {
			string: "Suggestion Approved",
			context: "Title for the suggestion approved embed"
		},
		"SUGGESTION_EDIT_APPROVED_TITLE": {
			string: "Suggestion Edit Approved",
			context: "Title for the suggestion edit approved embed"
		},
		"SUGGESTION_EDIT_DENIED_TITLE": {
			string: "Suggestion Edit Denied",
			context: "Title for the suggestion edit denied embed"
		},
		"APPROVED_BY": {
			string: "Approved by {{user}}",
			context: "Details who approved a suggestion",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "A user tag"
				}
			}
		},
		"APPROVED_DM_TITLE": {
			string: "Your suggestion was approved in **{{server}}**!",
			context: "Title for the DM notification of a suggestion being approved",
			replaced: {
				server: {
					to_replace: "{{server}}",
					description: "The name of the server the command was run in"
				}
			}
		},
		"APPROVED_DM_TITLE_FOLLOW": {
			string: "A suggestion you follow was approved in **{{server}}**!",
			context: "Title for the DM notification of a suggestion being approved on a suggestion followed",
			replaced: {
				server: {
					to_replace: "{{server}}",
					description: "The name of the server the command was run in"
				}
			}
		},
		"APPROVED_LOG": {
			string: "{{user}} approved #{{id}}",
			context: "Title for the log embed when a suggestion is approved",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "The staff member's tag"
				},
				id: {
					to_replace: "{{id}}",
					description: "The suggestion ID"
				}
			}
		},
		"SUGGESTION_CHANGE_REVIEW_EMBED": {
			string: "A change was processed on this suggestion",
			context: "Shown when a suggestion is no longer in review"
		},
		"ALREADY_ATTACHMENT_ERROR": {
			string: "Due to Discord embed limitations, suggestions can only have 1 attachment.",
			context: "Error produced when a suggestion already has an attachment and a user attempts to add an attachment"
		},
		"NO_ATTACHMENT_ERROR": {
			string: "Please provide an attachment!",
			context: "Error shown when a user does not provide an attachment for the attach command"
		},
		"ATTACHMENT_ADDED_HEADER": {
			string: "Attachment Added",
			context: "Title of the reply embed when an attachment is added"
		},
		"ATTACHMENT_TOO_BIG": {
			string: "The attached file is too big. Please upload an image under 8 MB",
			context: "The error message to be sent if an image is larger than 8mb (webhook max filesize)"
		},
		"ATTACHED_LOG": {
			string: "{{user}} added an attachment to #{{id}}",
			context: "Title for the log embed when an attachment is added to a suggestion",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "The staff member's tag"
				},
				id: {
					to_replace: "{{id}}",
					description: "The suggestion ID"
				}
			}
		},
		"TIME_SETUP_WARNING": {
			string: "You have 2 minutes to respond",
			context: "Footer of setup embeds showing the amount of time a user has to respond"
		},
		"INPUTS": {
			string: "Inputs",
			context: "Header showing valid inputs for the setup command"
		},
		"SETUP_TIMED_OUT_ERROR": {
			string: "Setup has timed out. Please rerun the setup command if you would like to continue.",
			context: "Error shown when setup times out"
		},
		"MARK_TIMEOUT_ERROR": {
			string: "Reaction selection timed out. Please rerun this command if you would like to continue.",
			context: "Error shown when reaction selection times out in the mark command"
		},
		"SETUP_ADMIN_ROLES_DESC": {
			string: "Any member with a server admin role can use all staff commands, as well as edit bot configuration. Anyone who has the `Manage Server` permission is automatically counted as an admin regardless of server configuration.",
			context: "Description for the server admin setting in setup"
		},
		"SETUP_STAFF_ROLES_DESC_ND": {
			string: "Any member with a server staff role can use all staff commands to manage suggestions.",
			context: "Description for the server staff setting in setup"
		},
		"SETUP_ROLES_INPUT": {
			string: "You can send a **role name**, **role ID**, or **role @mention** in this channel.",
			context: "Valid inputs for setup roles"
		},
		"SETUP_CHANNELS_INPUT": {
			string: "You can send a **channel #mention**, **channel ID**, or **channel name**.",
			context: "Valid inputs for setup channels"
		},
		"SETUP_ROLES_DONE_TITLE": {
			string: "Done setting up roles?",
			context: "Title for the field showing how to finish specifying roles in setup"
		},
		"SETUP_ROLES_DONE_DESC": {
			string: "Type `done` to go to the next step\nIf you're not done, just specify another role!",
			context: "Information about how to move on to the next setting"
		},
		"SETUP_BEGIN": {
			string: "Starting setup... Send `cancel` at any time to exit setup.",
			context: "Shown at the start of the setup prompt"
		},
		"SETUP_MODE_DESC": {
			string: "This is the mode for managing suggestions, either `review` or `autoapprove`",
			context: "Description for the mode setting in setup"
		},
		"SETUP_REVIEW_TEXT": {
			string: "Review",
			context: "Header for review information in setup"
		},
		"SETUP_REVIEW_DESC": {
			string: "This mode holds all suggestions for staff review, needing to be manually approved before being posted to the suggestions channel.",
			context: "Description of the review mode in setup"
		},
		"SETUP_AUTOAPPROVE_TEXT": {
			string: "Autoapprove",
			context: "Header for autoapprove information in setup"
		},
		"SETUP_AUTOAPPROVE_DESC": {
			string: "This mode automatically sends all suggestions to the suggestions channel, with no manual review.",
			context: "Description of the autoapprove mode in setup"
		},
		"SETUP_MODE_INPUTS": {
			string: "A valid mode (either `review` or `autoapprove`)",
			context: "Valid inputs for mode in the setup command"
		},
		"SETUP_SUGGESTIONS_CHANNEL_DESC": {
			string: "This is the channel where all suggestions are sent once they are approved.",
			context: "Description of the suggestions channel for setup"
		},
		"SETUP_REVIEW_CHANNEL_DESC": {
			string: "This is the channel where all suggestions are sent once they are suggested and awaiting staff review.",
			context: "Description of the review channel for setup"
		},
		"SETUP_DENIED_CHANNEL_DESC": {
			string: "This is the channel where all denied or deleted suggestions are sent.",
			context: "Description of the denied channel for setup"
		},
		"SETUP_LOG_CHANNEL_DESC": {
			string: "This is the channel where all actions on suggestions are logged.",
			context: "Description of the log channel for setup"
		},
		"SETUP_SKIP_CHANNEL": {
			string: "This channel is optional, send `skip` to skip it.",
			context: "Information in setup about skipping setting a channel"
		},
		"SETUP_PREFIX_DESC": {
			string: "The prefix is what is used to trigger the commands. Prefixes are usually symbols, for example `$`, `?` or `.`\nA prefix of `.` would mean commands would be used like `.vote`",
			context: "Information about the prefix in setup"
		},
		"SETUP_PREFIX_INPUT": {
			string: "Any text with no spaces",
			context: "Information about prefix inputs in setup"
		},
		"SETUP_PREFIX_INCLUDES_SUGGEST": {
			string: "The prefix you specified includes `suggest`, which means commands will be run using `{{prefix}}suggest`. React with {{check}} if you would like to __keep__ this prefix, and react with {{x}} to specify a new prefix.",
			context: "Warning if the prefix includes the term suggest in setup",
			replaced: {
				check: {
					to_replace: "{{check}}",
					description: "The check emoji"
				},
				x: {
					to_replace: "{{x}}",
					description: "The X emoji"
				},
				prefix: {
					to_replace: "{{prefix}}",
					description: "The server prefix"
				}
			}
		},
		"SETUP_COMPLETE_HEADER": {
			string: "Setup Complete!",
			context: "Header for the setup complete embed"
		},
		"SETUP_COMPLETE_DESC": {
			string: "Suggester should now work in your server, try it out with `{{prefix}}suggest`!",
			context: "Content for the setup complete embed",
			replaced: {
				prefix: {
					to_replace: "{{prefix}}",
					description: "The server prefix"
				}
			}
		},
		"SETUP_ADDITIONAL_CONFIG_HEADER": {
			string: "Additional Configuration",
			context: "Header for the Additional Configuration aspect of the setup complete embed"
		},
		"SETUP_ADDITIONAL_CONFIG_DESC_ND": {
			string: "There are a few other configuration options such as reaction emojis, user notifications, cleaning suggestion commands, and more! Use `{{prefix}}config help` for more information.",
			context: "Description for the Additional Configuration aspect of the setup complete embed",
			replaced: {
				prefix: {
					to_replace: "{{prefix}}",
					description: "The server prefix"
				}
			}
		},
		"EVERYONE_PERMISSION_WARNING": {
			string: "Adding the everyone role to the configuration will give __all members of your server__ enhanced permissions on the bot. React with {{check}} if you would like to add the everyone role, and {{x}} if you would like to cancel.",
			context: "Warning about giving the everyone role staff/admin permissions",
			replaced: {
				check: {
					to_replace: "{{check}}",
					description: "The check emoji"
				},
				x: {
					to_replace: "{{x}}",
					description: "The X emoji"
				}
			}
		},
		"DISABLE_INCHANNEL_WARNING": {
			string: "This channel is your suggestions channel, so disabling this channel will also disable the in channel suggestions feature. React with {{check}} if you would like to disable this channel, and {{x}} if you would like to cancel.",
			context: "Warning about giving the everyone role staff/admin permissions",
			replaced: {
				check: {
					to_replace: "{{check}}",
					description: "The check emoji"
				},
				x: {
					to_replace: "{{x}}",
					description: "The X emoji"
				}
			}
		},
		"PING_COUNT_CONTENT": {
			string: "{{guilds}} servers across {{shards}} shards",
			context: "Shows total number of guilds and shards in the ping command",
			replaced: {
				guilds: {
					to_replace: "{{guilds}}",
					description: "Total server count of the bot"
				},
				shards: {
					to_replace: "{{shards}}",
					description: "Total shard count of the bot"
				}
			}
		},
		"PING_COUNT_CONTENT_SHARD": {
			string: "{{guilds}} servers on this shard",
			context: "Shows total number of guilds on a shard",
			replaced: {
				guilds: {
					to_replace: "{{guilds}}",
					description: "Total server count of the shard"
				}
			}
		},
		"PING_SHARD_FOOTER": {
			string: "Shard {{shard}}",
			context: "The shard shown in the footer of the ping embed",
			replaced: {
				shard: {
					to_replace: "{{shard}}",
					description: "The shard the server is on"
				}
			}
		},
		"BLOCK_NO_ARGS_ERROR": {
			string: "You must specify a user or `list` to show a list of blocked users.",
			context: "Error shown when no parameters are speciied for the block command"
		},
		"BLOCKLIST_EMPTY": {
			string: "There are no users blocked from using the bot on this server.",
			context: "Shown when no users are blocked on a server"
		},
		"BLOCK_SELF_ERROR": {
			string: "You cannot block yourself.",
			context: "Error shown when a user attempts to block themselves"
		},
		"BLOCK_USER_BOT_ERROR": {
			string: "This user is a bot, and therefore cannot be blocked.",
			context: "Error shown when a user attempts to block a bot"
		},
		"BLOCK_REASON_TOO_LONG_ERROR": {
			string: "Block reasons are limited to a length of 1024 characters.",
			context: "Error shown when a block reason is too long"
		},
		"BEAN_REASON_TOO_LONG_ERROR": {
			string: "Bean reasons are limited to a length of 1024 characters.",
			context: "Error shown when a bean reason is too long"
		},
		"BLOCK_GLOBAL_STAFF_ERROR": {
			string: "Global Suggester staff members cannot be blocked.",
			context: "Error shown when a user attempts to block a global staff member"
		},
		"BLOCK_STAFF_ERROR": {
			string: "Staff members cannot be blocked.",
			context: "Error shown when a user attempts to block a server staff member"
		},
		"ALREADY_BLOCKED_ERROR": {
			string: "This user is already blocked from using the bot on this server!",
			context: "Error shown when a user attempts to block a user who has already been blocked"
		},
		"BLOCK_REASON_HEADER": {
			string: "Reason:",
			context: "Shown if a reason is specified for the block command"
		},
		"BLOCK_DURATION_HEADER": {
			string: "Duration:",
			context: "Shown if a duration is specified for the block command"
		},
		"BLOCK_SUCCESS": {
			string: "**{{user}}** (`{{id}}`) has been blocked from using the bot on this server.",
			context: "Success message when a user is blocked in a guild",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "The user tag"
				},
				id: {
					to_replace: "{{id}}",
					description: "The user ID"
				}
			}
		},
		"BLOCK_LOG_TITLE": {
			string: "{{staff}} blocked {{user}}",
			context: "Title of the log embed when a user is blocked",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "The blocked user's tag"
				},
				staff: {
					to_replace: "{{staff}}",
					description: "The staff member's tag"
				}
			}
		},
		"BLOCK_USER_DATA": {
			string: "Tag: {{tag}}\nID: {{id}}\nMention: {{mention}}",
			context: "Shows data about the user in the blocked embed",
			replaced: {
				tag: {
					to_replace: "{{tag}}",
					description: "The blocked user's tag"
				},
				id: {
					to_replace: "{{id}}",
					description: "The blocked user's ID"
				},
				mention: {
					to_replace: "{{mention}}",
					description: "The blocked user's mention"
				}
			}
		},
		"STAFF_MEMBER_LOG_FOOTER": {
			string: "Staff Member ID: {{id}}",
			context: "Shows the staff member ID in the block log embed",
			replaced: {
				id: {
					to_replace: "{{id}}",
					description: "The staff member's ID"
				}
			}
		},
		"NO_DENIED_CHANNEL_ERROR": {
			string: "I could not find your configured denied suggestions channel! Please reconfigure or remove your set denied suggestions channel.",
			context: "Error when the configured denied suggestions channel is not found"
		},
		"NO_ARCHIVE_CHANNEL_ERROR": {
			string: "I could not find your implemented suggestions archive channel! Please reconfigure or remove your set implemented suggestions archive channel.",
			context: "Error when the configured implemented suggestions channel is not found"
		},
		"DELETION_REASON_TOO_LONG_ERROR": {
			string: "Deletion reasons are limited to a length of 1024 characters.",
			context: "Error when the deletion reason is too long"
		},
		"DENIAL_REASON_TOO_LONG_ERROR": {
			string: "Denial reasons are limited to a length of 1024 characters.",
			context: "Error when the denial reason is too long"
		},
		"SUGGESTION_DELETED_TITLE": {
			string: "Suggestion Deleted",
			context: "Title for the suggestion deleted embed"
		},
		"DELETED_BY": {
			string: "Deleted by {{user}}",
			context: "Details who deleted a suggestion",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "A user tag"
				}
			}
		},
		"REASON_GIVEN": {
			string: "Reason Given",
			context: "Denotes the reason in the denied/deleted embed"
		},
		"DELETED_DM_TITLE": {
			string: "Your suggestion was deleted in **{{server}}**!",
			context: "Title for the DM notification of a suggestion being deleted",
			replaced: {
				server: {
					to_replace: "{{server}}",
					description: "The name of the server the command was run in"
				}
			}
		},
		"DELETED_DM_TITLE_FOLLOW": {
			string: "A suggestion you follow was deleted in **{{server}}**!",
			context: "Title for the DM notification of a suggestion being deleted on a followed suggestion",
			replaced: {
				server: {
					to_replace: "{{server}}",
					description: "The name of the server the command was run in"
				}
			}
		},
		"DELETED_LOG": {
			string: "{{user}} deleted #{{id}}",
			context: "Title for the log embed when a suggestion is deleted",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "The staff member's tag"
				},
				id: {
					to_replace: "{{id}}",
					description: "The suggestion ID"
				}
			}
		},
		"VOTE_COUNT_OPINION": {
			string: "Opinion:",
			context: "Denotes the vote opinion (upvotes-downvotes) for the suggestion"
		},
		"VOTE_COUNT_UP": {
			string: "Upvotes:",
			context: "Denotes the number of upvotes for the suggestion"
		},
		"VOTE_COUNT_DOWN": {
			string: "Downvotes:",
			context: "Denotes number of downvotes for the suggestion"
		},
		"UNKNOWN": {
			string: "Unknown",
			context: "Shown if something is unknown"
		},
		"NO_COMMENT_ID_SPECIFIED_ERROR": {
			string: "Please provide a valid comment ID.",
			context: "Error shown when the user does not specify or specifies an invalid comment ID"
		},
		"COMMENT_ALREADY_DELETED_ERROR": {
			string: "This comment has already been deleted!",
			context: "Error shown when a user attempts to delete a previously deleted comment"
		},
		"COMMENT_ALREADY_DELETED_ERROR_EDIT": {
			string: "This comment has been deleted!",
			context: "Error shown when a user attempts to edit a previously deleted comment"
		},
		"COMMENT_NOT_AUTHOR_ERROR": {
			string: "You are not the author of this comment, so you cannot edit it!",
			context: "Error shown when a user attempts to edit a comment they did not create (or is not anonymous)"
		},
		"COMMENT_NO_EDIT_CONTENT_ERROR": {
			string: "You must specify new content for the comment!",
			context: "Error when no new content is specified for editing a comment"
		},
		"DELETED_COMMENT_LOG": {
			string: "{{user}} deleted comment {{comment}} from #{{id}}",
			context: "Title for the log embed when a comment is deleted",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "The staff member's tag"
				},
				id: {
					to_replace: "{{id}}",
					description: "The suggestion ID"
				},
				comment: {
					to_replace: "{{comment}}",
					description: "The comment ID"
				}
			}
		},
		"EDITED_COMMENT_LOG": {
			string: "{{user}} edited comment {{comment}} on #{{id}}",
			context: "Title for the log embed when a comment is edited",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "The staff member's tag"
				},
				id: {
					to_replace: "{{id}}",
					description: "The suggestion ID"
				},
				comment: {
					to_replace: "{{comment}}",
					description: "The comment ID"
				}
			}
		},
		"COMMENT_DELETED_TITLE": {
			string: "Comment Deleted",
			context: "Title when a comment is deleted"
		},
		"COMMENT_EDITED_TITLE": {
			string: "Comment Edited",
			context: "Title when a comment is edited"
		},
		"SUGGESTION_DENIED_TITLE": {
			string: "Suggestion Denied",
			context: "Title for the suggestion denied embed"
		},
		"DENIED_BY": {
			string: "Denied by {{user}}",
			context: "Details who denied a suggestion",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "A user tag"
				}
			}
		},
		"DENIED_DM_TITLE": {
			string: "Your suggestion was denied in **{{server}}**!",
			context: "Title for the DM notification of a suggestion being denied",
			replaced: {
				server: {
					to_replace: "{{server}}",
					description: "The name of the server the command was run in"
				}
			}
		},
		"DENIED_DM_TITLE_FOLLOW": {
			string: "A suggestion you follow was denied in **{{server}}**!",
			context: "Title for the DM notification of a suggestion being denied on a followed suggestion",
			replaced: {
				server: {
					to_replace: "{{server}}",
					description: "The name of the server the command was run in"
				}
			}
		},
		"DENIED_LOG": {
			string: "{{user}} denied #{{id}}",
			context: "Title for the log embed when a suggestion is denied",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "The staff member's tag"
				},
				id: {
					to_replace: "{{id}}",
					description: "The suggestion ID"
				}
			}
		},
		"INFO_AUTHOR_HEADER": {
			string: "Author",
			context: "Denotes the suggestion author in the info command"
		},
		"INFO_COMMENT_COUNT_HEADER": {
			string: "Comment Count",
			context: "Denotes the comment count in the info command"
		},
		"INFO_INTERNAL_STATUS_HEADER": {
			string: "Internal Status",
			context: "Denotes the internal status in the info command"
		},
		"INFO_PUBLIC_STATUS_HEADER": {
			string: "Public Status",
			context: "Denotes the public status in the info command"
		},
		"AWAITING_REVIEW_STATUS": {
			string: "Awaiting Staff Review",
			context: "Denotes a suggestion await staff review"
		},
		"QUEUE_POST_LINK": {
			string: "Queue Post",
			context: "Hyperlink for the queue post of a suggestion awaiting review"
		},
		"STATUS_IMPLEMENTED": {
			string: "Implemented",
			context: "Denotes a suggestion having the implemented status"
		},
		"STATUS_PROGRESS": {
			string: "In Progress",
			context: "Denotes a suggestion having the in progress status"
		},
		"STATUS_CONSIDERATION": {
			string: "In Consideration",
			context: "Denotes a suggestion having the in consideration status"
		},
		"STATUS_NO": {
			string: "Not Happening",
			context: "Denotes a suggestion having the not happening status"
		},
		"STATUS_DEFAULT": {
			string: "Default",
			context: "Denotes a suggestion having the default status"
		},
		"INFO_IMPLEMENTED": {
			string: "This suggestion was transferred to the implemented suggestion archive channel.",
			context: "Note on the info command when a suggestion has been transferred to the implemented archive channel"
		},
		"NONE_AWAITING_REVIEW": {
			string: "There are no suggestions awaiting review!",
			context: "Shown when the queue is empty in the listqueue command"
		},
		"PENDING_REVIEW_HEADER_NUM": {
			string: "Suggestions Pending Review (showing {{min}}-{{max}} of {{total}})",
			context: "Header for the listqueue embed",
			replaced: {
				min: {
					to_replace: "{{min}}",
					context: "The first number of suggestions being shown"
				},
				max: {
					to_replace: "{{max}}",
					context: "The last number of suggestions being shown"
				},
				total: {
					to_replace: "{{total}}",
					context: "The total number of suggestions awaiting review"
				},
			}
		},
		"STATUS_ALREADY_SET_ERROR": {
			string: "This suggestion already has a status of **{{status}}**",
			context: "Error shown when the suggestion already has the status a user is trying to mark",
			replaced: {
				status: {
					to_replace: "{{status}}",
					description: "A status string"
				}
			}
		},
		"STATUS_EDITED_TITLE": {
			string: "Status Edited",
			context: "Header for the Status Edited embed"
		},
		"IMPLEMENTED_LINK": {
			string: "Implemented Archive Post",
			context: "Hyperlink to the implemented archive channel post when a suggestion is archived"
		},
		"STATUS_MARK_DM_TITLE": {
			string: "The status of your suggestion in **{{server}}** was edited!",
			context: "Title for the DM notification of a status being marked on a suggestion",
			replaced: {
				server: {
					to_replace: "{{server}}",
					description: "The name of the server the command was run in"
				}
			}
		},
		"STATUS_MARK_DM_TITLE_FOLLOW": {
			string: "The status of a suggestion you follow in **{{server}}** was edited!",
			context: "Title for the DM notification of a status being marked on a suggestion on a followed suggestion",
			replaced: {
				server: {
					to_replace: "{{server}}",
					description: "The name of the server the command was run in"
				}
			}
		},
		"STATUS_MARK_LOG": {
			string: "{{user}} set a status for #{{id}}",
			context: "Title for the log embed when a status is marked",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "The staff member's tag"
				},
				id: {
					to_replace: "{{id}}",
					description: "The suggestion ID"
				}
			}
		},
		"NONE_SPECIFIED_MASS_ERROR": {
			string: "You must specify at least one suggestion.",
			context: "Error shown when no suggestions are specified for a mass command"
		},
		"NAN_MASS_APPROVE_ERROR": {
			string: "One or more of the suggestion IDs you've entered is not a number. Please ensure all of your IDs are numbers. If you're trying to specify a comment, add `-r` between the suggestion IDs and the comment.",
			context: "Error shown when a suggestion ID specified in a mass approve command is not a number"
		},
		"NAN_MASS_DENY_ERROR": {
			string: "One or more of the suggestion IDs you've entered is not a number. Please ensure all of your IDs are numbers. If you're trying to specify a reason, add `-r` between the suggestion IDs and the reason.",
			context: "Error shown when a suggestion ID specified in a mass deny/delete command is not a number"
		},
		"MASS_APPROVE_SUCCESS_TITLE": {
			string: "Approved {{some}}/{{total}} suggestions",
			context: "Title of the massapprove embed which shows the results of the command",
			replaced: {
				some: {
					to_replace: "{{some}}",
					description: "The number of suggestions that were approved"
				},
				total: {
					to_replace: "{{total}}",
					description: "The number of suggestions that were inputted"
				}
			}
		},
		"MASS_APPROVE_APPROVE_RESULTS_DETAILED": {
			string: "**Approved:** {{list}}",
			context: "Details which suggestions could be approved in the massapprove command",
			replaced: {
				list: {
					to_replace: "{{list}}",
					description: "The list of suggestions"
				}
			}
		},
		"MASS_APPROVE_FAIL_RESULTS_DETAILED": {
			string: "**Could Not Approve:** {{list}}",
			context: "Details which suggestions could not be approved in the massapprove command",
			replaced: {
				list: {
					to_replace: "{{list}}",
					description: "The list of suggestions"
				}
			}
		},
		"MASS_APPROVE_ERROR_DETAILS": {
			string: "One or more of these suggestions could not be approved. Please make sure the suggestion IDs you have provided exist and have not already been approved.",
			context: "Shows why suggestions generally are not approved in the massapprove command"
		},
		"MASS_DELETE_SUCCESS_TITLE": {
			string: "Deleted {{some}}/{{total}} suggestions",
			context: "Title of the massdelete embed which shows the results of the command",
			replaced: {
				some: {
					to_replace: "{{some}}",
					description: "The number of suggestions that were deleted"
				},
				total: {
					to_replace: "{{total}}",
					description: "The number of suggestions that were inputted"
				}
			}
		},
		"MASS_DELETE_SUCCESS_RESULTS_DETAILED": {
			string: "**Deleted:** {{list}}",
			context: "Details which suggestions could be deleted in the massdelete command",
			replaced: {
				list: {
					to_replace: "{{list}}",
					description: "The list of suggestions"
				}
			}
		},
		"MASS_DELETE_FAIL_RESULTS_DETAILED": {
			string: "**Could Not Delete:** {{list}}",
			context: "Details which suggestions could not be deleted in the massdelete command",
			replaced: {
				list: {
					to_replace: "{{list}}",
					description: "The list of suggestions"
				}
			}
		},
		"MASS_DELETE_ERROR_DETAILS": {
			string: "One or more of these suggestions could not be deleted. Please make sure the suggestion IDs you have provided exist and have not already been deleted/denied.",
			context: "Shows why suggestions generally are not deleted in the massdelete command"
		},
		"MASS_DENY_SUCCESS_TITLE": {
			string: "Denied {{some}}/{{total}} suggestions",
			context: "Title of the massdeny embed which shows the results of the command",
			replaced: {
				some: {
					to_replace: "{{some}}",
					description: "The number of suggestions that were denied"
				},
				total: {
					to_replace: "{{total}}",
					description: "The number of suggestions that were inputted"
				}
			}
		},
		"MASS_DENY_SUCCESS_RESULTS_DETAILED": {
			string: "**Denied:** {{list}}",
			context: "Details which suggestions could be denied in the massdeny command",
			replaced: {
				list: {
					to_replace: "{{list}}",
					description: "The list of suggestions"
				}
			}
		},
		"MASS_DENY_FAIL_RESULTS_DETAILED": {
			string: "**Could Not Deny:** {{list}}",
			context: "Details which suggestions could not be denied in the massdeny command",
			replaced: {
				list: {
					to_replace: "{{list}}",
					description: "The list of suggestions"
				}
			}
		},
		"MASS_DENY_ERROR_DETAILS": {
			string: "One or more of these suggestions could not be denied. Please make sure the suggestion IDs you have provided exist and have not already been approved/denied.",
			context: "Shows why suggestions generally are not denied in the massdeny command"
		},
		"NO_ATTACHMENT_REMOVE_ERROR": {
			string: "This suggestion does not have an attachment.",
			context: "Error shown when a user attempts to remove an attachment from a suggestion that has no attachment"
		},
		"ATTACHMENT_REMOVED_TITLE": {
			string: "Attachment Removed",
			context: "Title for the Attachment Removed embed"
		},
		"ATTACH_REMOVE_LOG": {
			string: "{{user}} removed the attachment from #{{id}}",
			context: "Title for the log embed when an attachment is removed from a suggestion",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "The staff member's tag"
				},
				id: {
					to_replace: "{{id}}",
					description: "The suggestion ID"
				}
			}
		},
		"USER_NOT_BLOCKED_ERROR": {
			string: "This user is not blocked from using the bot on this server.",
			context: "Error shown when a user attempts to unblock a user who is not blocked on a server"
		},
		"UNBLOCK_SUCCESS": {
			string: "**{{user}}** (`{{id}}`) has been unblocked from using the bot on this server.",
			context: "Success message when a user is unblocked in a guild",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "The user tag"
				},
				id: {
					to_replace: "{{id}}",
					description: "The user ID"
				}
			}
		},
		"UNBLOCK_LOG_TITLE": {
			string: "{{staff}} unblocked {{user}}",
			context: "Title of the log embed when a user is unblocked",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "The unblocked user's tag"
				},
				staff: {
					to_replace: "{{staff}}",
					description: "The staff member's tag"
				}
			}
		},
		"COOLDOWN_SPAM_FLAG": {
			string: "{{mention}} ⚠️ You have been flagged by the command spam protection filter. This is generally caused when you use a lot of commands too quickly over a period of time. Due to this, you cannot use commands temporarily until a Suggester staff member reviews your situation. If you believe this is an error, please join {{support}} and contact our Support Team.",
			context: "Message shown when a user triggers the command cooldown spam filter",
			replaced: {
				mention: {
					to_replace: "{{mention}}",
					description: "The user mention"
				},
				support: {
					to_replace: "{{support}}",
					description: "The link to the support server"
				}
			}
		},
		"COMMAND_COOLDOWN": {
			string: "🕑 This command is on cooldown for {{time}} more second(s).",
			context: "Shown when a command is on cooldown and a user attempts to use it",
			replaced: {
				time: {
					to_replace: "{{time}}",
					description: "The number of seconds left for the cooldown"
				}
			}
		},
		"TUTORIAL_HEADER": {
			string: "Thanks for adding Suggester!",
			context: "Header for the tutorial embed"
		},
		"TUTORIAL_DESC": {
			string: "Suggester will help you easily and efficiently manage your server's suggestions, letting you get feedback from your community while also keeping out spam/unwanted suggestions! Staff members can also perform a number of actions on suggestions including (but not limited to) adding comments and marking statuses! The bot's prefix is `{{prefix}}` by default, but can be changed at any time using the `config` command.",
			context: "Description for the tutorial embed",
			replaced: {
				prefix: {
					to_replace: "{{prefix}}",
					description: "The bot prefix"
				}
			}
		},
		"TUTORIAL_GET_STARTED_HEADER": {
			string: "Let's Get Started!",
			context: "Header for the Let's Get Started section of the tutorial embed"
		},
		"TUTORIAL_GET_STARTED_DESCRIPTION": {
			string: "Before users can submit suggestions, someone with the **Manage Server** permission needs to do a bit of configuration. An easy way to do this is to run `{{prefix}}setup`, which will start a walkthrough for setting up the most essential elements of the bot.",
			context: "Description for the Let's Get Started section of the tutorial embed",
			replaced: {
				prefix: {
					to_replace: "{{prefix}}",
					description: "The bot prefix"
				}
			}
		},
		"TUTORIAL_NEXT_HEADER": {
			string: "What's Next?",
			context: "Header for the What's Next? section of the tutorial embed"
		},
		"TUTORIAL_NEXT_DESCRIPTION_NEW": {
			string: "After you run `{{prefix}}setup`, users can submit suggestions and the bot will work. If you are looking for more advanced configuration options like custom suggestion feed reactions and auto-cleaning of suggestion commands, try out `{{prefix}}config`.\n\nIf you're having an issue, or just want to find out more about the bot, head over to the __Suggester support server__: {{invite}}\nThis embed can be shown at any time using the `{{prefix}}tutorial` command.",
			context: "Description for the What's Next? section of the tutorial embed",
			replaced: {
				prefix: {
					to_replace: "{{prefix}}",
					description: "The bot prefix"
				},
				invite: {
					to_replace: "{{invite}}",
					description: "The invite to the Suggester support server"
				}
			}
		},
		"PERMISSIONS_MISSING_HEADER": {
			string: "This command cannot be run because some permissions are missing. {{name}} needs the following permissions in the {{channel}} channel:",
			context: "Header for the embed shown when the bot is missing permissions necessary for a command",
			replaced: {
				name: {
					to_replace: "{{name}}",
					description: "The username of the bot"
				},
				channel: {
					to_replace: "{{channel}}",
					description: "The channel where permissions are missing"
				}
			}
		},
		"MISSING_ELEMENTS_HEADER": {
			string: "Missing Elements",
			context: "Denotes what elements are missing when some permissions/config elements are"
		},
		"HOW_TO_FIX_HEADER": {
			string: "How to Fix",
			context: "Shows how to fix missing configuration elements/permissions"
		},
		"FIX_MISSING_PERMISSIONS_INFO": {
			string: "In the channel settings for {{channel}}, make sure that **{{name}}** has the above permissions allowed.",
			context: "Shows how to fix permission issues",
			replaced: {
				name: {
					to_replace: "{{name}}",
					description: "The username of the bot"
				},
				channel: {
					to_replace: "{{channel}}",
					description: "The channel where permissions are missing"
				}
			}
		},
		"MISSING_CONFIG_HEADER": {
			string: "This command cannot be run because some server configuration elements are missing. A server manager can fix this by using the `{{prefix}}config` command.",
			context: "Shown when configuration elements are missing",
			replaced: {
				prefix: {
					to_replace: "{{prefix}}",
					description: "The bot prefix"
				}
			}
		},
		"PERMISSION:CREATE_INSTANT_INVITE": {
			string: "Create Instant Invite",
			context: "String representing the Create Instant Invite permission"
		},
		"PERMISSION:KICK_MEMBERS": {
			string: "Kick Members",
			context: "String representing the Kick Members permission"
		},
		"PERMISSION:BAN_MEMBERS": {
			string: "Ban Members",
			context: "String representing the Ban Members permission"
		},
		"PERMISSION:ADMINISTRATOR": {
			string: "Administrator",
			context: "String representing the Administrator permission"
		},
		"PERMISSION:MANAGE_CHANNELS": {
			string: "Manage Channels",
			context: "String representing the Manage Channels permission"
		},
		"PERMISSION:MANAGE_GUILD": {
			string: "Manage Server",
			context: "String representing the Manage Server permission"
		},
		"PERMISSION:ADD_REACTIONS": {
			string: "Add Reactions",
			context: "String representing the Add Reactions permission"
		},
		"PERMISSION:VIEW_AUDIT_LOG": {
			string: "View Audit Log",
			context: "String representing the View Audit Log permission"
		},
		"PERMISSION:VIEW_CHANNEL": {
			string: "View Channel",
			context: "String representing the View Channel permission"
		},
		"PERMISSION:SEND_MESSAGES": {
			string: "Send Messages",
			context: "String representing the Send Messages permission"
		},
		"PERMISSION:SEND_TTS_MESSAGES": {
			string: "Send TTS Messages",
			context: "String representing the Send TTS Messages permission"
		},
		"PERMISSION:MANAGE_MESSAGES": {
			string: "Manage Messages",
			context: "String representing the Manage Messages permission"
		},
		"PERMISSION:EMBED_LINKS": {
			string: "Embed Links",
			context: "String representing the Embed Links permission"
		},
		"PERMISSION:ATTACH_FILES": {
			string: "Attach Files",
			context: "String representing the Attach Files permission"
		},
		"PERMISSION:READ_MESSAGE_HISTORY": {
			string: "Read Message History",
			context: "String representing the Read Message History permission"
		},
		"PERMISSION:MENTION_EVERYONE": {
			string: "Mention Everyone",
			context: "String representing the Mention Everyone permission"
		},
		"PERMISSION:USE_EXTERNAL_EMOJIS": {
			string: "Use External Emojis",
			context: "String representing the Use External Emojis permission"
		},
		"PERMISSION:CONNECT": {
			string: "Connect",
			context: "String representing the Connect permission"
		},
		"PERMISSION:SPEAK": {
			string: "Speak",
			context: "String representing the Speak permission"
		},
		"PERMISSION:MUTE_MEMBERS": {
			string: "Mute Members",
			context: "String representing the Mute Members permission"
		},
		"PERMISSION:DEAFEN_MEMBERS": {
			string: "Deafen Members",
			context: "String representing the Deafen Members permission"
		},
		"PERMISSION:MOVE_MEMBERS": {
			string: "Move Members",
			context: "String representing the Move Members permission"
		},
		"PERMISSION:USE_VAD": {
			string: "Use Voice Activity",
			context: "String representing the Use Voice Activity permission"
		},
		"PERMISSION:PRIORITY_SPEAKER": {
			string: "Priority Speaker",
			context: "String representing the Priority Speaker permission"
		},
		"PERMISSION:CHANGE_NICKNAME": {
			string: "Change Nickname",
			context: "String representing the Change Nickname permission"
		},
		"PERMISSION:MANAGE_NICKNAMES": {
			string: "Manage Nicknames",
			context: "String representing the Manage Nicknames permission"
		},
		"PERMISSION:MANAGE_ROLES": {
			string: "Manage Roles",
			context: "String representing the Manage Roles permission"
		},
		"PERMISSION:MANAGE_WEBHOOKS": {
			string: "Manage Webhooks",
			context: "String representing the Manage Webhooks permission"
		},
		"PERMISSION:MANAGE_EMOJIS": {
			string: "Manage Emojis",
			context: "String representing the Manage Emojis permission"
		},
		"PERMISSION:STREAM": {
			string: "Stream",
			context: "String representing the Stream permission"
		},
		"PERMISSION:VIEW_GUILD_INSIGHTS": {
			string: "View Guild Insights",
			context: "String representing the View Guild Insights permission"
		},
		"BOT_ADMIN_PERMISSION_SENTENCE_NEW": {
			string: "<:sdev:842489745723752469> This command is only usable by bot administrators",
			context: "Permission shown in the help command if only bot admins can use the command"
		},
		"GLOBAL_STAFF_PERMISSION_SENTENCE_NEW": {
			string: "<:sstaff:842489745812226078> This command is only usable by global Suggester staff",
			context: "Permission shown in the help command if global staff+ can use the command"
		},
		"SERVER_ADMIN_PERMISSION_SENTENCE": {
			string: "<:ssadmin:740199955981140030> This command is only usable by members with the \"Manage Server\" permission or a configured admin role",
			context: "Permission shown in the help command if server admins+ can use the command"
		},
		"SERVER_STAFF_PERMISSION_SENTENCE": {
			string: "<:ssstaff:740199956429799515> This command is only usable by members with a configured staff role or those with admin permissions",
			context: "Permission shown in the help command if server staff+ can use the command"
		},
		"ALL_USERS_PERMISSION_SENTENCE": {
			string: "<:sall:740199956325072998> This command is usable by all users",
			context: "Permission shown in the help command if all users can use the command"
		},
		"HAS_NOT_COMMAND_PERMISSION": {
			string: "<:slock:740204044450005103> You do not have permission to use this command",
			context: "Shown in help if a user does not have permission to use a command"
		},
		"HAS_COMMAND_PERMISSION": {
			string: "<:sunlock:740204044928155788> You are able to use this command",
			context: "Shown in help if a user has permission to use a command"
		},
		"CFG_ALREADY_BLOCKED_ROLE_ERROR": {
			string: "This role has already been blocked from using the bot on this server.",
			context: "Error when a role has already been added as a blocked role"
		},
		"CFG_BLOCKED_ROLE_ADD_SUCCESS": {
			string: "Members with the **{{role}}** role can no longer use the bot on this server.",
			context: "Success message when a role is added to the server blocked role list",
			replaced: {
				role: {
					to_replace: "{{role}}",
					description: "A role name"
				}
			}
		},
		"CFG_NOT_BLOCKED_ROLE_ERROR": {
			string: "This role is not currently a blocked role.",
			context: "Error when a role has not already been added as a blocked role"
		},
		"CFG_BLOCK_ROLE_REMOVE_SUCCESS": {
			string: "Members with the **{{role}}** role are no longer blocked from using the bot on this server.",
			context: "Success message when a role is removed from the server blocked role list",
			replaced: {
				role: {
					to_replace: "{{role}}",
					description: "A role name"
				}
			}
		},
		"SHARD_INFO": {
			string: "This server is on shard {{shard}}.",
			context: "Shows information about the current shard for the shard command",
			replaced: {
				shard: {
					to_replace: "{{shard}}",
					context: "The current shard"
				}
			}
		},
		"CFG_RESET_PING_ROLE_SUCCESS": {
			string: "Successfully reset the suggestion submitted mention role.",
			context: "Success message when the mention on submitted suggestion role is reset"
		},
		"CFG_RESET_FEED_PING_ROLE_SUCCESS": {
			string: "Successfully reset the suggestion approved mention role.",
			context: "Success message when the mention on submitted approved role is reset"
		},
		"CFG_NO_MENTION_EVERYONE_ERROR": {
			string: "Please give {{bot}} the **Mention Everyone** permission in order for the bot to be able to mention this role when a suggestion is submitted.",
			context: "Error when an suggestion ping role is configured but the bot does not have the Mention Everyone permission",
			replaced: {
				bot: {
					to_replace: "{{bot}}",
					description: "The bot mention"
				}
			}
		},
		"CFG_ALREADY_PING_ROLE_ERROR": {
			string: "This role is already set to be mentioned when a suggestion is submitted!",
			context: "Error when the specified suggestion ping role is already set"
		},
		"CFG_PING_ROLE_SUCCESS": {
			string: "The **{{role}}** role will now be mentioned when suggestions are submitted for review.",
			context: "Success message when the suggestion ping role is configured",
			replaced: {
				role: {
					to_replace: "{{role}}",
					description: "A role name"
				}
			}
		},
		"CFG_ALREADY_FEED_PING_ROLE_ERROR": {
			string: "This role is already set to be mentioned when a suggestion is approved!",
			context: "Error when the specified suggestio  approved ping role is already set"
		},
		"CFG_FEED_PING_ROLE_SUCCESS": {
			string: "The **{{role}}** role will now be mentioned when suggestions are approved.",
			context: "Success message when the suggestion approved ping role is configured",
			replaced: {
				role: {
					to_replace: "{{role}}",
					description: "A role name"
				}
			}
		},
		"LOCALE_LIST_TITLE": {
			string: "Available Locales",
			context: "Title for the list of locales"
		},
		"LOCALE_LIST_INCOMPLETE_TITLE": {
			string: "Incomplete Locales",
			context: "Title for the list of incomplete locales"
		},
		"LOCALE_LIST_INCOMPLETE_DESC": {
			string: "Locales in this list have not been completely translated, some parts of the bot may still appear in English. (Help translate by joining the [Support Server]({{support_invite}}))",
			context: "Description for the list of incomplete locales",
			replaced: {
				support_invite: {
					to_replace: "{{support_invite}}",
					description: "The invite to the support server"
				}
			}
		},
		"SELECTED": {
			string: "Selected",
			context: "Indicates the selected locale"
		},
		"NO_LOCALE_ERROR": {
			string: "No locale was found based on that input! Run this command with no parameters to see a list of available locales.",
			context: "Error shown when a user specifies an invalid locale"
		},
		"USER_LOCALE_SET_SUCCESS": {
			string: "Your locale has been successfully set to **{{name}}**. You can report issues with this locale and help translate it by joining the Suggester support server: {{invite}}",
			context: "Success message shown when the locale is set for a user",
			replaced: {
				name: {
					to_replace: "{{name}}",
					description: "The locale name"
				},
				invite: {
					to_replace: "{{invite}}",
					description: "The invite to the support server"
				}
			}
		},
		"GUILD_LOCALE_SET_SUCCESS": {
			string: "This server's locale has been successfully set to **{{name}}**. You can report issues with this locale and help translate it by joining the Suggester support server: {{invite}}",
			context: "Success message shown when the locale is set for a server",
			replaced: {
				name: {
					to_replace: "{{name}}",
					description: "The locale name"
				},
				invite: {
					to_replace: "{{invite}}",
					description: "The invite to the support server"
				}
			}
		},
		"LOCALE_SERVER_SETTING_PROMPT": {
			string: "If you would like to set this locale as the server default, use `{{prefix}}config locale {{code}}`.",
			context: "If a server admin uses the command, prompts them to configure the locale for the entire server",
			replaced: {
				prefix: {
					to_replace: "{{prefix}}",
					description: "The server prefix"
				},
				code: {
					to_replace: "{{code}}",
					description: "The locale code"
				}
			}
		},
		"LOCALE_FOOTER": {
			string: "Don't see your language listed here? Apply to translate it in the support server!",
			context: "Shown in the locale list embed informing users of how they can help translate"
		},
		"LOCALE_EASTER_EGG_ACTIVATED": {
			string: "OwO mode activated!",
			context: "If you misspell a language name, there is a small chance OwO mode will be activated."
		},
		"LOCALE_REFRESH_SUCCESS": {
			string: "Successfully loaded {{count}} locales.",
			context: "Message shown when locales are reloaded",
			replaced: {
				count: {
					to_replace: "{{count}}",
					description: "The amount of locales that were loaded"
				}
			}
		},
		"CFG_COLOR_CHANGE_INFO": {
			string: "At **{{number}}** net upvote(s), the embed color will change to {{color}}.",
			context: "Shows the configured color change settings",
			replaced: {
				number: {
					to_replace: "{{number}}",
					description: "The configured number of net upvotes"
				},
				color: {
					to_replace: "{{color}}",
					description: "The configured color for the embed to change to"
				}
			}
		},
		"CFG_COLOR_CHANGE_INVALID_NUMBER": {
			string: "You must specify a valid integer greater than 0.",
			context: "Error shown when the number specified for the color change threshold is invalid or less than 1"
		},
		"CFG_COLOR_CHANGE_INVALID_COLOR": {
			string: "You must specify a valid color (ex. Hex color, CSS color name)",
			context: "Error shown when the color specified for the color change is invalid"
		},
		"CFG_COLOR_CHANGE_NO_PARAMS": {
			string: "You must specify `color` or `count`",
			context: "Error shown when an invalid parameter is specified in upvote color change configuration"
		},
		"CFG_INTERNAL_TITLE": {
			string: "Internal Configuration",
			context: "Header for the internal configuration section of the config list embed"
		},
		"COMMAND_SERVER_ONLY": {
			string: "This command is not available in DMs.",
			context: "Error shown when a command is not available in DMs"
		},
		"HELP_USEFUL_LINKS": {
			string: "Useful Links",
			context: "Header for the useful links section of the help embed"
		},
		"HELP_USEFUL_LINKS_DESC_NEW": {
			string: "[Join our Support Server](https://discord.gg/{{support_invite}})\n[Documentation](https://suggester.js.org/)\n[Invite Me]({{bot_invite}})\n[Support Suggester](https://suggester.js.org/#/supporting/info)\n[Privacy Policy](https://suggester.js.org/#/legal)",
			context: "Shows useful links on the help command",
			replaced: {
				support_invite: {
					to_replace: "{{support_invite}}",
					description: "The link to the support server"
				},
				bot_invite: {
					to_replace: "{{bot_invite}}",
					description: "The link to invite the bot"
				}
			}
		},
		"PROTIP_TITLE": {
			string: "**Protip:**",
			context: "Title when protips are shown"
		},
		"PROTIP_INVITE": {
			string: "You can invite Suggester to your server [here]({{bot_invite}})",
			context: "Protip for inviting the bot",
			replaced: {
				bot_invite: {
					to_replace: "{{bot_invite}}",
					description: "The link to invite the bot"
				}
			}
		},
		"PROTIP_SUPPORT": {
			string: "If you need help with Suggester or want to suggest a new feature, join our [support server]({{support_invite}})",
			context: "Protip for the support server",
			replaced: {
				support_invite: {
					to_replace: "{{support_invite}}",
					description: "The link to the support server"
				}
			}
		},
		"PROTIP_REASON_APPROVE": {
			string: "You can specify a comment when approving a suggestion using `{{prefix}}approve <suggestion id> <comment>`",
			context: "Protip for approving with a comment",
			replaced: {
				prefix: {
					to_replace: "{{prefix}}",
					description: "The server prefix"
				}
			}
		},
		"PROTIP_MASS_APPROVE": {
			string: "You can approve multiple suggestions at once using `{{prefix}}mapprove <suggestion id 1> <suggestion id 2> <suggestion id 3> -r <comment>`",
			context: "Protip for mass approving",
			replaced: {
				prefix: {
					to_replace: "{{prefix}}",
					description: "The server prefix"
				}
			}
		},
		"PROTIP_REASON_DENY": {
			string: "You can specify a reason when denying a suggestion using `{{prefix}}deny <suggestion id> <reason>`",
			context: "Protip for denying with a reason",
			replaced: {
				prefix: {
					to_replace: "{{prefix}}",
					description: "The server prefix"
				}
			}
		},
		"PROTIP_MASS_DENY": {
			string: "You can deny multiple suggestions at once using `{{prefix}}mdeny <suggestion id 1> <suggestion id 2> <suggestion id 3> -r <comment>`",
			context: "Protip for mass denying",
			replaced: {
				prefix: {
					to_replace: "{{prefix}}",
					description: "The server prefix"
				}
			}
		},
		"PROTIP_INCHANNEL": {
			string: "You can configure Suggester to allow suggestions to be submitted via any message in the suggestions feed channel using `{{prefix}}config sendinchannel on`",
			context: "Protip for in-channel suggestions",
			replaced: {
				prefix: {
					to_replace: "{{prefix}}",
					description: "The server prefix"
				}
			}
		},
		"PROTIP_EMOTES": {
			string: "You can configure custom reaction emojis for the suggestion feed using these commands:\n`{{prefix}}config emojis up <emoji>`\n`{{prefix}}config emojis mid <emoji>`\n`{{prefix}}config emojis down <emoji>`\n\nYou can also disable any of the reaction emojis using `{{prefix}}config emojis <up, mid, or down> disable`",
			context: "Protip for emote config",
			replaced: {
				prefix: {
					to_replace: "{{prefix}}",
					description: "The server prefix"
				}
			}
		},
		"PROTIP_VOTING": {
			string: "If you enjoy Suggester, consider helping to support us by voting on bot lists! If you have a minute, click [here]({{list}}) and vote. If you're in our [Support Server]({{support_invite}}) you can get cool rewards for voting!\n\nIf you want to help even more, you can use `{{prefix}}vote` to see the full list of sites where you can vote. Thanks for your support!",
			context: "Protip for voting",
			replaced: {
				prefix: {
					to_replace: "{{prefix}}",
					description: "The server prefix"
				},
				support_invite: {
					to_replace: "{{support_invite}}",
					description: "The link to the support server"
				},
				list: {
					to_replace: "{{list}}",
					description: "Randomly selected bot list link"
				}
			}
		},
		"PROTIP_NOTIFY": {
			string: "You can use `{{prefix}}notify` to enable or disable receiving DM notifications when an action is taken on one of your suggestions",
			context: "Protip for notify",
			replaced: {
				prefix: {
					to_replace: "{{prefix}}",
					description: "The server prefix"
				}
			}
		},
		"PROTIP_LOCALE": {
			string: "You can use `{{prefix}}locale` to make the bot respond to you in a different language. If your language isn't listed and/or you'd like to help translate, join our [Support Server]({{support_invite}}) and ask to join the Translation Program!",
			context: "Protip for locale",
			replaced: {
				prefix: {
					to_replace: "{{prefix}}",
					description: "The server prefix"
				},
				support_invite: {
					to_replace: "{{support_invite}}",
					description: "The link to the support server"
				}
			}
		},
		"PROTIP_CHANGELOG": {
			string: "You can use `{{prefix}}changelog` to see the latest bot updates",
			context: "Protip for changelog",
			replaced: {
				prefix: {
					to_replace: "{{prefix}}",
					description: "The server prefix"
				}
			}
		},
		"PROTIP_ACOMMENT": {
			string: "You can add an anonymous comment to a suggestion using `{{prefix}}acomment <suggestion ID> <comment>`. These are the same as comments, but they don't show who created them",
			context: "Protip for acomment",
			replaced: {
				prefix: {
					to_replace: "{{prefix}}",
					description: "The server prefix"
				}
			}
		},
		"PROTIP_MARKCOMMENT": {
			string: "You can add a comment to a suggestion when using the mark command using `{{prefix}}mark <suggestion ID> <status> <comment>`",
			context: "Protip for mark with a comment",
			replaced: {
				prefix: {
					to_replace: "{{prefix}}",
					description: "The server prefix"
				}
			}
		},
		"PROTIP_BLOCK": {
			string: "You can block a user from using the bot on your server using `{{prefix}}block <user>`",
			context: "Protip for block",
			replaced: {
				prefix: {
					to_replace: "{{prefix}}",
					description: "The server prefix"
				}
			}
		},
		"PROTIP_COLORCHANGE": {
			string: "You can configure the bot to change the embed color when a suggestion reaches a certain number of upvotes by using `{{prefix}}config colorchange number <number of upvotes>` and `{{prefix}}config colorchange color <color>`",
			context: "Protip for colorchange",
			replaced: {
				prefix: {
					to_replace: "{{prefix}}",
					description: "The server prefix"
				}
			}
		},
		"PROTIP_QUEUE": {
			string: "You can view all suggestions currently awaiting review using the `{{prefix}}queue` command",
			context: "Protip for queue",
			replaced: {
				prefix: {
					to_replace: "{{prefix}}",
					description: "The server prefix"
				}
			}
		},
		"PROTIP_CANARY": {
			string: "You can join the Suggester Canary program to help test new bot features before they are released to the main bot. Join the [Support Server]({{support_invite}}) for info!",
			context: "Protip for Canary",
			replaced: {
				support_invite: {
					to_replace: "{{support_invite}}",
					description: "The link to the support server"
				}
			}
		},
		"PROTIP_LARGE_SERVER": {
			string: "This server may be eligible for Suggester's **large server program**. Read more about the program [here](https://suggester.js.org/#/community-programs) and apply in the [support server]({{support_invite}}) for info!",
			context: "Protip for the large server program",
			replaced: {
				support_invite: {
					to_replace: "{{support_invite}}",
					description: "The link to the support server"
				}
			}
		},
		"PROTIP_RICKROLL": {
			string: "We're no strangers to love\n" +
				"You know the rules and so do I\n" +
				"A full commitment's what I'm thinking of\n" +
				"You wouldn't get this from any other guy\n" +
				"I just wanna tell you how I'm feeling\n" +
				"Gotta make you understand\n" +
				"Never gonna give you up\n" +
				"Never gonna let you down\n" +
				"Never gonna run around and desert you\n" +
				"Never gonna make you cry\n" +
				"Never gonna say goodbye\n" +
				"Never gonna tell a lie and hurt you\n" +
				"We've known each other for so long\n" +
				"Your heart's been aching but you're too shy to say it\n" +
				"Inside we both know what's been going on\n" +
				"We know the game and we're gonna play it\n" +
				"And if you ask me how I'm feeling\n" +
				"Don't tell me you're too blind to see\n" +
				"Never gonna give you up\n" +
				"Never gonna let you down\n" +
				"Never gonna run around and desert you\n" +
				"Never gonna make you cry\n" +
				"Never gonna say goodbye\n" +
				"Never gonna tell a lie and hurt you\n" +
				"Never gonna give you up\n" +
				"Never gonna let you down\n" +
				"Never gonna run around and desert you\n" +
				"Never gonna make you cry\n" +
				"Never gonna say goodbye",
			context: "Protip for a rick-roll"
		},
		"PROTIPS_TITLE": {
			string: "**Protips:**",
			context: "Denotes the protips section in the verify embed"
		},
		"PROTIPS_SHOWN_TITLE": {
			string: "**Protips Shown:**",
			context: "Denotes the protips shown section in the verify embed"
		},
		"IMPORTED_REASON": {
			string: "This suggestion was denied before it was imported into Suggester.",
			context: "Reason for suggestion denial for importing"
		},
		"IMPORTED_SUCCESS": {
			string: "Successfully imported {{count}} suggestion(s)!",
			context: "Success message for importing",
			replaced: {
				count: {
					to_replace: "{{count}}",
					description: "The number of imported suggestions"
				}
			}
		},
		"IMPORTED_SOME_ERROR": {
			string: "Successfully imported {{count}} suggestion(s)! Some suggestions weren't imported, possibly because they were already imported or were above the 1024 character limit.",
			context: "Success message for importing when some were not imported",
			replaced: {
				count: {
					to_replace: "{{count}}",
					description: "The number of imported suggestions"
				}
			}
		},
		"IMPORTED_NONE": {
			string: "No suggestions were imported",
			context: "Error shown when no suggestions are imported"
		},
		"IMPORT_START": {
			string: "Beginning import... Under optimal conditions this should take {{time}}.",
			context: "Shown when a user begins an import",
			replaced: {
				time: {
					to_replace: "{{time}}",
					description: "The estimated time that the import will take"
				}
			}
		},
		"IMPORT_TITLE": {
			string: "Importing Suggestions",
			context: "Title for the importing embed"
		},
		"IMPORT_DESC": {
			string: "Suggester can import suggestions from your existing suggestions channel, allowing you to utilize all of Suggester's features on them!\nSuggester can import suggestions sent by users, as well as ones submitted through these bots:\n{{bots}}\n\nThe last **30** messages sent in __this channel__ will be imported. If you need to import more messages, stop this import and contact our [support team]({{support_invite}}).\nTo continue with this import, select {{check}}. To cancel, select {{x}}.",
			context: "Description for the suggestion embed",
			replaced: {
				bots: {
					to_replace: "{{bots}}",
					description: "The list of supported bots for import"
				},
				support_invite: {
					to_replace: "{{support_invite}}",
					description: "The link to the support server"
				},
				check: {
					to_replace: "{{check}}",
					description: "The check emoji"
				},
				x: {
					to_replace: "{{x}}",
					description: "The X emoji"
				}
			}
		},
		"IMPORT_OVERRIDE_TITLE": {
			string: "Message Override",
			context: "Title for the override header of the import embed"
		},
		"IMPORT_OVERRIDE_DESC": {
			string: "**{{num}}** messages will be imported",
			context: "Shows how many messages will be imported if the limit is overriden",
			replaced: {
				num: {
					to_replace: "{{num}}",
					description: "The number of messages to import"
				}
			}
		},
		"IMPORT_TOO_MANY_ERROR": {
			string: "You must specify an integer between 1 and 100.",
			context: "Error shown when the number of messages to import is invalid"
		},
		"VOTES_TITLE": {
			string: "Votes",
			context: "Header for the votes section of the suggestion embed"
		},
		"NO_SUGGESTIONS_FOUND": {
			string: "No suggestions that matched your query were found",
			context: "Error shown when no suggestions are found for the top/down command"
		},
		"TOP_TITLE_NEW_AGAIN": {
			string: "Top {{number}} Highest Voted Suggestions (showing {{min}}-{{max}} of {{number}})",
			context: "Header for the top suggestions embed",
			replaced: {
				number: {
					to_replace: "{{number}}",
					description: "The number of suggestions shown"
				},
				min: {
					to_replace: "{{min}}",
					context: "The first number of suggestions being shown"
				},
				max: {
					to_replace: "{{max}}",
					context: "The last number of suggestions being shown"
				}
			}
		},
		"DOWN_TITLE_NEW": {
			string: "Top {{number}} Lowest Voted Suggestions (showing {{min}}-{{max}} of {{number}})",
			context: "Header for the lowest voted suggestions embed",
			replaced: {
				number: {
					to_replace: "{{number}}",
					description: "The number of suggestions shown"
				},
				min: {
					to_replace: "{{min}}",
					context: "The first number of suggestions being shown"
				},
				max: {
					to_replace: "{{max}}",
					context: "The last number of suggestions being shown"
				}
			}
		},
		"SUGGESTION_LOADING": {
			string: "Collecting suggestion data, this may take a moment...",
			context: "Message shown when waiting for top 10 data to collect"
		},
		"COMMAND_DESC:ACKNOWLEDGEMENT": {
			string: "Sets a verify acknowledgement for a user",
			context: "Description for the acknowledgement command"
		},
		"COMMAND_USAGE:ACKNOWLEDGEMENT": {
			string: "acknowledgement [user] (new acknowledgement)",
			context: "Description for the acknowledgement command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:ACKNOWLEDGEMENT": {
			string: "`{{p}}acknowledgement`\n" +
				"Shows your acknowledgement\n" +
				"\n" +
				"`{{p}}acknowledgement @Brightness™`\n" +
				"Shows Brightness™'s acknowledgement\n" +
				"\n" +
				"`{{p}}acknowledgement @Brightness™ Test`\n" +
				"Sets Brightness™'s acknowledgement to \"Test\"\n" +
				"\n" +
				"`{{p}}acknowledgement @Brightness™ reset`\n" +
				"Resets Brightness™'s acknowledgement",
			context: "Examples for the acknowledgement command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:SEARCH": {
			string: "Searches suggestions on this server",
			context: "Description for the search command"
		},
		"COMMAND_USAGE:SEARCH": {
			string: "search [query]",
			context: "Usage for the search command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:SEARCH": {
			string: "`{{p}}search status:approved author:327887845270487041`\nSearches for approved suggestions created by user 327887845270487041\n\n`{{p}}search mark:\"in progress\" staff:702180584503508994`\nSearches for suggestions marked as \"In Progress\" that were approved by user 702180584503508994\n\n`{{p}}search votes>10 time>\"1 month\" content!\"test\"`\nSearches for suggestions with more than 10 votes, more than a month old, and with a content not including \"test\"",
			context: "Examples for the search command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:EXEMPT": {
			string: "Allows a user to bypass the server's configured suggestion cooldown",
			context: "Description for the exempt command"
		},
		"COMMAND_USAGE:EXEMPT": {
			string: "exempt [user]",
			context: "Usage for the exempt command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:EXEMPT": {
			string: "`{{p}}exempt @Brightness™`\nExempts Brightness™ from the configured suggestion cooldown\n\n`{{p}}exempt 255834596766253057`\nExempts a user with ID 255834596766253057 from the configured suggestion cooldown",
			context: "Examples for the exempt command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:ALLOWLIST": {
			string: "Adds a server to the allowed list",
			context: "Description for the allowlist command"
		},
		"COMMAND_USAGE:ALLOWLIST": {
			string: "allowlist [add/remove] [guild id]",
			context: "Description for the allowlist command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:ALLOWLIST": {
			string: "`{{p}}allowlist add 681490407862829073`\n" +
				"Adds server 681490407862829073 to the allowed list\n" +
				"\n" +
				"`{{p}}allowlist remove 681490407862829073`\n" +
				"Removes server 681490407862829073 from the allowed list",
			context: "Examples for the allowlist command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:DB": {
			string: "Gets or modifies a database entry",
			context: "Description for the db command"
		},
		"COMMAND_USAGE:DB": {
			string: "db [query|modify] [collection] [query field] [query value] (modify:field) (modify:value)",
			context: "Description for the db command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:DB": {
			string: "`{{p}}db query Suggestion suggestionId 1`\n" +
				"Gets data for a document in the `Suggestion` collection with a `suggestionId` of `1`\n" +
				"\n" +
				"`{{p}}db modify Suggestion suggestionId 1 suggester 327887845270487041`\n" +
				"Sets the `suggester` value of a document in the `Suggestion` collection with a `suggestionId` of `1` to `327887845270487041`",
			context: "Examples for the db command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:DEPLOY": {
			string: "Pulls an update from git and reboots with changes",
			context: "Description for the deploy command"
		},
		"COMMAND_USAGE:DEPLOY": {
			string: "deploy (branch)",
			context: "Description for the deploy command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:DEPLOY": {
			string: "`{{p}}deploy`\n" +
				"Deploys an update from the `production` branch\n" +
				"\n" +
				"`{{p}}deploy staging`\n" +
				"Deploys an update from the `staging` branch",
			context: "Examples for the deploy command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:EVAL": {
			string: "Runs JavaScript code",
			context: "Description for the eval command"
		},
		"COMMAND_USAGE:EVAL": {
			string: "eval [code]",
			context: "Description for the eval command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:EVAL": {
			string: "`{{p}}eval return 2+2`\nEvaluates the value of 2+2 and returns it",
			context: "Examples for the eval command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:FLAGS": {
			string: "Sets internal flags for a user",
			context: "Description for the flags command"
		},
		"COMMAND_USAGE:FLAGS": {
			string: "flags [guild|user [id] (add|remove) (flag)",
			context: "Description for the flags command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:FLAGS": {
			string: "`{{p}}flags user @Brightness™`\n" +
				"Shows flags for Brightness™\n" +
				"\n" +
				"`{{p}}flags user @Brightness™ add STAFF`\n" +
				"Adds the `STAFF` flag to Brightness™\n" +
				"\n" +
				"`{{p}}flags user @Brightness™ remove STAFF`\n" +
				"Removes the `STAFF` flag from Brightness™\n" +
				"\n" +
				"`{{p}}flags guild 635632859998060554`\n" +
				"Shows flags for guild 635632859998060554\n" +
				"\n" +
				"`{{p}}flags guild 635632859998060554 add PROTECTED`\n" +
				"Adds the `PROTECTED` flag to guild 635632859998060554\n" +
				"\n" +
				"`{{p}}flags guild 635632859998060554 remove PROTECTED`\n" +
				"Removes the `PROTECTED` flag from guild 635632859998060554",
			context: "Examples for the flags command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:GLOBALBAN": {
			string: "Excludes a user or server from using the bot globally",
			context: "Description for the globalban command"
		},
		"COMMAND_USAGE:GLOBALBAN": {
			string: "globalban [guild|user] [id] (true|false)",
			context: "Description for the globalban command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:GLOBALBAN": {
			string: "`{{p}}globalban user 327887845270487041`\n" +
				"Checks block status for user 327887845270487041\n" +
				"\n" +
				"`{{p}}globalban user 327887845270487041 true`\n" +
				"Blocks user 327887845270487041 globally\n" +
				"\n" +
				"`{{p}}globalban user 327887845270487041 false`\n" +
				"Unblocks user 327887845270487041 globally\n" +
				"\n" +
				"`{{p}}globalban guild 693209117220929596`\n" +
				"Checks block status for guild 693209117220929596\n" +
				"\n" +
				"`{{p}}globalban guild 693209117220929596 true`\n" +
				"Blocks guild 327887845270487041 from using the bot\n" +
				"\n" +
				"`{{p}}globalban guild 693209117220929596 false`\n" +
				"Unblocks guild 327887845270487041 from using the bot",
			context: "Examples for the globalban command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:REBOOT": {
			string: "Reboots the bot by exiting the process",
			context: "Description for the reboot command"
		},
		"COMMAND_USAGE:REBOOT": {
			string: "reboot (shard id)",
			context: "Description for the reboot command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:REBOOT": {
			string: "`{{p}}reboot`\n" +
				"Reboots all shards of the bot\n" +
				"\n" +
				"`{{p}}reboot 2`\n" +
				"Reboots shard 2",
			context: "Examples for the reboot command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:SHELL": {
			string: "Runs shell code",
			context: "Description for the shell command"
		},
		"COMMAND_USAGE:SHELL": {
			string: "shell [code]",
			context: "Description for the shell command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_DESC:CHANGELOG": {
			string: "Shows the latest Suggester release",
			context: "Description for the changelog command"
		},
		"COMMAND_USAGE:CHANGELOG": {
			string: "changelog",
			context: "Description for the changelog command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_DESC:HELP": {
			string: "Shows command information",
			context: "Description for the help command"
		},
		"COMMAND_USAGE:HELP": {
			string: "help (command name)",
			context: "Description for the help command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:HELP": {
			string: "`{{p}}help`\n" +
				"Shows the list of commands\n" +
				"\n" +
				"`{{p}}help suggest`\n" +
				"Shows information about the \"suggest\" command",
			context: "Examples for the help command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:INVITE": {
			string: "Shows the link to invite the bot",
			context: "Description for the invite command"
		},
		"COMMAND_USAGE:INVITE": {
			string: "invite",
			context: "Usage for the invite command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_DESC:GITHUB": {
			string: "Shows the link to Suggester's GitHub repository",
			context: "Description for the github command"
		},
		"COMMAND_USAGE:GITHUB": {
			string: "github",
			context: "Usage for the github command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_DESC:PREFIX": {
			string: "Shows the bot's prefix on this server",
			context: "Description for the prefix command"
		},
		"COMMAND_USAGE:PREFIX": {
			string: "prefix",
			context: "Usage for the prefix command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_DESC:LOCALE": {
			string: "Sets the language the bot responds to you in",
			context: "Description for the locale command"
		},
		"COMMAND_USAGE:LOCALE": {
			string: "locale <locale to set>",
			context: "Description for the locale command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:LOCALE": {
			string: "`{{p}}locale`\n" +
				"Shows the list of available languages\n" +
				"\n" +
				"`{{p}}locale fr`\n" +
				"Sets your language to French",
			context: "Examples for the locale command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:NOTIFY": {
			string: "Views/edits your notification settings",
			context: "Description for the notify command"
		},
		"COMMAND_USAGE:NOTIFY": {
			string: "notify (on|off|toggle)",
			context: "Description for the notify command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:NOTIFY": {
			string: "`{{p}}notify`\n" +
				"Shows your DM notification setting\n" +
				"\n" +
				"`{{p}}notify on`\n" +
				"Enables DM notifications for suggestion changes\n" +
				"\n" +
				"`{{p}}notify off`\n" +
				"Disables DM notifications for suggestion changes\n" +
				"\n" +
				"`{{p}}notify toggle`\n" +
				"Toggles DM notifications for suggestion changes",
			context: "Examples for the notify command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:PING": {
			string: "Checks bot response time and shows information",
			context: "Description for the ping command"
		},
		"COMMAND_USAGE:PING": {
			string: "ping",
			context: "Description for the ping command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_DESC:PROTIPS": {
			string: "Views/edits your protip setting",
			context: "Description for the protips command"
		},
		"COMMAND_USAGE:PROTIPS": {
			string: "protips (on|off|toggle)",
			context: "Description for the protips command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:PROTIPS": {
			string: "`{{p}}protips`\n" +
				"Shows your protips setting\n" +
				"\n" +
				"`{{p}}protips on`\n" +
				"Enables showing protips\n" +
				"\n" +
				"`{{p}}protips off`\n" +
				"Disables showing protips\n" +
				"\n" +
				"`{{p}}protips toggle`\n" +
				"Toggles showing protips",
			context: "Examples for the protips command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:SHARD": {
			string: "Shows the shard this server is on",
			context: "Description for the shard command"
		},
		"COMMAND_USAGE:SHARD": {
			string: "shard",
			context: "Description for the shard command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_DESC:SUGGEST": {
			string: "Submits a suggestion",
			context: "Description for the suggest command"
		},
		"COMMAND_USAGE:SUGGEST": {
			string: "suggest [suggestion]",
			context: "Description for the suggest command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:SUGGEST": {
			string: "`{{p}}suggest This is a suggestion`\n" +
				"Submits a suggestion\n" +
				"\n" +
				"You can also attach images to your suggestion by uploading an image when you send the command",
			context: "Examples for the suggest command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:SUPPORT": {
			string: "Shows the link to the support server",
			context: "Description for the support command"
		},
		"COMMAND_USAGE:SUPPORT": {
			string: "support",
			context: "Description for the support command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_DESC:TUTORIAL": {
			string: "Shows information about setting up the bot and using it",
			context: "Description for the tutorial command"
		},
		"COMMAND_USAGE:TUTORIAL": {
			string: "tutorial",
			context: "Description for the tutorial command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_DESC:VERIFY": {
			string: "Shows permissions of a user as they relate to the bot",
			context: "Description for the verify command"
		},
		"COMMAND_USAGE:VERIFY": {
			string: "verify (user)",
			context: "Description for the verify command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:VERIFY": {
			string: "`{{p}}verify`\n" +
				"Shows information about you\n" +
				"\n" +
				"`{{p}}verify @Brightness™`\n" +
				"Shows Brightness™'s information",
			context: "Examples for the verify command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:VOTE": {
			string: "Help support the bot!",
			context: "Description for the vote command"
		},
		"COMMAND_USAGE:VOTE": {
			string: "vote",
			context: "Description for the vote command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_DESC:AUTOSETUP": {
			string: "Automatically sets up channels and configures the bot",
			context: "Description for the autosetup command"
		},
		"COMMAND_USAGE:AUTOSETUP": {
			string: "autosetup",
			context: "Description for the autosetup command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_DESC:CONFIG": {
			string: "Shows/edits server configuration",
			context: "Description for the config command"
		},
		"COMMAND_USAGE:CONFIG": {
			string: "config (element) (additional parameters)",
			context: "Description for the config command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:CONFIG": {
			string: "Use `{{p}}config help` to view detailed instructions",
			context: "Examples for the config command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:IMPORT": {
			string: "Imports suggestions from a channel",
			context: "Description for the import command"
		},
		"COMMAND_USAGE:IMPORT": {
			string: "import",
			context: "Description for the import command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_DESC:SETUP": {
			string: "Walks you through an interactive configuration process",
			context: "Description for the setup command"
		},
		"COMMAND_USAGE:SETUP": {
			string: "setup",
			context: "Description for the setup command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:SETUP": {
			string: "The bot will send a prompt, and you send your response in the channel. The bot will then send another prompt, and the cycle continues until your server is configured.",
			context: "Examples for the setup command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:ACOMMENT": {
			string: "Adds a comment to an approved suggestion anonymously",
			context: "Description for the acomment command"
		},
		"COMMAND_USAGE:ACOMMENT": {
			string: "acomment [suggestion id] [comment]",
			context: "Description for the acomment command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:ACOMMENT": {
			string: "`{{p}}acomment 1 This is a comment`\n" +
				"Anonymously comments on suggestion #1 with \"This is a comment\"",
			context: "Examples for the acomment command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:APPROVE": {
			string: "Approves a suggestion",
			context: "Description for the approve command"
		},
		"COMMAND_USAGE:APPROVE": {
			string: "approve [suggestion id] (comment)",
			context: "Description for the approve command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:APPROVE": {
			string: "`{{p}}approve 1`\n" +
				"Approves suggestion #1\n" +
				"\n" +
				"`{{p}}approve 1 This is a comment`\n" +
				"Approves suggestion #1 and adds a comment from the approver saying \"This is a comment\"",
			context: "Examples for the approve command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:ATTACH": {
			string: "Attaches a file to an approved suggestion",
			context: "Description for the attach command"
		},
		"COMMAND_USAGE:ATTACH": {
			string: "attach [suggestion id] [attachment link]",
			context: "Description for the attach command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:ATTACH": {
			string: "`{{p}}attach 1 https://i.imgur.com/zmntNve.png`\n" +
				"Attaches https://i.imgur.com/zmntNve.png to suggestion #1\n" +
				"\n" +
				"`{{p}}attach 1`\n" +
				"If you attach an image via Discord's native uploader, it will be added to suggestion #1",
			context: "Examples for the attach command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:BL": {
			string: "Blocks a user from using the bot in this server",
			context: "Description for the block command"
		},
		"COMMAND_USAGE:BL": {
			string: "block [user] (duration) (reason)",
			context: "Description for the block command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:BL": {
			string: "`{{p}}block @Brightness™`\nBlocks Brightness™ from using the bot in this server\n\n`{{p}}block 255834596766253057 Spamming suggestions`\nBlocks a user with ID 255834596766253057 from using the bot in this server for \"Spamming suggestions\"\n\n`{{p}}block @Brightness™ 1h`\nBlocks Brightness™ from using the bot in this server for 1 hour\n\n`{{p}}block 255834596766253057 2h Spamming suggestions`\nBlocks a user with ID 255834596766253057 from using the bot in this server for 2 hours with reason \"Spamming suggestions\"",
			context: "Examples for the block command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:COMMENT": {
			string: "Adds a comment to an approved suggestion",
			context: "Description for the comment command"
		},
		"COMMAND_USAGE:COMMENT": {
			string: "comment [suggestion id] [comment]",
			context: "Description for the comment command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:COMMENT": {
			string: "`{{p}}comment 1 This is a comment`\n" +
				"Comments on suggestion #1 with \"This is a comment\"",
			context: "Examples for the comment command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:DELETE": {
			string: "Deletes a suggestion, removing it from the suggestions feed",
			context: "Description for the delete command"
		},
		"COMMAND_USAGE:DELETE": {
			string: "delete [suggestion id] (reason)",
			context: "Description for the delete command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:DELETE": {
			string: "`{{p}}delete 1`\n" +
				"Deletes suggestion #1\n" +
				"\n" +
				"`{{p}}delete 1 This has already been suggested`\n" +
				"Deletes suggestion #1 with the reason \"This has already been suggested\"",
			context: "Examples for the delete command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:DELETECOMMENT": {
			string: "Deletes a comment from a suggestion",
			context: "Description for the deletecomment command"
		},
		"COMMAND_USAGE:DELETECOMMENT": {
			string: "deletecomment [comment id]",
			context: "Description for the deletecomment command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:DELETECOMMENT": {
			string: "`{{p}}deletecomment 27_1`\nDeletes a comment with the ID `27_1`",
			context: "Examples for the deletecomment command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:DENY": {
			string: "Denies a suggestion",
			context: "Description for the deny command"
		},
		"COMMAND_USAGE:DENY": {
			string: "deny [suggestion id] (reason)",
			context: "Description for the deny command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:DENY": {
			string: "`{{p}}deny 1`\n" +
				"Denies suggestion #1\n" +
				"\n" +
				"`{{p}}deny 1 This isn't something we're interested in`\n" +
				"Denies suggestion #1 with the reason \"This isn't something we're interested in\"",
			context: "Examples for the deny command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:DUPE": {
			string: "Denies a suggestion as a duplicate of another",
			context: "Description for the dupe command"
		},
		"COMMAND_USAGE:DUPE": {
			string: "dupe [duplicate suggestion id] [original suggestion id]",
			context: "Description for the dupe command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:DUPE": {
			string: "`{{p}}dupe 1 2`\nDenies suggestion #1 as a duplicate of suggestion #2",
			context: "Examples for the dupe command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:INFO": {
			string: "Shows information about a suggestion",
			context: "Description for the info command"
		},
		"COMMAND_USAGE:INFO": {
			string: "info [suggestion id]",
			context: "Description for the info command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:INFO": {
			string: "`{{p}}info 1`\nShows information about suggestion #1",
			context: "Examples for the info command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:LISTQUEUE": {
			string: "Shows the queue of suggestions awaiting review",
			context: "Description for the listqueue command"
		},
		"COMMAND_USAGE:LISTQUEUE": {
			string: "listqueue",
			context: "Description for the listqueue command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_DESC:MARKSTATUS": {
			string: "Marks a status on a suggestion",
			context: "Description for the mark command"
		},
		"COMMAND_USAGE:MARKSTATUS": {
			string: "mark [suggestion id] [status] (comment)",
			context: "Description for the mark command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:MARKSTATUS": {
			string: "`{{p}}mark 1 implemented`\nMarks suggestion #1 as implemented\n\n`{{p}}mark 1 working This will be released soon!`\nMarks suggestion #1 as in progress and adds a comment saying \"This will be released soon!\"\n\n>>> **Status List:**\n<:simplementednum:822458050161147914> Implemented (`implemented`)\n<:sworkingnum:822458050374795295> In Progress (`working`)\n<:sconsider:822458050111340544> In Consideration (`considered`)\n<:sdefault1:842488332562071612> Default (`default`)\n<:snonum:822458049801355315> Not Happening (`no`)",
			context: "Examples for the mark command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:MASSAPPROVE": {
			string: "Approves multiple suggestions at once",
			context: "Description for the massapprove command"
		},
		"COMMAND_USAGE:MASSAPPROVE": {
			string: "massapprove [suggestion ids] -r (comment)",
			context: "Description for the massapprove command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:MASSAPPROVE": {
			string: "`{{p}}massapprove 1 2 3`\n" +
				"Approves suggestions 1, 2, and 3\n" +
				"\n" +
				"`{{p}}massapprove 1 2 3 -r Nice suggestion!`\n" +
				"Approves suggestions 1, 2, and 3 and comments on each of them with \"Nice suggestion!\"",
			context: "Examples for the massapprove command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:MASSDELETE": {
			string: "Deletes multiple suggestions at once, removing them from the suggestions feed",
			context: "Description for the massdelete command"
		},
		"COMMAND_USAGE:MASSDELETE": {
			string: "massdelete [suggestion ids] -r (reason)",
			context: "Description for the massdelete command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:MASSDELETE": {
			string: "`{{p}}massdelete 1 2 3`\n" +
				"Deletes suggestions 1, 2, and 3\n" +
				"\n" +
				"`{{p}}massdelete 1 2 3 -r Cleaning up suggestions`\n" +
				"Deletes suggestions 1, 2, and 3 with a reason of \"Cleaning up suggestions\"",
			context: "Examples for the massdelete command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:MASSDENY": {
			string: "Denies multiple suggestions at once",
			context: "Description for the massdeny command"
		},
		"COMMAND_USAGE:MASSDENY": {
			string: "massdeny [suggestion ids] -r (reason)",
			context: "Description for the massdeny command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:MASSDENY": {
			string: "`{{p}}massdeny 1 2 3`\n" +
				"Denies suggestions 1, 2, and 3\n" +
				"\n" +
				"`{{p}}massdeny 1 2 3 -r This isn't something we're interested in doing`\n" +
				"Denies suggestions 1, 2, and 3 with a reason of \"This isn't something we're interested in doing\"",
			context: "Examples for the massdeny command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:REMOVEATTACHMENT": {
			string: "Removes an attachment from a suggestion",
			context: "Description for the removeattachment command"
		},
		"COMMAND_USAGE:REMOVEATTACHMENT": {
			string: "removeattachment [suggestion id]",
			context: "Description for the removeattachment command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:REMOVEATTACHMENT": {
			string: "`{{p}}removeattachment 1`\nRemoves the attachment from suggestion #1",
			context: "Examples for the removeattachment command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:SILENTDELETE": {
			string: "Deletes a suggestion without posting it to the denied suggestions feed or DMing the suggesting user",
			context: "Description for the silentdelete command"
		},
		"COMMAND_USAGE:SILENTDELETE": {
			string: "silentdelete [suggestion id] (reason)",
			context: "Description for the silentdelete command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:SILENTDELETE": {
			string: "`{{p}}silentdelete 1`\n" +
				"Silently deletes suggestion #1\n" +
				"\n" +
				"`{{p}}silentdelete 1 This has already been suggested`\n" +
				"Silently deletes suggestion #1 with the reason \"This has already been suggested\"",
			context: "Examples for the silentdelete command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:SILENTDENY": {
			string: "Denies a suggestion without posting it to the denied suggestions feed or DMing the suggesting user",
			context: "Description for the silentdeny command"
		},
		"COMMAND_USAGE:SILENTDENY": {
			string: "silentdeny [suggestion id] (reason)",
			context: "Description for the silentdeny command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:SILENTDENY": {
			string: "`{{p}}silentdeny 1`\n" +
				"Silently denies suggestion #1\n" +
				"\n" +
				"`{{p}}silentdeny 1 This isn't something we're interested in`\n" +
				"Silently denies suggestion #1 with the reason \"This isn't something we're interested in\"",
			context: "Examples for the silentdeny command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:TOPVOTED": {
			string: "Shows the top 10 most highly voted suggestions",
			context: "Description for the top command"
		},
		"COMMAND_USAGE:TOPVOTED": {
			string: "top (time)",
			context: "Description for the top command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:TOPVOTED": {
			string: "`{{p}}top`\nShows the top 10 suggestions\n\n`{{p}}top 1w`\nShows the top 10 suggestions from the last week",
			context: "Examples for the top command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:DOWN": {
			string: "Shows the top 10 lowest voted suggestions",
			context: "Description for the down command"
		},
		"COMMAND_USAGE:DOWN": {
			string: "down (time)",
			context: "Description for the down command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:DOWN": {
			string: "`{{p}}down`\nShows the top 10 lowest voted suggestions\n\n`{{p}}down 1w`\nShows the top 10 lowest voted suggestions from the last week",
			context: "Examples for the down command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:UNBLOCK": {
			string: "Unblocks a user from using the bot in this server",
			context: "Description for the unblock command"
		},
		"COMMAND_USAGE:UNBLOCK": {
			string: "unblock [user]",
			context: "Description for the unblock command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:UNBLOCK": {
			string: "`{{p}}unblock @Brightness™`\n" +
				"Unblocks Brightness™ from using the bot in this server\n" +
				"\n" +
				"`{{p}}unblock 255834596766253057 Accidentally blocked`\n" +
				"Unblocks a user with ID 255834596766253057 from using the bot in this server with reason \"Accidentally blocked\"",
			context: "Examples for the unblock command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"MODULE_NAME:CONFIGURATION": {
			string: "Configuration",
			context: "The name of the Configuration module"
		},
		"MODULE_DESC:CONFIGURATION": {
			string: "Commands for configuring the bot",
			context: "The description for the Configuration module"
		},
		"MODULE_NAME:DEVELOPER": { string: "Developer", context: "The name of the Developer module" },
		"MODULE_DESC:DEVELOPER": {
			string: "Commands for developers/global administrators",
			context: "The description for the Developer module"
		},
		"MODULE_NAME:GLOBAL STAFF": {
			string: "Global Staff",
			context: "The name of the Global Staff module"
		},
		"MODULE_DESC:GLOBAL STAFF": {
			string: "Commands usable by global Suggester staff members",
			context: "The description for the Global Staff module"
		},
		"MODULE_NAME:MODERATOR": { string: "Moderator", context: "The name of the Moderator module" },
		"MODULE_DESC:MODERATOR": {
			string: "Commands for moderating who can submit suggestions",
			context: "The description for the Moderator module"
		},
		"MODULE_NAME:OTHER": { string: "Other", context: "The name of the Other module" },
		"MODULE_DESC:OTHER": {
			string: "Miscellaneous commands",
			context: "The description for the Other module"
		},
		"MODULE_NAME:REVIEW": { string: "Review", context: "The name of the Review module" },
		"MODULE_DESC:REVIEW": {
			string: "Commands for reviewing suggestions (only available when the bot is in the `review` mode)",
			context: "The description for the Review module"
		},
		"MODULE_NAME:SUGGESTIONS": {
			string: "Suggestions",
			context: "The name of the Suggestions module"
		},
		"MODULE_DESC:SUGGESTIONS": {
			string: "Commands for submitting and interacting with suggestions",
			context: "The description for the Suggestions module"
		},
		"UNKNOWN_COMMAND_ERROR": {
			string: "No command was found based on your input!",
			context: "Error shown when no command can be found in the help command"
		},
		"UNKNOWN_ELEMENT_ERROR": {
			string: "No configuration element was found based on your input!",
			context: "Error shown when no element can be found in the config help command"
		},
		"CFG_OTHER_SERVER_ERROR": {
			string: "Configurations of other servers are view-only via the `list` subcommand.",
			context: "Error shown when a server that is not the current one has a config subcommand run"
		},
		"CONFIG_NAME:ADMIN": {
			string: "Admin Roles",
			context: "Name of the Admin Roles config element"
		},
		"CONFIG_DESC:ADMIN": {
			string: "Roles that are allowed to edit server configuration, as well as use all staff commands. (Members with the **Manage Server** permission also have access to these commands)",
			context: "Description of the Admin Roles config element"
		},
		"CONFIG_EXAMPLES:ADMIN": {
			string: "`{{p}}config admin add Owner`\n" +
				"Adds the \"Owner\" role as an admin role\n" +
				"\n" +
				"`{{p}}config admin add @Management`\n" +
				"Adds the mentioned \"Management\" role as an admin role\n" +
				"\n" +
				"`{{p}}config admin add 658753146910408724`\n" +
				"Adds a role with ID 658753146910408724 as an admin role\n" +
				"\n" +
				"`{{p}}config admin remove Owner`\n" +
				"Removes the \"Owner\" role from the list of admin roles",
			context: "Examples for the Admin Roles config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `admin`"
		},
		"CONFIG_NAME:STAFF": {
			string: "Staff Roles",
			context: "Name of the Staff Roles config element"
		},
		"CONFIG_DESC:STAFF": {
			string: "Roles that have access to suggestion management commands like `approve`, `deny`, `comment`, and `mark`.",
			context: "Description of the Staff Roles config element"
		},
		"CONFIG_EXAMPLES:STAFF": {
			string: "`{{p}}config staff add Staff`\n" +
				"Adds the \"Staff\" role as a staff role\n" +
				"\n" +
				"`{{p}}config staff add @Moderator`\n" +
				"Adds the mentioned \"Moderator\" role as a staff role\n" +
				"\n" +
				"`{{p}}config staff add 658753146910408724`\n" +
				"Adds a role with ID 658753146910408724 as a staff role\n" +
				"\n" +
				"`{{p}}config staff remove Moderator`\n" +
				"Removes the \"Moderator\" role from the list of staff roles",
			context: "Examples for the Staff Roles config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `staff`"
		},
		"CONFIG_NAME:ALLOWED": {
			string: "Allowed Suggesting Roles",
			context: "Name of the Allowed Suggesting Roles config element"
		},
		"CONFIG_DESC:ALLOWED": {
			string: "Roles that are allowed to submit suggestions. If no roles are configured, all users can submit suggestions.",
			context: "Description of the Allowed Suggesting Roles config element"
		},
		"CONFIG_EXAMPLES:ALLOWED": {
			string: "`{{p}}config allowed add Trusted`\n" +
				"Adds the \"Trusted\" role to the list of allowed roles\n" +
				"\n" +
				"`{{p}}config allowed add @Cool Person`\n" +
				"Adds the mentioned \"Cool Person\" role as an allowed role\n" +
				"\n" +
				"`{{p}}config allowed add 658753146910408724`\n" +
				"Adds a role with ID 658753146910408724 to the list of allowed roles\n" +
				"\n" +
				"`{{p}}config allowed remove Trusted`\n" +
				"Removes the \"Trusted\" role from the list of allowed roles",
			context: "Examples for the Allowed Suggesting Roles config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `allowed`"
		},
		"CONFIG_NAME:VOTING": {
			string: "Voting Roles",
			context: "Name of the Voting Roles config element"
		},
		"CONFIG_DESC:VOTING": {
			string: "Roles that are allowed to vote on suggestions in the approved suggestion feed. If no roles are configured, all users can vote on suggestions.",
			context: "Description of the Voting Roles config element"
		},
		"CONFIG_EXAMPLES:VOTING": {
			string: "`{{p}}config voting add Trusted`\n" +
				"Adds the \"Trusted\" role to the list of allowed voting roles\n" +
				"\n" +
				"`{{p}}config voting add @Cool Person`\n" +
				"Adds the mentioned \"Cool Person\" role as an allowed voting role\n" +
				"\n" +
				"`{{p}}config voting add 658753146910408724`\n" +
				"Adds a role with ID 658753146910408724 to the list of allowed voting roles\n" +
				"\n" +
				"`{{p}}config voting remove Trusted`\n" +
				"Removes the \"Trusted\" role from the list of allowed voting roles",
			context: "Examples for the Voting Roles config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `voting`"
		},
		"CONFIG_NAME:BLOCKED": {
			string: "Blocked Roles",
			context: "Name of the Blocked Roles config element"
		},
		"CONFIG_DESC:BLOCKED": {
			string: "Roles that are blocked from using the bot on this server. If you want to block one specific user, use the `block` command.",
			context: "Description of the Blocked Roles config element"
		},
		"CONFIG_EXAMPLES:BLOCKED": {
			string: "`{{p}}config blocked add Restricted`\n" +
				"Adds the \"Restricted\" role to the list of blocked roles\n" +
				"\n" +
				"`{{p}}config blocked add @Bad Person`\n" +
				"Adds the mentioned \"Bad Person\" role as a blocked role\n" +
				"\n" +
				"`{{p}}config blocked add 658753146910408724`\n" +
				"Adds a role with ID 658753146910408724 to the list of blocked roles\n" +
				"\n" +
				"`{{p}}config blocked remove Annoying`\n" +
				"Removes the \"Annoying\" role from the list of blocked roles, allowing members with that role to use the bot again",
			context: "Examples for the Blocked Roles config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `blocked`"
		},
		"CONFIG_NAME:APPROVEROLE": {
			string: "Approved Suggestion Role",
			context: "Name of the Approved Suggestion Role config element"
		},
		"CONFIG_DESC:APPROVEROLE": {
			string: "The role that is given to members that have a suggestion approved.",
			context: "Description of the Approved Suggestion Role config element"
		},
		"CONFIG_EXAMPLES:APPROVEROLE": {
			string: "`{{p}}config approverole Suggestion Submitter`\n" +
				"Sets the \"Suggestion Submitter\" as the role given when a member has their suggestion approved\n" +
				"\n" +
				"`{{p}}config approverole none`\n" +
				"Resets the role given when a member has their suggestion approved, meaning no role will be given",
			context: "Examples for the Approved Suggestion Role config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `approverole`"
		},
		"CONFIG_NAME:REVIEWPING": {
			string: "Suggestion Submitted Mention Role",
			context: "Name of the Suggestion Submitted Mention Role config element"
		},
		"CONFIG_DESC:REVIEWPING": {
			string: "The role that is mentioned when a new suggestion is submitted for review.",
			context: "Description of the Suggestion Submitted Mention Role config element"
		},
		"CONFIG_EXAMPLES:REVIEWPING": {
			string: "`{{p}}config reviewping Staff`\n" +
				"Sets the \"Staff\" role as the role mentioned when a suggestion is submitted for review\n" +
				"\n" +
				"`{{p}}config reviewping none`\n" +
				"Resets the role mentioned when a suggestion is submitted for review, meaning no role will be mentioned",
			context: "Examples for the Suggestion Submitted Mention Role config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `pingrole`"
		},
		"CONFIG_NAME:APPROVEPING": {
			string: "Suggestion Approved Mention Role",
			context: "Name of the Suggestion Approved Mention Role config element"
		},
		"CONFIG_DESC:APPROVEPING": {
			string: "The role that is mentioned when a new suggestion is approved and sent to the suggestions feed.",
			context: "Description of the Suggestion Approved Mention Role config element"
		},
		"CONFIG_EXAMPLES:APPROVEPING": {
			string: "`{{p}}config approveping Voting Squad`\nSets the \"Voting Squad\" role as the role mentioned when a suggestion is sent to the suggestions feed\n\n`{{p}}config approveping none`\nResets the role mentioned when a suggestion is sent to the suggestions feed, meaning no role will be mentioned",
			context: "Examples for the Suggestion Approved Mention Role config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `pingrole`"
		},
		"CONFIG_NAME:REVIEW": {
			string: "Suggestion Review Channel",
			context: "Name of the Suggestion Review Channel config element"
		},
		"CONFIG_DESC:REVIEW": {
			string: "The channel where suggestions are sent once they are submitted for review.",
			context: "Description of the Suggestion Review Channel config element"
		},
		"CONFIG_EXAMPLES:REVIEW": {
			string: "`{{p}}config review #suggestion-review`\n" +
				"Sets the #suggestion-review channel as the channel where suggestions awaiting review are sent",
			context: "Examples for the Suggestion Review Channel config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `review`"
		},
		"CONFIG_NAME:SUGGESTIONS": {
			string: "Approved Suggestions Channel",
			context: "Name of the Approved Suggestions Channel config element"
		},
		"CONFIG_DESC:SUGGESTIONS": {
			string: "The channel where suggestions are sent once they are approved (or submitted when the mode is set to `autoapprove`).",
			context: "Description of the Approved Suggestions Channel config element"
		},
		"CONFIG_EXAMPLES:SUGGESTIONS": {
			string: "`{{p}}config suggestions #suggestions`\n" +
				"Sets the #suggestions channel as the channel where approved suggestions are sent",
			context: "Examples for the Approved Suggestions Channel config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `suggestions`"
		},
		"CONFIG_NAME:DENIED": {
			string: "Denied Suggestions Channel",
			context: "Name of the Denied Suggestions Channel config element"
		},
		"CONFIG_DESC:DENIED": {
			string: "The channel where suggestions are sent when they are denied or deleted.",
			context: "Description of the Denied Suggestions Channel config element"
		},
		"CONFIG_EXAMPLES:DENIED": {
			string: "`{{p}}config denied #denied-suggestions`\n" +
				"Sets the #denied-suggestions channel as the channel where denied or deleted suggestions are sent\n" +
				"\n" +
				"`{{p}}config denied none`\n" +
				"Resets the denied suggestions channel, making there be none set",
			context: "Examples for the Denied Suggestions Channel config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `denied`"
		},
		"CONFIG_NAME:LOG": {
			string: "Log Channel",
			context: "Name of the Log Channel config element"
		},
		"CONFIG_DESC:LOG": {
			string: "The channel where suggestions submitted and actions taken on them are logged.",
			context: "Description of the Log Channel config element"
		},
		"CONFIG_EXAMPLES:LOG": {
			string: "`{{p}}config log #suggestion-log`\n" +
				"Sets the #suggestion-log channel as log channel for suggestions and actions taken on them\n" +
				"\n" +
				"`{{p}}config log none`\n" +
				"Resets the log channel, making there be none set",
			context: "Examples for the Log Channel config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `log`"
		},
		"CONFIG_NAME:COMMANDSCHANNELS": {
			string: "Suggestion Commands Channels",
			context: "Name of the Suggestion Commands Channels config element"
		},
		"CONFIG_DESC:COMMANDSCHANNELS": {
			string: "This setting locks using the `suggest` command to only the configured channels. Configuring no channels will allow the command to be used in any channel.",
			context: "`{{p}}config commands add #bot-commands`\nLimits using the `suggest` command to the #bot-commands channel\n\n`{{p}}config commands remove 567385190196969493`\nRemoves the 567385190196969493 channel from the list of commands channels\n\n`{{p}}config commands list`\nLists the configured commands channels"
		},
		"CONFIG_EXAMPLES:COMMANDSCHANNELS": {
			string: "`{{p}}config commands add #bot-commands`\nLimits using the `suggest` command to the #bot-commands channel\n\n`{{p}}config commands remove 567385190196969493`\nRemoves the 567385190196969493 channel from the list of commands channels\n\n`{{p}}config commands list`\nLists the configured commands channels",
			context: "Examples for the Suggestion Commands Channels config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `commands`"
		},
		"CONFIG_NAME:IMPLEMENTED": {
			string: "Implemented Suggestions Archive Channel",
			context: "Name of the Implemented Suggestions Archive Channel config element"
		},
		"CONFIG_DESC:IMPLEMENTED": {
			string: "The channel where suggestions marked as \"Implemented\" via the `mark` command are sent. If no channel is configured, implemented suggestions will remain in the suggestions feed",
			context: "Description of the Implemented Suggestions Archive Channel config element"
		},
		"CONFIG_EXAMPLES:IMPLEMENTED": {
			string: "`{{p}}config implemented #implemented-suggestions`\n" +
				"Sets the #implemented-suggestions channel as the channel where implemented suggestions are sent\n" +
				"\n" +
				"`{{p}}config implemented none`\n" +
				"Resets the implemented suggestions archive channel, making there be none set",
			context: "Examples for the Implemented Suggestions Archive Channel config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `implemented`"
		},
		"CONFIG_NAME:PREFIX": { string: "Prefix", context: "Name of the Prefix config element" },
		"CONFIG_DESC:PREFIX": {
			string: "The string of characters (usually a symbol) used to invoke a bot command. For example, in `.vote` the prefix is `.`",
			context: "Description of the Prefix config element"
		},
		"CONFIG_EXAMPLES:PREFIX": {
			string: "`{{p}}config prefix ?`\nSets the bot prefix to `?`",
			context: "Examples for the Prefix config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `prefix`"
		},
		"CONFIG_NAME:MODE": { string: "Mode", context: "Name of the Mode config element" },
		"CONFIG_DESC:MODE": {
			string: "The mode of handling suggestions. This can be `review` (all suggestions are held for manual review by staff) or `autoapprove` (all suggestions are automatically posted to the suggestions feed)",
			context: "Description of the Mode config element"
		},
		"CONFIG_EXAMPLES:MODE": {
			string: "`{{p}}config mode review`\n" +
				"Sets the mode to `review`\n" +
				"\n" +
				"`{{p}}config mode autoapprove`\n" +
				"Sets the mode to `autoapprove`",
			context: "Examples for the Mode config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `mode`"
		},
		"CONFIG_NAME:EMOJIS": {
			string: "Suggestion Feed Reactions",
			context: "Name of the Suggestion Feed Reactions config element"
		},
		"CONFIG_DESC:EMOJIS": {
			string: "Settings for managing the emojis that are added to suggestions posted to the suggestions feed",
			context: "Description of the Suggestion Feed Reactions config element"
		},
		"CONFIG_EXAMPLES:EMOJIS": {
			string: "`{{p}}config emojis up 👍`\n" +
				"Sets the upvote emoji to 👍\n" +
				"\n" +
				"`{{p}}config emojis mid 🤷`\n" +
				"Sets the shrug/no opinion emoji to 🤷\n" +
				"\n" +
				"`{{p}}config emojis down 👎`\n" +
				"Sets the downvote emoji to 👎\n" +
				"\n" +
				"`{{p}}config emojis up disable`\n" +
				"Disables the upvote reaction (this can be done for any reaction, just change `up` to any of the other types)\n" +
				"\n" +
				"`{{p}}config emojis disable`\n" +
				"Disables all suggestion feed reactions\n" +
				"\n" +
				"`{{p}}config emojis enable`\n" +
				"Enables suggestion feed reactions if they are disabled",
			context: "Examples for the Suggestion Feed Reactions config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `emojis`"
		},
		"CONFIG_NAME:NOTIFY": {
			string: "DM Notifications",
			context: "Name of the DM Notifications config element"
		},
		"CONFIG_DESC:NOTIFY": {
			string: "Settings for server notifications, whether or not users are sent a DM when an action is taken on one of their suggestions",
			context: "Description of the DM Notifications config element"
		},
		"CONFIG_EXAMPLES:NOTIFY": {
			string: "`{{p}}config notify on`\nEnables DM notifications for suggestions in this server\n\n`{{p}}config notify off`\nDisables DM notifications for suggestions in this server",
			context: "Examples for the DM Notifications config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `notifications`"
		},
		"CONFIG_NAME:CLEARCOMMANDS": {
			string: "Clean Commands",
			context: "Name of the Clean Commands config element"
		},
		"CONFIG_DESC:CLEARCOMMANDS": {
			string: "This setting controls whether or not some commands and the response are removed after a few seconds. This is useful for keeping your channels clean!",
			context: "Description of the Clean Commands config element"
		},
		"CONFIG_EXAMPLES:CLEARCOMMANDS": {
			string: "`{{p}}config cleancommands on`\nEnables cleaning of commands\n\n`{{p}}config cleancommands off`\nDisables cleaning of commands",
			context: "Examples for the Clean Commands config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `cleancommands`"
		},
		"CONFIG_NAME:SELFVOTE": {
			string: "Voting on Own Suggestions",
			context: "Name of the Voting on Own Suggestions config element"
		},
		"CONFIG_DESC:SELFVOTE": {
			string: "This setting controls whether or not the user who made a suggestion can vote on their own suggestion when it has been approved.",
			context: "Description of the Voting on Own Suggestions config element"
		},
		"CONFIG_EXAMPLES:SELFVOTE": {
			string: "`{{p}}config selfvote on`\n" +
				"Allows suggestion authors to vote on their own suggestions\n" +
				"\n" +
				"`{{p}}config selfvote off`\n" +
				"Prevents suggestion authors from voting on their own suggestions",
			context: "Examples for the Voting on Own Suggestions config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `selfvote`"
		},
		"CONFIG_NAME:ONEVOTE": {
			string: "Multiple Reaction Voting",
			context: "Name of the Multiple Reaction Voting config element"
		},
		"CONFIG_DESC:ONEVOTE": {
			string: "This setting controls whether or not users can choose multiple voting options on a suggestion (For example, both upvote and downvote).",
			context: "Description of the Multiple Reaction Voting config element"
		},
		"CONFIG_EXAMPLES:ONEVOTE": {
			string: "`{{p}}config onevote on`\n" +
				"Allows users to choose only one option when voting\n" +
				"\n" +
				"`{{p}}config onevote off`\n" +
				"Allows users to choose multiple options when voting",
			context: "Examples for the Multiple Reaction Voting config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `onevote`"
		},
		"CONFIG_NAME:INCHANNELSUGGESTIONS": {
			string: "In-Suggestions Channel Suggestion Submission",
			context: "Name of the In-Suggestions Channel Suggestion Submission config element"
		},
		"CONFIG_DESC:INCHANNELSUGGESTIONS": {
			string: "This setting controls whether or not users can submit suggestions via sending a message in the suggestions feed channel.",
			context: "Description of the In-Suggestions Channel Suggestion Submission config element"
		},
		"CONFIG_EXAMPLES:INCHANNELSUGGESTIONS": {
			string: "`{{p}}config inchannelsuggestions on`\n" +
				"Allows users to submit suggestions via any message in the suggestions feed channel\n" +
				"\n" +
				"`{{p}}config inchannelsuggestions off`\n" +
				"Prevents users from submitting suggestions via any message in the suggestions feed channel",
			context: "Examples for the In-Suggestions Channel Suggestion Submission config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `inchannelsuggestions`"
		},
		"CONFIG_NAME:COLORCHANGE": {
			string: "Color Change",
			context: "Name of the Color Change config element"
		},
		"CONFIG_DESC:COLORCHANGE": {
			string: "This setting controls the color of the suggestion embed changing based on the number of net upvotes. You can customize the color, and the number of net upvotes necessary to change the color!",
			context: "Description of the Color Change config element"
		},
		"CONFIG_EXAMPLES:COLORCHANGE": {
			string: "`{{p}}config colorchange color gold`\n" +
				"Sets the color to change the embed to `gold`. This element supports hex colors, CSS colors, and more!\n" +
				"\n" +
				"`{{p}}config colorchange number 5`\n" +
				"Sets the number of net upvotes to change the embed color to `5`.",
			context: "Examples for the Color Change config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `colorchange`"
		},
		"CONFIG_NAME:LOCALE": { string: "Locale", context: "Name of the Locale config element" },
		"CONFIG_DESC:LOCALE": {
			string: "The language the bot will respond in. If a user has a locale configured via the `locale` command, the bot will respond to them in their preferred language. If they don't, the bot will respond in the language configured here.",
			context: "Description of the Locale config element"
		},
		"CONFIG_EXAMPLES:LOCALE": {
			string: "`{{p}}config locale en`\nSets the server language to English.",
			context: "Examples for the Locale config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `locale`"
		},
		"CONFIG_NAME:COOLDOWN": {
			string: "Suggestion Cooldown",
			context: "Name of the Suggestion Cooldown config element"
		},
		"CONFIG_DESC:COOLDOWN": {
			string: "The time users must wait between submitting suggestions",
			context: "Description of the Suggestion Cooldown config element"
		},
		"CONFIG_EXAMPLES:COOLDOWN": {
			string: "`{{p}}config cooldown 5m`\nSets the suggestion cooldown time to 5 minutes.\n\n`{{p}}config cooldown 1 hour`\nSets the suggestion cooldown time to 1 hour.\n\n`{{p}}config cooldown 0`\nRemoves the suggestion cooldown time",
			context: "Examples for the Suggestion Cooldown config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `admin`"
		},
		"CONFIG_NAME:TRELLO": {
			string: "Trello",
			context: "Name of the Trello config element"
		},
		"CONFIG_DESC:TRELLO": {
			string: "Settings for the Suggester Trello integration",
			context: "Description of the Trello config element"
		},
		"CONFIG_EXAMPLES:TRELLO": {
			string: "`{{p}}config trello board https://trello.com/b/oCArLTyk/test`\n" +
				"Connects a Trello board to the bot (`@suggester_bot` must be a board member on Trello)\n" +
				"\n" +
				"`{{p}}config trello board none`\n" +
				"Removes the connected Trello board\n" +
				"\n" +
				"`{{p}}config trello actions suggest List 1` \n" +
				"Configures that submitted suggestions should be added to list **List 1**\n" +
				"\n" +
				"`{{p}}config trello actions approve list List 2`\n" +
				"Configures that approved suggestions (review mode only) are added to list **List 2**\n" +
				"\n" +
				"`{{p}}config trello actions implemented label Finished`\n" +
				"Configures that suggestions marked as implemented are given label **Finished**\n" +
				"\n" +
				"`{{p}}config trello actions deny delete`\n" +
				"Configures that denied suggestions are removed from the Trello board\n" +
				"\n" +
				"`{{p}}config trello actions delete archive`\n" +
				"Configures that deleted suggestions are archived on the Trello board\n" +
				"\n" +
				"`{{p}}config trello actions working none`\n" +
				"Removes any configured actions for suggestions marked as in progress",
			context: "Examples for the Trello config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `trello`"
		},
		"AUTOFOLLOW_FIRST_NOTIF": {
			string: "You just upvoted suggestion #{{suggestion}} in **{{server}}**. By default, you're now following this suggestion. This means that if an update is made to the suggestion you will receive a DM. Use `{{prefix}}unfollow {{suggestion}}` in {{server}} to unfollow the suggestion, and `{{prefix}}unfollow auto` to disable automatic following.\n_You will only receive this message once_",
			context: "Notification when a user upvotes a suggestion and automatically follows it (only for the first follow)",
			replaced: {
				suggestion: {
					to_replace: "{{suggestion}}",
					description: "The suggestion ID"
				},
				server: {
					to_replace: "{{server}}",
					description: "The server name"
				},
				prefix: {
					to_replace: "{{prefix}}",
					description: "The server prefix"
				}
			}
		},
		"FOLLOW_NO_PARAMS_ERROR": {
			string: "You must specify `list`, `auto` or a suggestion ID.",
			context: "Shown when no parameters or specified for the follow command"
		},
		"FOLLOW_SUCCESS": {
			string: "You are now following suggestion #{{id}}",
			context: "Success message when you follow a suggestion",
			replaced: {
				id: {
					to_replace: "{{id}}",
					description: "The suggestion ID"
				}
			}
		},
		"UNFOLLOW_SUCCESS": {
			string: "You are no longer following suggestion #{{id}}",
			context: "Success message when you unfollow a suggestion",
			replaced: {
				id: {
					to_replace: "{{id}}",
					description: "The suggestion ID"
				}
			}
		},
		"ALREADY_FOLLOWING_ERROR": {
			string: "You are already following suggestion #{{id}}",
			context: "Error message when you are already following a suggestion",
			replaced: {
				id: {
					to_replace: "{{id}}",
					description: "The suggestion ID"
				}
			}
		},
		"NOT_FOLLOWING_ERROR": {
			string: "You are not following suggestion #{{id}}",
			context: "Error message when you are not following a suggestion",
			replaced: {
				id: {
					to_replace: "{{id}}",
					description: "The suggestion ID"
				}
			}
		},
		"FOLLOWING_TITLE": {
			string: "Followed Suggestions:",
			context: "Title for the followed suggestions embed"
		},
		"NONE_FOLLOWED": {
			string: "You are not following any suggestions",
			context: "Message shown when you are not following any suggestions"
		},
		"COMMAND_DESC:FOLLOW": {
			string: "Views/edits your following settings",
			context: "Description for the follow command"
		},
		"COMMAND_USAGE:FOLLOW": {
			string: "follow [suggestion id|list|auto] (on|off|toggle)",
			context: "Description for the follow command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:FOLLOW": {
			string: "`{{p}}follow 123`\nFollows suggestion #123\n\n`{{p}}follow list`\nLists the suggestions you are following\n\n`{{p}}follow auto on`\nEnables following suggestions when you upvote them\n\n`{{p}}follow auto off`\nDisables following suggestions when you upvote them\n\n`{{p}}follow auto toggle`\nToggles following suggestions when you upvote them",
			context: "Examples for the follow command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:UNFOLLOW": {
			string: "Unfollows a suggestion",
			context: "Description for the unfollow command"
		},
		"COMMAND_USAGE:UNFOLLOW": {
			string: "unfollow [suggestion id]",
			context: "Description for the unfollow command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:UNFOLLOW": {
			string: "`{{p}}unfollow 123`\nUnfollows suggestion #123",
			context: "Examples for the unfollow command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMENT_TITLE_LOG": {
			string: "Comment",
			context: "Comment title for the log embed"
		},
		"CFG_COMMANDS_ALREADY_ADDED_ERROR": {
			string: "This channel has already been added as a commands channel!",
			context: "Error message shown when a channel is already a commands channel"
		},
		"CFG_COMMANDS_NOT_ADDED_ERROR": {
			string: "This channel has not been added as a commands channel!",
			context: "Error message shown when a channel is not a commands channel"
		},
		"CFG_DISABLED_CHNL_ALREADY_ADDED_ERROR": {
			string: "This channel has already been disabled!",
			context: "Error message shown when a channel is already a disabled channel"
		},
		"CFG_DISABLED_CHNL_NOT_ADDED_ERROR": {
			string: "This channel has not been added as a disabled channel!",
			context: "Error message shown when a channel is not a disabled channel"
		},
		"CFG_DISABLED_COMMANDS_ALREADY_ADDED_ERROR": {
			string: "This command has already been disabled!",
			context: "Error message shown when a command is already disabled"
		},
		"CFG_DISABLED_COMMANDS_NOT_ADDED_ERROR": {
			string: "This command is not currently disabled!",
			context: "Error message shown when a command is not disabled"
		},
		"CFG_DISABLED_CMD_ADDED": {
			string: "The `{{command}}` command is now disabled",
			context: "Success message when a command is disabled",
			replaced: {
				command: {
					to_replace: "{{command}}",
					description: "The command name"
				}
			}
		},
		"CFG_DISABLED_CMD_REMOVED": {
			string: "The `{{command}}` command is no longer disabled",
			context: "Success message when a command is enabled",
			replaced: {
				command: {
					to_replace: "{{command}}",
					description: "The command name"
				}
			}
		},
		"UNAVAILABLE": {
			string: "Unavailable",
			context: "Describes something that is not available"
		},
		"TOP_TIME_INFO": {
			string: "Search limited to suggestions {{time}} old or newer",
			context: "Shows information about the time filter in the top command",
			replaced: {
				time: {
					to_replace: "{{time}}",
					description: "The amount of time to filter by"
				}
			}
		},
		"GITHUB_REPO": {
			string: "You can find Suggester's GitHub repository at {{link}}",
			context: "Shows the link to Suggester's GitHub repository",
			replaced: {
				link: {
					to_replace: "{{link}}",
					description: "The link to the repository"
				}
			}
		},
		"PRIVACY_INFO": {
			string: "You can find Suggester's privacy policy and security information at {{link}}",
			context: "Shows the link to Suggester's privacy policy and security information",
			replaced: {
				link: {
					to_replace: "{{link}}",
					description: "The link to the information"
				}
			}
		},
		"DOCS_INFO": {
			string: "You can find Suggester's official documentation at {{link}}",
			context: "Sends the link to Suggester's documentation website",
			replaced: {
				link: {
					to_replace: "{{link}}",
					description: "The link to the docs"
				}
			}
		},
		"SERVER_PREFIX": {
			string: "My prefix is `{{prefix}}`, you can also just mention the bot like \"<@{{id}}> help\"",
			context: "Shows the configured prefix",
			replaced: {
				prefix: {
					to_replace: "{{prefix}}",
					description: "The configured prefix"
				},
				id: {
					to_replace: "{{id}}",
					description: "The bot's ID for the mention"
				}
			}
		},
		"DUPE_REASON": {
			string: "Duplicate of suggestion [#{{id}}]({{link}})",
			context: "The reason for a duplicate suggestion in the dupe command",
			replaced: {
				link: {
					to_replace: "{{link}}",
					description: "The link to the suggestion"
				},
				id: {
					to_replace: "{{id}}",
					description: "The suggestion ID of the original suggestion"
				}
			}
		},
		"DUPE_REASON_DENIED": {
			string: "Duplicate of suggestion #{{id}}, which has been denied.",
			context: "The reason for a duplicate suggestion in the dupe command when the suggestion is denied",
			replaced: {
				id: {
					to_replace: "{{id}}",
					description: "The suggestion ID of the original suggestion"
				}
			}
		},
		"DUPE_REASON_DENIED_WITH_REASON": {
			string: "Duplicate of suggestion #{{id}}, which has been denied with the following reason:\n{{reason}}",
			context: "The reason for a duplicate suggestion in the dupe command when the suggestion is denied and there's enough space for the reason",
			replaced: {
				id: {
					to_replace: "{{id}}",
					description: "The suggestion ID of the original suggestion"
				},
				reason: {
					to_replace: "{{reason}}",
					description: "The reason the original suggestion was denied"
				}
			}
		},
		"DUPE_REASON_IMPLEMENTED": {
			string: "Duplicate of suggestion #{{id}}, which has been implemented.",
			context: "The reason for a duplicate suggestion in the dupe command when the suggestion is implemented",
			replaced: {
				id: {
					to_replace: "{{id}}",
					description: "The suggestion ID of the original suggestion"
				}
			}
		},
		"DUPE_REASON_REVIEW": {
			string: "Duplicate of suggestion #{{id}}, which is currently awaiting review.",
			context: "The reason for a duplicate suggestion in the dupe command when the suggestion is awaiting review",
			replaced: {
				id: {
					to_replace: "{{id}}",
					description: "The suggestion ID of the original suggestion"
				}
			}
		},
		"DUPE_ORIGINAL_INVALID_ERROR": {
			string: "You must provide a valid suggestion ID for the original suggestion",
			context: "Error shown when a suggestion ID provided in the dupe command for the original suggestion is invalid"
		},
		"CFG_COOLDOWN_INFO": {
			string: "The suggestion cooldown time is currently set to **{{time}}**",
			context: "Shows the suggestion cooldown time in the config command",
			replaced: {
				time: {
					to_replace: "{{time}}",
					context: "The time the cooldown is set to"
				}
			}
		},
		"CFG_COOLDOWN_NONE": {
			string: "There is no suggestion cooldown time set.",
			context: "Shows the suggestion cooldown time in the config command when none is set"
		},
		"CFG_COOLDOWN_SET": {
			string: "The suggestion cooldown time is now **{{time}}**",
			context: "Success message when the suggestion cooldown time is set",
			replaced: {
				time: {
					to_replace: "{{time}}",
					context: "The time the cooldown is set to"
				}
			}
		},
		"CFG_COOLDOWN_BAD_VALUE": {
			string: "You must specify a value that can be interpreted as a time and is greater than or equal to 0",
			context: "Error shown when the value specified for the suggestion cooldown is invalid"
		},
		"CUSTOM_COOLDOWN_FLAG": {
			string: "You must wait {{time}} before submitting another suggestion",
			context: "Error shown when a user attempts to submit a suggestion and their cooldown has not ended",
			replaced: {
				time: {
					to_replace: "{{time}}",
					context: "The time left before the cooldown expires"
				}
			}
		},
		"EXEMPT_NO_ARGS_ERROR": {
			string: "You must specify a user to exempt",
			context: "Error shown when no user is speciied for the exempt command"
		},
		"EXEMPT_USER_BOT_ERROR": {
			string: "This user is a bot, and therefore cannot submit suggestions",
			context: "Error shown when a user tries to exempt a bot"
		},
		"EXEMPT_USER_NOT_MEMBER_ERROR": {
			string: "This user is not a member of this server",
			context: "Error shown when a user tries to exempt a user who is not a member of the current server"
		},
		"EXEMPT_SUCCESS": {
			string: "**{{user}}** (`{{id}}`) has been exempted from the suggestion cooldown. Next time they submit a suggestion they won't be affected by the configured cooldown. **This only applies to one suggestion, if they need exempted again you'll need to re-run this command.**",
			context: "Success message when a user is exempted in a guild",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "The user tag"
				},
				id: {
					to_replace: "{{id}}",
					description: "The user ID"
				}
			}
		},
		"EXEMPT_LOG_TITLE": {
			string: "{{staff}} exempted {{user}} from the suggestion cooldown",
			context: "Title of the log embed when a user is exempted",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "The exempted user's tag"
				},
				staff: {
					to_replace: "{{staff}}",
					description: "The staff member's tag"
				}
			}
		},
		"EXEMPT_ALREADY_ERROR": {
			string: "This user has already been exempted from the suggestion cooldown",
			context: "Error shown when a user has already been exempted from the suggestion cooldown"
		},
		"EDIT_NOT_AUTHOR_ERROR": {
			string: "You can only edit your own suggestions",
			context: "Error shown when a user attempts to edit a suggestion that is not their's"
		},
		"NO_PENDING_EDIT_ERROR": {
			string: "This suggestion has no pending edit.",
			context: "Error shown when no suggestion edit is pending review"
		},
		"EDIT_APPROVE_DM_TITLE": {
			string: "Your suggestion edit was approved in **{{server}}**!",
			context: "Title for the DM notification of a suggestion edit being approved",
			replaced: {
				server: {
					to_replace: "{{server}}",
					description: "The name of the server the command was run in"
				}
			}
		},
		"EDIT_APPROVE_DM_TITLE_FOLLOW": {
			string: "A suggestion you follow was edited in **{{server}}**!",
			context: "Title for the DM notification of a suggestion being edited on a suggestion followed",
			replaced: {
				server: {
					to_replace: "{{server}}",
					description: "The name of the server the command was run in"
				}
			}
		},
		"EDIT_DENY_DM_TITLE": {
			string: "Your suggestion edit was denied in **{{server}}**!",
			context: "Title for the DM notification of a suggestion edit being denied",
			replaced: {
				server: {
					to_replace: "{{server}}",
					description: "The name of the server the command was run in"
				}
			}
		},
		"LOG_EDIT_DENY_TITLE": {
			string: "{{user}} denied a suggestion edit on #{{id}}",
			context: "Title in the log embed when a suggestion edit is denied",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "A user tag"
				},
				id: {
					to_replace: "{{id}}",
					description: "The suggestion ID"
				}
			}
		},
		"SUGGESTION_EDIT_DM_TITLE": {
			string: "Your suggestion was edited in **{{server}}**!",
			context: "Title for the DM notification of a suggestion being admin-edited",
			replaced: {
				server: {
					to_replace: "{{server}}",
					description: "The name of the server the command was run in"
				}
			}
		},
		"SUGGESTION_EDIT_DM_TITLE_FOLLOW": {
			string: "A suggestion you follow was edited in **{{server}}**!",
			context: "Title for the DM notification of a followed suggestion being admin-edited",
			replaced: {
				server: {
					to_replace: "{{server}}",
					description: "The name of the server the command was run in"
				}
			}
		},
		"SUGGESTION_UPDATED_SELF": {
			string: "Your suggestion has been updated!",
			context: "Response when the user who edits is the suggester"
		},
		"SUGGESTION_UPDATED_NOT_SELF": {
			string: "The suggestion has been updated!",
			context: "Response when the user who edits is not the suggester"
		},
		"SUGGESTION_UPDATED_REVIEW": {
			string: "Your suggestion edit has been submitted for review!",
			context: "Response when the suggestion has already been approved and the user edits it"
		},
		"COMMAND_DESC:PRIVACY": {
			string: "Shows the link to Suggester's Privacy Policy",
			context: "Description for the privacy command"
		},
		"COMMAND_USAGE:PRIVACY": {
			string: "privacy",
			context: "Usage for the privacy command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_DESC:EDIT": {
			string: "Edits a suggestion",
			context: "Description for the edit command"
		},
		"COMMAND_USAGE:EDIT": {
			string: "edit [suggestion id] [new content]",
			context: "Description for the edit command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:EDIT": {
			string: "`{{p}}edit 1234 This is an edit suggestion`\nEdits suggestion #1234 to have the content of \"This is an edit suggestion\"",
			context: "Examples for the edit command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:APPROVEEDIT": {
			string: "Approves a pending suggestion edit",
			context: "Description for the approveedit command"
		},
		"COMMAND_USAGE:APPROVEEDIT": {
			string: "approveedit [suggestion id]",
			context: "Description for the approveedit command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:APPROVEEDIT": {
			string: "`{{p}}approveedit 123`\nApproves a pending edit on suggestion #123",
			context: "Examples for the approveedit command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:DENYEDIT": {
			string: "Denies a pending suggestion edit",
			context: "Description for the denyedit command"
		},
		"COMMAND_USAGE:DENYEDIT": {
			string: "denyedit [suggestion id]",
			context: "Description for the denyedit command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:DENYEDIT": {
			string: "`{{p}}denyedit 123`\nDenies a pending edit on suggestion #123",
			context: "Examples for the denyedit command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"COMMAND_DESC:SINFO": {
			string: "Shows information about a suggestion in a concise manner",
			context: "Description for the shortinfo command"
		},
		"COMMAND_USAGE:SINFO": {
			string: "shortinfo [suggestion id]",
			context: "Usage for the shortinfo command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:SINFO": {
			string: "`{{p}}shortinfo 1`\nShows information about suggestion #1\n\n`{{p}}shortinfo 1 -trim-suggest`\nShows information about suggestion #1 limiting the suggestion content to 250 characters\n\n`{{p}}shortinfo 1 -no-attach`\nShows information about suggestion #1 without showing the added attachment",
			context: "Examples for the shortinfo command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"CONFIG_NAME:IMPLEMENTEDROLE": {
			string: "Implemented Suggestion Role",
			context: "Name of the Implemented Suggestion Role config element"
		},
		"CONFIG_DESC:IMPLEMENTEDROLE": {
			string: "The role that is given to members that have a suggestion marked as implemented.",
			context: "Description of the Implemented Suggestion Role config element"
		},
		"CONFIG_EXAMPLES:IMPLEMENTEDROLE": {
			string: "`{{p}}config implementedrole Implemented Suggester`\nSets the \"Implemented Suggester\" as the role given when a member has their suggestion marked as implemented\n\n`{{p}}config implementedrole none`\nResets the role given when a member has their suggestion marked as implemented, meaning no role will be given",
			context: "Examples for the Implemented Suggestion Role config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `implementedrole`"
		},
		"CONFIG_NAME:AUTOFOLLOW": {
			string: "Automatic Following",
			context: "Name of the Automatic Following config element"
		},
		"CONFIG_DESC:AUTOFOLLOW": {
			string: "This setting controls whether or not users will follow suggestions upon upvoting them, meaning they will receive a DM when the suggestion is updated",
			context: "Description of the Automatic Following config element"
		},
		"CONFIG_EXAMPLES:AUTOFOLLOW": {
			string: "`{{p}}config autofollow on`\nEnables auto-following for suggestions in this server\n\n`{{p}}config autofollow off`\nDisables auto-following for suggestions in this server",
			context: "Examples for the Automatic Following config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `autofollow`"
		},
		"COMMAND_DESC:EDITCOMMENT": {
			string: "Edits a comment on a suggestion",
			context: "Description for the editcomment command"
		},
		"COMMAND_USAGE:EDITCOMMENT": {
			string: "editcomment [comment id] [new content]",
			context: "Usage for the editcomment command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_EXAMPLES:EDITCOMMENT": {
			string: "`{{p}}editcomment 27_1 This is new content`\nEdits a comment with the ID `27_1` to read \"This is new content\"",
			context: "Examples for the editcomment command\n" +
				"**Leave** `{{p}}` **as-is, it is replaced in the help command.**"
		},
		"NO_REASON": {
			string: "No reason provided",
			context: "String when no reason is provided"
		},
		"BEAN_SUCCESS": {
			string: "Beaned **{{user}}** (`{{id}}`)",
			context: "Success message when a user is beaned",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "The user tag"
				},
				id: {
					to_replace: "{{id}}",
					description: "The user ID"
				}
			}
		},
		"BEAN_DM": {
			string: "**You have been beaned from {{guild}}**",
			context: "DM message for a bean",
			replaced: {
				guild: {
					to_replace: "{{guild}}",
					description: "The guild name"
				}
			}
		},
		"MEGABEAN_SUCCESS": {
			string: "Megabeaned **{{user}}** (`{{id}}`)",
			context: "Success message when a user is megabeaned",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "The user tag"
				},
				id: {
					to_replace: "{{id}}",
					description: "The user ID"
				}
			}
		},
		"MEGABEAN_DM": {
			string: "**You have been megabeaned from {{guild}}**",
			context: "DM message for a megabean",
			replaced: {
				guild: {
					to_replace: "{{guild}}",
					description: "The guild name"
				}
			}
		},
		"NUKEBEAN_SUCCESS": {
			string: "Nukebeaned **{{user}}** (`{{id}}`)",
			context: "Success message when a user is nukebeaned",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "The user tag"
				},
				id: {
					to_replace: "{{id}}",
					description: "The user ID"
				}
			}
		},
		"NUKEBEAN_DM": {
			string: "**You have been nukebeaned from {{guild}}**",
			context: "DM message for a nukebean",
			replaced: {
				guild: {
					to_replace: "{{guild}}",
					description: "The guild name"
				}
			}
		},
		"HYPERNUKEBEAN_SUCCESS": {
			string: "Hypernukebeaned **{{user}}** (`{{id}}`)",
			context: "Success message when a user is hypernukebeaned",
			replaced: {
				user: {
					to_replace: "{{user}}",
					description: "The user tag"
				},
				id: {
					to_replace: "{{id}}",
					description: "The user ID"
				}
			}
		},
		"HYPERNUKEBEAN_DM": {
			string: "**You have been hypernukebeaned from {{guild}}**",
			context: "DM message for a hypernukebean",
			replaced: {
				guild: {
					to_replace: "{{guild}}",
					description: "The guild name"
				}
			}
		},
		"COMMAND_DESC:BEAN": {
			string: "Beans a user",
			context: "Description for the bean command"
		},
		"COMMAND_USAGE:BEAN": {
			string: "bean [user]",
			context: "Usage for the bean command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_DESC:MEGABEAN": {
			string: "Megabeans a user",
			context: "Description for the megabean command"
		},
		"COMMAND_USAGE:MEGABEAN": {
			string: "megabean [user]",
			context: "Usage for the megabean command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_DESC:NUKEBEAN": {
			string: "Nukebeans a user",
			context: "Description for the nukebean command"
		},
		"COMMAND_USAGE:NUKEBEAN": {
			string: "nukebean [user]",
			context: "Usage for the nukebean command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"COMMAND_DESC:HYPERNUKEBEAN": {
			string: "Hypernukebeans a user",
			context: "Description for the hypernukebean command"
		},
		"COMMAND_USAGE:HYPERNUKEBEAN": {
			string: "hypernukebean [user]",
			context: "Usage for the hypernukebean command\n" +
				"**Translate the names of arguments (ex. \"suggestion id\"), don't translate actual arguments that are input into the bot (ex. \"on\", \"off\", \"toggle\")**"
		},
		"NO_BOARD_SPECIFIED_ERROR": {
			string: "You must specify a valid link to a Trello board",
			context: "Error shown when a user has not specified a valid Trello board link"
		},
		"INVALID_BOARD_SPECIFIED_ERROR": {
			string: "The board you specified could not be found. Make sure `@suggester_bot` has been added as a board member.",
			context: "Error shown when a user has not specified a Trello board link the bot can access"
		},
		"TRELLO_BOARD_RESET_SUCCESS": {
			string: "Successfully reset the configured Trello board",
			context: "Success message when the trello board is reset"
		},
		"TRELLO_BOARD_SET_SUCCESS": {
			string: "Successfully set the Trello board to https://trello.com/b/{{code}}",
			context: "Success message when the Trello board is set",
			replaced: {
				code: {
					to_replace: "{{code}}",
					context: "The trello board code"
				}
			}
		},
		"NO_TRELLO_BOARD_SET_ERROR": {
			string: "You must have a Trello board configured to configure actions",
			context: "Error when there is no Trello board set and a user tries to configure actions"
		},
		"NO_LIST_NAME_ERROR": {
			string: "You must provide the name of a list on the Trello board <https://trello.com/b/{{code}}>",
			context: "Error shown when a user does not provide a valid list name for configuring Trello",
			replaced: {
				code: {
					to_replace: "{{code}}",
					context: "The trello board code"
				}
			}
		},
		"NO_LABEL_NAME_ERROR": {
			string: "You must provide the name of a label on the Trello board <https://trello.com/b/{{code}}>",
			context: "Error shown when a user does not provide a valid label name for configuring Trello",
			replaced: {
				code: {
					to_replace: "{{code}}",
					context: "The trello board code"
				}
			}
		},
		"SUGGEST_LIST_RESET_SUCCESS": {
			string: "Submitted suggestions will no longer be posted to the Trello board",
			context: "Success message when the submitted suggestions list is reset"
		},
		"SUGGEST_LIST_SET_SUCCESS": {
			string: "All submitted suggestions will be sent to the **{{list}}** list on Trello",
			context: "Success message shown when a user configures a list for submitted suggestions on Trello",
			replaced: {
				list: {
					to_replace: "{{list}}",
					context: "The trello board list name"
				}
			}
		},
		"SUGGESTION_TRELLO_INFO": {
			string: "Submitted by {{user}} ({{id}})\nSuggestion ID: {{sid}}",
			context: "Information for the Trello card description",
			replaced: {
				user: {
					to_replace: "{{user}}",
					context: "The user who submitted the suggestion"
				},
				id: {
					to_replace: "{{id}}",
					context: "The ID of the user who submitted the suggestion"
				},
				sid: {
					to_replace: "{{sid}}",
					context: "The ID of the suggestion"
				}
			}
		},
		"TRELLO_CONFIG_SUGGEST": {
			string: "All submitted suggestions are added to list **{{list}}**",
			context: "Shows where submitted suggestions are added on trello",
			replaced: {
				list: {
					to_replace: "{{list}}",
					context: "The list name"
				}
			}
		},
		"TRELLO_CONFIG_SUGGEST_NONE": {
			string: "Submitted suggestions are not added to Trello",
			context: "Shows where submitted suggestions are added on trello if not configured"
		},
		"TRELLO_INVALID_ACTION_ERROR": {
			string: "That is an invalid action. You can configure the following actions: {{list}}",
			context: "Shown when an action specified is invalid",
			replaced: {
				list: {
					to_replace: "{{list}}",
					context: "The list of available actions"
				}
			}
		},
		"TRELLO_ACTION_APPROVE_DELETE": {
			string: "Suggestions that are approved will be deleted from the Trello board",
			context: "Shows that suggestions approved will be deleted"
		},
		"TRELLO_ACTION_APPROVE_ARCHIVE": {
			string: "Suggestions that are approved will be archived on the Trello board",
			context: "Shows that suggestions approved will be archived"
		},
		"TRELLO_ACTION_APPROVE_LIST": {
			string: "Suggestions that are approved will be moved to the **{{list}}** list on the Trello board",
			context: "Shows that suggestions approved will be moved to a list",
			replaced: {
				list: {
					to_replace: "{{list}}",
					description: "The list name"
				}
			}
		},
		"TRELLO_ACTION_APPROVE_LABEL": {
			string: "Suggestions that are approved will be given the **{{label}}** label on the Trello board",
			context: "Shows that suggestions approved will be moved to a list",
			replaced: {
				label: {
					to_replace: "{{label}}",
					description: "The label name"
				}
			}
		},
		"TRELLO_ACTION_DENY_DELETE": {
			string: "Suggestions that are denied will be deleted from the Trello board",
			context: "Shows that suggestions denied will be deleted"
		},
		"TRELLO_ACTION_DENY_ARCHIVE": {
			string: "Suggestions that are denied will be archived on the Trello board",
			context: "Shows that suggestions denied will be archived"
		},
		"TRELLO_ACTION_DENY_LIST": {
			string: "Suggestions that are denied will be moved to the **{{list}}** list on the Trello board",
			context: "Shows that suggestions denied will be moved to a list",
			replaced: {
				list: {
					to_replace: "{{list}}",
					description: "The list name"
				}
			}
		},
		"TRELLO_ACTION_DENY_LABEL": {
			string: "Suggestions that are denied will be given the **{{label}}** label on the Trello board",
			context: "Shows that suggestions denied will be moved to a list",
			replaced: {
				label: {
					to_replace: "{{label}}",
					description: "The label name"
				}
			}
		},
		"TRELLO_ACTION_DELETE_DELETE": {
			string: "Suggestions that are deleted will be deleted from the Trello board",
			context: "Shows that suggestions deleted will be deleted"
		},
		"TRELLO_ACTION_DELETE_ARCHIVE": {
			string: "Suggestions that are deleted will be archived on the Trello board",
			context: "Shows that suggestions deleted will be archived"
		},
		"TRELLO_ACTION_DELETE_LIST": {
			string: "Suggestions that are deleted will be moved to the **{{list}}** list on the Trello board",
			context: "Shows that suggestions deleted will be moved to a list",
			replaced: {
				list: {
					to_replace: "{{list}}",
					description: "The list name"
				}
			}
		},
		"TRELLO_ACTION_DELETE_LABEL": {
			string: "Suggestions that are deleted will be given the **{{label}}** label on the Trello board",
			context: "Shows that suggestions deleted will be moved to a list",
			replaced: {
				label: {
					to_replace: "{{label}}",
					description: "The label name"
				}
			}
		},
		"TRELLO_ACTION_IMPLEMENTED_DELETE": {
			string: "Suggestions that are marked as implemented will be deleted from the Trello board",
			context: "Shows that suggestions marked as implemented will be deleted"
		},
		"TRELLO_ACTION_IMPLEMENTED_ARCHIVE": {
			string: "Suggestions that are marked as implemented will be archived on the Trello board",
			context: "Shows that suggestions marked as implemented will be archived"
		},
		"TRELLO_ACTION_IMPLEMENTED_LIST": {
			string: "Suggestions that are marked as implemented will be moved to the **{{list}}** list on the Trello board",
			context: "Shows that suggestions marked as implemented will be moved to a list",
			replaced: {
				list: {
					to_replace: "{{list}}",
					description: "The list name"
				}
			}
		},
		"TRELLO_ACTION_IMPLEMENTED_LABEL": {
			string: "Suggestions that are marked as implemented will be given the **{{label}}** label on the Trello board",
			context: "Shows that suggestions marked as implemented will be moved to a list",
			replaced: {
				label: {
					to_replace: "{{label}}",
					description: "The label name"
				}
			}
		},
		"TRELLO_ACTION_CONSIDER_DELETE": {
			string: "Suggestions that are marked as in consideration will be deleted from the Trello board",
			context: "Shows that suggestions marked as in consideration will be deleted"
		},
		"TRELLO_ACTION_CONSIDER_ARCHIVE": {
			string: "Suggestions that are marked as in consideration will be archived on the Trello board",
			context: "Shows that suggestions marked as in consideration will be archived"
		},
		"TRELLO_ACTION_CONSIDER_LIST": {
			string: "Suggestions that are marked as in consideration will be moved to the **{{list}}** list on the Trello board",
			context: "Shows that suggestions marked as in consideration will be moved to a list",
			replaced: {
				list: {
					to_replace: "{{list}}",
					description: "The list name"
				}
			}
		},
		"TRELLO_ACTION_CONSIDER_LABEL": {
			string: "Suggestions that are marked as in consideration will be given the **{{label}}** label on the Trello board",
			context: "Shows that suggestions marked as in consideration will be moved to a list",
			replaced: {
				label: {
					to_replace: "{{label}}",
					description: "The label name"
				}
			}
		},
		"TRELLO_ACTION_PROGRESS_DELETE": {
			string: "Suggestions that are marked as in progress will be deleted from the Trello board",
			context: "Shows that suggestions marked as in progress will be deleted"
		},
		"TRELLO_ACTION_PROGRESS_ARCHIVE": {
			string: "Suggestions that are marked as in progress will be archived on the Trello board",
			context: "Shows that suggestions marked as in progress will be archived"
		},
		"TRELLO_ACTION_PROGRESS_LIST": {
			string: "Suggestions that are marked as in progress will be moved to the **{{list}}** list on the Trello board",
			context: "Shows that suggestions marked as in progress will be moved to a list",
			replaced: {
				list: {
					to_replace: "{{list}}",
					description: "The list name"
				}
			}
		},
		"TRELLO_ACTION_PROGRESS_LABEL": {
			string: "Suggestions that are marked as in progress will be given the **{{label}}** label on the Trello board",
			context: "Shows that suggestions marked as in progress will be moved to a list",
			replaced: {
				label: {
					to_replace: "{{label}}",
					description: "The label name"
				}
			}
		},
		"TRELLO_ACTION_NOTHAPPENING_DELETE": {
			string: "Suggestions that are marked as not happening will be deleted from the Trello board",
			context: "Shows that suggestions marked as not happening will be deleted"
		},
		"TRELLO_ACTION_NOTHAPPENING_ARCHIVE": {
			string: "Suggestions that are marked as not happening will be archived on the Trello board",
			context: "Shows that suggestions marked as not happening will be archived"
		},
		"TRELLO_ACTION_NOTHAPPENING_LIST": {
			string: "Suggestions that are marked as not happening will be moved to the **{{list}}** list on the Trello board",
			context: "Shows that suggestions marked as not happening will be moved to a list",
			replaced: {
				list: {
					to_replace: "{{list}}",
					description: "The list name"
				}
			}
		},
		"TRELLO_ACTION_NOTHAPPENING_LABEL": {
			string: "Suggestions that are marked as not happening will be given the **{{label}}** label on the Trello board",
			context: "Shows that suggestions marked as not happening will be moved to a list",
			replaced: {
				label: {
					to_replace: "{{label}}",
					description: "The label name"
				}
			}
		},
		"TRELLO_ACTION_COLORCHANGE_DELETE": {
			string: "Suggestions that are upvoted past the color change threshold will be deleted from the Trello board",
			context: "Shows that suggestions upvoted past the color change threshold will be deleted"
		},
		"TRELLO_ACTION_COLORCHANGE_ARCHIVE": {
			string: "Suggestions that are upvoted past the color change threshold will be archived on the Trello board",
			context: "Shows that suggestions upvoted past the color change threshold will be archived"
		},
		"TRELLO_ACTION_COLORCHANGE_LIST": {
			string: "Suggestions that are upvoted past the color change threshold will be moved to the **{{list}}** list on the Trello board",
			context: "Shows that suggestions upvoted past the color change threshold will be moved to a list",
			replaced: {
				list: {
					to_replace: "{{list}}",
					description: "The list name"
				}
			}
		},
		"TRELLO_ACTION_COLORCHANGE_LABEL": {
			string: "Suggestions that are upvoted past the color change threshold will be given the **{{label}}** label on the Trello board",
			context: "Shows that suggestions upvoted past the color change threshold will be moved to a list",
			replaced: {
				label: {
					to_replace: "{{label}}",
					description: "The label name"
				}
			}
		},
		"TRELLO_ACTION_APPROVE_NONE": {
			string: "No Trello action will be taken on suggestions that are approved",
			context: "Shows that suggestions approved will not be taken action on"
		},
		"TRELLO_ACTION_DENY_NONE": {
			string: "No Trello action will be taken on suggestions that are denied",
			context: "Shows that suggestions denied will not be taken action on"
		},
		"TRELLO_ACTION_DELETE_NONE": {
			string: "No Trello action will be taken on suggestions that are deleted",
			context: "Shows that suggestions deleted will not be taken action on"
		},
		"TRELLO_ACTION_IMPLEMENTED_NONE": {
			string: "No Trello action will be taken on suggestions that are marked as implemented",
			context: "Shows that suggestions marked as implemented will not be taken action on"
		},
		"TRELLO_ACTION_CONSIDER_NONE": {
			string: "No Trello action will be taken on suggestions that are marked as in consideration",
			context: "Shows that suggestions marked as in consideration will not be taken action on"
		},
		"TRELLO_ACTION_PROGRESS_NONE": {
			string: "No Trello action will be taken on suggestions that are marked as in progress",
			context: "Shows that suggestions marked as in progress will not be taken action on"
		},
		"TRELLO_ACTION_NOTHAPPENING_NONE": {
			string: "No Trello action will be taken on suggestions that are marked as not happening",
			context: "Shows that suggestions marked as not happening will not be taken action on"
		},
		"TRELLO_ACTION_COLORCHANGE_NONE": {
			string: "No Trello action will be taken on suggestions that are upvoted past the color change threshold",
			context: "Shows that suggestions upvoted past the color change threshold will not be taken action on"
		},
		"TRELLO_NO_ACTIONS_CONFIGURED": {
			string: "No Trello actions are configured",
			context: "Shows when no Trello actions are set"
		},
		"TRELLO_BASE_CONFIG": {
			string: "**Linked Trello Board:** {{code}}\nUse `{{p}}config trello actions` to view configured actions",
			context: "Shows the linked trello board, **do not translate `config trello actions` as that is a bot command**",
			replaced: {
				code: {
					to_replace: "{{code}}",
					description: "The trello board code"
				},
				p: {
					to_replace: "{{p}}",
					description: "The server prefix"
				}
			}
		},
		"CFG_TRELLO_INVALID_PARAM": {
			string: "You must specify `board` or `action`",
			context: "Error when a user specifies none or an invalid parameter for Trello config"
		},
		"CFG_CAP_INFO": {
			string: "The suggestion cap is currently set to **{{cap}}** suggestions",
			context: "Shows the suggestion cap in the config command",
			replaced: {
				cap: {
					to_replace: "{{cap}}",
					description: "The configured cap"
				}
			}
		},
		"CFG_CAP_NONE": {
			string: "There is no suggestion cap set.",
			context: "Shows the suggestion cap in the config command when none is set"
		},
		"CFG_CAP_SET": {
			string: "The suggestion cap is now **{{cap}}** suggestions",
			context: "Success message when the suggestion cap is set",
			replaced: {
				cap: {
					to_replace: "{{cap}}",
					description: "The time the cap is set to"
				}
			}
		},
		"CONFIG_NAME:CAP": {
			string: "Suggestion Cap",
			context: "Name of the Suggestion Cap config element"
		},
		"CONFIG_DESC:CAP": {
			string: "The maximum number of approved (not denied or implemented) suggestions there can be at any given time. When the cap is reached, no new suggestions can be submitted",
			context: "Description of the Suggestion Cap config element"
		},
		"CONFIG_EXAMPLES:CAP": {
			string: "`{{p}}config cap 50`\nSets the suggestion cap to 50\n\n`{{p}}config cap none`\nRemoves the suggestion cap",
			context: "Examples for the Suggestion Cap config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `autofollow`"
		},
		"CAP_REACHED_ERROR": {
			string: "This server has reached the configured cap of {{cap}} approved suggestions. New suggestions cannot be submitted until some existing suggestions are cleared.",
			context: "Error shown when a server's cap limit has been reached",
			replaced: {
				cap: {
					to_replace: "{{cap}}",
					description: "The configured cap"
				}
			}
		},
		"AUTOSETUP_CATEGORY": {
			string: "Suggester",
			context: "The name of the category created for suggestions channels in autosetup"
		},
		"AUTOSETUP_SUGGESTIONS": {
			string: "suggestions",
			context: "The name of the channel created for approved suggestions in autosetup\n**As this is a channel name, make sure there are no spaces**"
		},
		"AUTOSETUP_DENIED": {
			string: "denied-suggestions",
			context: "The name of the channel created for denied suggestions in autosetup\n**As this is a channel name, make sure there are no spaces**"
		},
		"AUTOSETUP_REVIEW": {
			string: "suggestion-review",
			context: "The name of the channel created for suggestion review in autosetup\n**As this is a channel name, make sure there are no spaces**"
		},
		"AUTOSETUP_LOG": {
			string: "suggestion-log",
			context: "The name of the channel created for suggestion logs in autosetup\n**As this is a channel name, make sure there are no spaces**"
		},
		"CONFIG_NAME:COMMENTTIMESTAMPS": {
			string: "Comment Timestamps",
			context: "Name of the Comment Timestamps config element"
		},
		"CONFIG_DESC:COMMENTTIMESTAMPS": {
			string: "This setting controls whether or not timestamps are shown for comments in the suggestion embed",
			context: "Description of the Comment Timestamps config element"
		},
		"CONFIG_EXAMPLES:COMMENTTIMESTAMPS": {
			string: "`{{p}}config commenttime on`\nEnables comment timestamps on suggestion embeds\n\n`{{p}}config commenttime off`\nDisables comment timestamps on suggestion embeds",
			context: "Examples for the Comment Timestamps config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `autofollow`"
		},
		"CONFIG_NAME:VOTECOUNT": {
			string: "Live Vote Count",
			context: "Name of the Live Vote Count config element"
		},
		"CONFIG_DESC:VOTECOUNT": {
			string: "This setting controls whether or not the live vote count is shown on the suggestion embed",
			context: "Description of the Live Vote Count config element"
		},
		"CONFIG_EXAMPLES:VOTECOUNT": {
			string: "`{{p}}config votecount on`\nEnables live vote counts on suggestion embeds\n\n`{{p}}config votecount off`\nDisables live vote counts on suggestion embeds",
			context: "Examples for the Live Vote Count config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `autofollow`"
		},
		"CONFIG_NAME:ANONYMOUS": {
			string: "Anonymous Suggestions",
			context: "Name of the Anonymous Suggestions config element"
		},
		"CONFIG_DESC:ANONYMOUS": {
			string: "This setting controls whether or not users can submit anonymous suggestions.",
			context: "Description of the Anonymous Suggestions config element"
		},
		"CONFIG_EXAMPLES:ANONYMOUS": {
			string: "`{{p}}config anonymous on`\nEnables the ability to submit anonymous suggestions\n\n`{{p}}config anonymous off`\nDisables the ability to submit anonymous suggestion",
			context: "Examples for the Anonymous Suggestions config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `autofollow`"
		},
		"ANON_SUGGESTION": {
			string: "Anonymous Suggestion",
			context: "Title for anonymous suggestions"
		},
		"ANON_SUGGESTION_DISCLAIMER_SUBMIT": {
			string: "_This suggestion will be publicly shown as anonymous, but server staff will still be able to view your identity for moderation purposes._",
			context: "Disclaimer for anonymous suggestions upon submission"
		},
		"ANON_SUGGESTION_STAFF_NOTICE": {
			string: ":warning: This suggestion is anonymous",
			context: "Notice for staff that the suggestion is anonymous"
		},
		"ANON_SUGGEST_SLASH_NOTICE": {
			string: "Anonymous suggestions are handled through **slash commands**. To use anonymous suggestions, head to the server you'd like to submit a suggestion on and type `/`. You should see a menu open that contains `/asuggest`, and selecting that will allow you to submit an anonymous suggestion.\nIf you don't see the commands listed: Ask a server administrator to re-invite the bot with the link below to grant it permission to show slash commands",
			context: "Notice shown when a user runs the regular asuggest command"
		},
		"SHARDS_NOT_SPAWNED": {
			string: "Shards are still being spawned",
			context: "Error shown when shards are still being spawned"
		},
		"SHARDS_DETAIL": {
			string: "Servers: {{servers}}\nChannels: {{channels}}\nUsers: {{users}}\nMemory: {{memory}} MB\nAPI: {{api}} ms",
			context: "Detailed shard information for the shard command",
			replaced: {
				servers: {
					to_replace: "{{servers}}",
					description: "The shard's server count"
				},
				channels: {
					to_replace: "{{channels}}",
					description: "The shard's channel count"
				},
				users: {
					to_replace: "{{users}}",
					description: "The shard's user count"
				},
				memory: {
					to_replace: "{{memory}}",
					description: "The shard's memory usage"
				},
				api: {
					to_replace: "{{api}}",
					description: "The shard's API ping"
				}
			}
		},
		"SUGGESTION_DENIED_ERROR": {
			string: "This action cannot be taken on denied suggestions.",
			context: "Error shown when a user attempts to take action on a denied suggestion"
		},
		"CFG_EMOJIS_RESET_ALL_SUCCESS": {
			string: "All reaction emojis have been reset to their default settings",
			context: "Success message when all emojis are reset"
		},
		"CFG_COOLDOWN_VALUE_BELOW_GLOBAL": {
			string: "The specified cooldown time is smaller than the global cooldown for the `{{p}}suggest` command. You must set a value greater than {{global}}.",
			context: "Error shown when a user attempts to set a cooldown that is below the global cooldown",
			replaced: {
				p: {
					to_replace: "{{p}}",
					description: "The server's prefix"
				},
				global: {
					to_replace: "{{global}}",
					description: "The global cooldown"
				}
			}
		},
		"SEARCH_BAD_QUERY_ERROR": {
			string: "Please make sure you specify a valid query",
			context: "Error shown when an invalid query is provided for the search command"
		},
		"NO_LINK_SEARCH": {
			string: "Use `{{p}}info {{id}}` for info",
			context: "Shown when a suggestion does not have a message link to show in search directing them to the info comand",
			replaced: {
				p: {
					to_replace: "{{p}}",
					description: "The server's prefix"
				},
				id: {
					to_replace: "{{id}}",
					description: "The suggestion ID"
				}
			}
		},
		"SEARCH_TITLE": {
			string: "Found {{total}} Suggestions (showing {{min}}-{{max}} of {{total}})",
			context: "Header for the search embed",
			replaced: {
				min: {
					to_replace: "{{min}}",
					context: "The first number of suggestions being shown"
				},
				max: {
					to_replace: "{{max}}",
					context: "The last number of suggestions being shown"
				},
				total: {
					to_replace: "{{total}}",
					context: "The total number of suggestions awaiting review"
				}
			}
		},
		"DENY_AUTOAPPROVE_DELETE_REDIRECT": {
			string: "If you're trying to remove a suggestion, use the `{{command}}` command",
			context: "Shown when a user attempts to use deny and the mode is set to autoapprove",
			replaced: {
				command: {
					to_replace: "{{command}}",
					description: "The command the user should use (delete, silentdelete, or massdelete)"
				}
			}
		},
		"CFG_DISABLED_CMDS_LIST": {
			string: "{{num}} command(s) are disabled\n**List:** {{commands}}",
			context: "Shows the list of disabled commands",
			replaced: {
				num: {
					to_replace: "{{num}}",
					description: "The number of disabled commands"
				},
				commands: {
					to_replace: "{{commands}}",
					description: "The list of disabled commands"
				}
			}
		},
		"CONFIG_NAME:DISABLEDCOMMANDS": {
			string: "Disabled Commands",
			context: "Name of the Disabled Commands config element"
		},
		"CONFIG_DESC:DISABLEDCOMMANDS": {
			string: "This setting controls what commands are disabled on this server",
			context: "Description of the Disabled Commands config element"
		},
		"CONFIG_EXAMPLES:DISABLEDCOMMANDS": {
			string: "`{{p}}config disabledcommands add shard`\nDisables the `shard` command on this server\n\n`{{p}}config disabledcommands remove shard`\nEnables the `shard` command on this server\n\n`{{p}}config disabledcommands list`\nLists disabled commands",
			context: "Examples for the Disabled Commands config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `autofollow`"
		},
		"CONFIG_NAME:DISABLEDCHANNELS": {
			string: "Disabled Channels",
			context: "Name of the Disabled Channels config element"
		},
		"CONFIG_DESC:DISABLEDCHANNELS": {
			string: "This setting controls channels where the bot will not respond to any commands",
			context: "Description of the Disabled Channels config element"
		},
		"CONFIG_EXAMPLES:DISABLEDCHANNELS": {
			string: "`{{p}}config disabledchannels add #chat`\nDisables all commands in the #chat channel\n\n`{{p}}config disabledchannels remove 567385190196969493`\nRemoves the 567385190196969493 channel from the list of disabled channels\n\n`{{p}}config disabledchannels list`\nLists the configured disabled channels",
			context: "Examples for the Disabled Channels config element\n" +
				"Make sure to keep original formatting and not translate actual inputs like `autofollow`"
		},
		"CFG_DISABLED_CMD_ERROR": {
			string: "This command cannot be disabled",
			context: "Error shown when a command cannot be disabled"
		},
		"USER_BLOCKED_SLASH_RESPONSE": {
			string: "You are currently blocked from using the bot.",
			context: "Error shown when a user is blocked and tries to use a slash command"
		}
	}
};
