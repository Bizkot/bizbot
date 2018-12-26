const Discord = require('discord.js');
const fs = require('fs');
let commands = [];

fs.readdir('./commands', (err, files) => {
	let commandFiles = files.filter(f => f.split('.').pop() === 'js');
	commandFiles.forEach(commandFile => {
		let props = require(`./${commandFile}`);
		commands.push({name: props.help.name, description: props.help.description});
	});
});

module.exports.run = async (bot, message) => {
	let helpEmbed = new Discord.RichEmbed()
		.setDescription('Liste des commandes')
		.setColor('#15F153');

	commands.forEach(command => {
		helpEmbed.addField(command.name, command.description);
	});

	return message.author.send(helpEmbed);
};

module.exports.help = {
	name: 'help',
	description: 'Envoie la liste des commandes par dm: !help'
};
