module.exports = function (bot) {
	return {
		actions: {},
		javascriptEval: function () {
			console.log('javascript eval');
		},
		tellUser: function (channel, user, message) {
			bot.say(channel, user + ", " + message);
		}
	};
};