const botconfig = require('./botconfig.json');
const tokenfile = require('./token.json');

const Discord = require('discord.js');
const { Kayn, REGIONS, LRUCache } = require('kayn');
const fs = require('fs');

const bot = new Discord.Client({
	disableEveryone: true
});
bot.lolCommands = new Discord.Collection();
bot.commonCommands = new Discord.Collection();

const kayn = Kayn(tokenfile.riotApiKey)({
	region: REGIONS.EUROPE_WEST,
	locale: 'fr_FR',
	debugOptions: {
		isEnabled: true,
		showKey: false
	},
	requestOptions: {},
	cacheOptions: {
		cache: new LRUCache({ max: 5000 }),
		timeToLives: {
			useDefault: true
		}
	}
});

fs.readdir('./commands/leagueOfLegends', (err, files) => {
	if (err) {
		console.log(err);
	}

	let commandFiles = files.filter(f => f.split('.').pop() === 'js');
	commandFiles.forEach(f => {
		let props = require(`./commands/leagueOfLegends/${f}`);
		bot.lolCommands.set(props.help.name, props);
	});
});

fs.readdir('./commands/common', (err, files) => {
	if (err) {
		console.log(err);
	}

	let commandFiles = files.filter(f => f.split('.').pop() === 'js');
	commandFiles.forEach(f => {
		let props = require(`./commands/common/${f}`);
		bot.commonCommands.set(props.help.name, props);
	});
});

bot.on('error', console.error);

bot.on('ready', async () => {
	console.log(`${bot.user.username} is online!`);
});

bot.on('message', async message => {
	if (message.author.bot || message.channel.type === 'dm') {
		return;
	}

	let prefix = botconfig.prefix;
	let messageArray = message.content.split(' ');
	let cmd = messageArray[0].slice(prefix.length);
	let args = messageArray.slice(1);
	let commandFile;

	if (bot.lolCommands.has(cmd)) {
		commandFile = bot.lolCommands.get(cmd);
		commandFile.run(kayn, message, args);
	} else if (bot.commonCommands.has(cmd)) {
		commandFile = bot.commonCommands.get(cmd);
		commandFile.run(bot, message, args);
	}
});

bot.login(tokenfile.botToken);
