const { string } = require("../../utils/strings");
module.exports = {
	controls: {
		name: "docs",
		permission: 10,
		usage: "docs",
		description: "Shows the link to Suggester's official documentation",
		aliases: ["doc", "documentation"],
		enabled: true,
		permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
		cooldown: 5,
		dmAvailable: true,
		docs: "sumup"
	},
	do: (locale, message) => {
		return message.channel.send(string(locale, "DOCS_INFO", { link: "https://suggester.js.org" }));
	}
};
