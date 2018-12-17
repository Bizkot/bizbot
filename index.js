const botconfig = require('./botconfig.json');
const tokenfile = require('./token.json');
const Discord = require('discord.js');
const fs = require('fs');

const bot = new Discord.Client({
	disableEveryone: true
});
bot.commands = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
	if (err) {
		console.log(err);
	}

	let commandeFiles = files.filter(f => f.split('.').pop() === 'js');
	commandeFiles.forEach(f => {
		let props = require(`./commands/${f}`);
		bot.commands.set(props.help.name, props);
	});
});

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

bot.on('error', console.error);

bot.on('ready', async () => {
	console.log(`${bot.user.username} is online!`);
	bot.user.setActivity('Bizkot coding', {
		type: 'WATCHING'
	});
});

bot.on('message', async message => {
	if (message.author.bot) return;
	if (message.channel.type === 'dm') return;

	let prefix = botconfig.prefix;
	let messageArray = message.content.split(' ');
	let cmd = messageArray[0];
	let args = messageArray.slice(1);

	let commandFile = bot.commands.get(cmd.slice(prefix.length));
	if (commandFile) {
		commandFile.run(bot, message, args);
	}

});

bot.login(tokenfile.botToken);
