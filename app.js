var irc = require('irc'),
	config = {
		channels: ["#nodejsbootcamp", "nodebootcamp"],
		server: "irc.freenode.net",
		botName: "marcBot"
	},
	bot = new irc.Client(config.server, config.botName, {
    channels: config.channels
  });

	bot.addListener("join", function(channel, who) {
		bot.say(channel, who + " ...welcome to the channel");
	});

	bot.addListener("message", function(from, to, text, message) {
		bot.say(from, "thank you for the message!");
		bot.say(config.channels[0], "i agree");
	});