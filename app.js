var irc = require('irc'),
	express = require('express'),
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

  var app = express();
	app.set('port', process.env.PORT || 3000);
	app.get("/", function (req, res) {
		res.send("hello world");
	})

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
		var messageAliasSpot = text.indexOf(config.messageAlias),
			botNameSpot = text.indexOf(config.botName);
		if (messageAliasSpot >= 0) {
			console.log("it's time to go");
			botFunctions.tellUser(config.channels[0], from, "i agree");
		} else if (botNameSpot >= 0) {
			console.log("it's time to go");
			var cleanedMessage = botFunctions.cleanIrcMessage(config.botName)
			botFunctions.processMessage()
		} else {
			console.log("it's not time to go!");
		}
	});