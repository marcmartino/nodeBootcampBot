module.exports = function (bot) {
	var _this;
	return {
		actions: {},
		javascriptEval: function (channel, user, command) {
			console.log('javascript eval');
			_this.tellUser(channel, user, eval(command));
		},
		headsOrTails: function (channel, user, command) {
			var randNum = Math.floor(Math.rand() * 2);
			_this.tellUser(channel, user, (randNum ===1 ? "Heads" : "Tails"));
		},
		tellUser: function (channel, user, message) {
			bot.say(channel, user + ", " + message);
		},
		cleanIrcMessage: function (message, foundString) {
			if (!_this) {_this = this; }
			var position = message.indexOf(foundString),
				cleaned = "";
			if (position === 0) {
				cleaned = message.substring(foundString.length);
			} else {
				cleaned = message.substring(0, position) +
					message.substring(position + foundString.length);
			}
			cleaned = newTrim(cleaned);
			if (cleaned.indexOf(",") === 0 || cleaned.indexOf(":") === 0) {
				cleaned = newTrim(cleaned.substring(1));
			}
			console.log("cleaned: " + cleaned);
			return cleaned;
		},
		processMessage: function (channel, user, command) {
			if (!_this) {_this = this; }
			var actionKeys = Object.keys(this.actions),
				actionString, actionFound,
				actionFunction, actionParameter;
			console.log(actionKeys);
			actionFound = actionKeys.reduceRight(function (prev, curr, index, arr) {
				console.log("reducing to find valid command");
				if (command.indexOf(curr) === 0) {
					console.log(curr + " matches!");
					return index;
				}
				return -1;
			}, -1);
			//console.log(actionKeys[actionFound]);
			actionString = actionKeys[actionFound];
			actionFunction = this.actions[actionString];
			actionParameter = (command | "").substring(actionString.length);
			actionFunction(channel, user, actionParameter);
		}
	};
};

newTrim=function(str){return str.replace(/^\s+|\s+$/g, '');};
