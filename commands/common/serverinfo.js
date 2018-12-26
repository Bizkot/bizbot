const Discord = require('discord.js');

module.exports.run = async (bot, message) => {
	let sicon = message.guild.iconURL;

	let serverembed = new Discord.RichEmbed()
		.setDescription('Informations du serveur')
		.setColor('#15F153')
		.setThumbnail(sicon)
		.addField('Nom', message.guild.name)
		.addField('Crée le', message.guild.createdAt)
		.addField('Tu l\'as rejoint le', message.member.joinedAt)
		.addField('Nombre d\'utilisateurs', message.guild .memberCount);

	return message.channel.send(serverembed);
};

module.exports.help = {
	name: 'serverinfo',
	description: 'Informations concernant le serveur: !serverinfo'
};
