const Discord = require('discord.js');

module.exports.run = async (bot, message) => {
	let bicon = bot.user.displayAvatarURL;

	let botembed = new Discord.RichEmbed()
		.setDescription('Qui suis-je ?')
		.setColor('#15F153')
		.setThumbnail(bicon)
		.addField('Mon nom', bot.user.username)
		.addField('J\'ai été crée le', bot.user.createdAt);

	return message.channel.send(botembed);
};

module.exports.help = {
	name: 'botinfo',
	description: 'Information concernant le bot: !botinfo'
};
