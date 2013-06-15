var irc = require('irc'),
	botFunctions = require('./botFunctions'),
	config = {
		channels: ["#nodejsbootcamp"],
		server: "irc.freenode.net",
		botName: "marcBot",
		messageAlias: "$$"
	}, bot;
	if (process.env && process.env.botName) {
		config.botName = process.env.botName;
	}
	bot = new irc.Client(config.server, config.botName, {
    channels: config.channels
  });

  botFunctions = botFunctions(bot);
  botFunctions.actions = {
  	"(%)": botFunctions.javascriptEval
  }

	console.log("starting up"); 

	bot.addListener('error', function(message) {
	    console.log('error: ', message);
	});

	// bot.addListener("join", function(channel, who) {
	// 	bot.say(channel, who + " ...welcome to the channel");
	// });

	bot.addListener("message", function(from, to, text, message) {
		
		if ((text.indexOf(config.messageAlias) + text.indexOf(config.botName)) >= -1) {
			console.log("it's time to go");
			botFunctions.tellUser(config.channels[0], from, "i agree");

		} else {
			console.log("it's not time to go!");
		}
	});