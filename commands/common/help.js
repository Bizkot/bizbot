const Discord = require('discord.js');
// const fs = require('fs');
// let commands = [];

// fs.readdir('../leagueOfLegends', (err, files) => {
// 	if (err) {
// 		console.log(err);
// 	}
// 	let commandFiles = files.filter(f => f.split('.').pop() === 'js');
// 	commandFiles.forEach(commandFile => {
// 		let props = require(`../leagueOfLegends/${commandFile}`);
// 		commands.push({name: props.help.name, description: props.help.description});
// 	});
// });

module.exports.run = async (bot, message) => {
	let lolCommandsEmbed = new Discord.RichEmbed()
		.setDescription('Liste des commandes League of Legends')
		.setColor('#FF0092');
	for (let [, v] of bot.lolCommands.entries()) {
		lolCommandsEmbed.addField(v.help.name, v.help.description);
	}

	let commonCommandsEmbed = new Discord.RichEmbed()
		.setDescription('Liste des commandes générales')
		.setColor('#FF0092');
	for (let [, v] of bot.commonCommands.entries()) {
		commonCommandsEmbed.addField(v.help.name, v.help.description);
	}

	message.author.send(lolCommandsEmbed);
	message.author.send(commonCommandsEmbed);
	return;
};

module.exports.help = {
	name: 'help',
	description: 'Envoie la liste des commandes par dm: !help'
};
