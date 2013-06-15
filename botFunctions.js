module.exports = function (bot) {
	var _this;
	return {
		actions: {},
		addressBook: {
			"marcM": "7022902481",
			"marcAM": "7022902481"
		},
		nicks: [
			"marcBot",
			"azureBot",
			"thisGuy",
			'AndChat39802'
		],
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
			actionParameter = (command).substring(actionString.length);
			actionFunction(channel, user, actionParameter);
		},
		processNonMessage: function (channel, user, message) {
			var cleanedMessage,
				userFound = false,
				thisRegex = /[^ ]+,/;
			if (!_this) {_this = this; }
			for (var m = _this.nicks.length - 1; m >= 0; m--) {
				if (message.indexOf(_this.nicks[m]) === 0) {
					//cleanedMessage = newTrim(message.substr(this.nicks[m].length));
					userFound = true;
				}
			}
			if (!userFound && (message + ", ").search(thisRegex) === 0) {
				var foundText = message.substr(message.indexOf(", ") + 2);
				//console.log("found possible rogue candidate");
				var exec = require('child_process').exec;
				exec('curl -X POST https://api.twilio.com/2010-04-01/Accounts/ACf4998dded0758c6c977d5f000bf4e0c2/SMS/Messages.json \
			    -u ACf4998dded0758c6c977d5f000bf4e0c2:67a4e6ba8f77d94691879664014da658 \
			    -d "From=+17027897643" \
			    -d "To=+17022902481" \
			    -d "Body=' + foundText + '\nFrom: ' + user + '"');
				/*curl -X POST https://api.twilio.com/2010-04-01/Accounts/ACf4998dded0758c6c977d5f000bf4e0c2/SMS/Messages.json \
			    -u ACf4998dded0758c6c977d5f000bf4e0c2:67a4e6ba8f77d94691879664014da658 \
			    -d "From=+17027897643" \
			    -d "To=+17022902481" \
			    -d 'Body=hello'*/
			}
		}
	};
};

newTrim=function(str){return str.replace(/^\s+|\s+$/g, '');};
