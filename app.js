var irc = require('irc'),
	express = require('express'),
	botFunctions = require('./botFunctions'),
	botController = require('./botController'),
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

  botController(bot, config);

  var app = express();
	app.set('port', process.env.PORT || 3000);
	app.use(app.router);
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.get("/", function (req, res) {
		res.send("hello world");
	});

  