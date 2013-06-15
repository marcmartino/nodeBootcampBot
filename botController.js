
var botFunctions = require('./botFunctions');
module.exports = function (bot, config) {
	botFunctions = botFunctions(bot);
	botFunctions.actions = {
		"eval-": botFunctions.javascriptEval
	}

	console.log("starting up"); 

	bot.addListener('error', function(message) {
	    console.log('error: ', message);
	});

	// bot.addListener("join", function(channel, who) {
	// 	bot.say(channel, who + " ...welcome to the channel");
	// });

	bot.addListener("message", function(from, to, text, message) {
		var messageAliasSpot = (text).toString().indexOf(config.messageAlias),
			botNameSpot = (text).toString().indexOf(config.botName);
		if (messageAliasSpot >= 0) {
			var cleanedMessage = botFunctions.cleanIrcMessage(text, config.messageAlias);
			// botFunctions.tellUser(config.channels[0], from, "i agree");
			botFunctions.processMessage(to, from, cleanedMessage);
		} else if (botNameSpot >= 0) {
			var cleanedMessage = botFunctions.cleanIrcMessage(text, config.botName);
			botFunctions.processMessage(to, from, cleanedMessage);
		} else {
			console.log("it's not time to go!");
		}
	});
}