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
		// Welcome them in!
		bot.say(channel, who + "...dude...welcome back!");
	});