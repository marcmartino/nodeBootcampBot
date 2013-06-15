module.exports = function (bot) {
	return {
		tellUser: function (channel, user, message) {
			bot.say(channel, user + ", " + message);
		}
	};
};