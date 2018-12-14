const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
	let rMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if (!rMember) {
		return message.channel.send('J\'ai pas trouvé l\'utilisateur');
	}
	if (rMember === message.guild.owner) {
		return message.channel.send('Tu peux pas report le chef!');
	}
	if (rMember.user.bot) {
		return message.channel.send('Tu peux pas report un bot...');
	}
	let rReason = args.join(' ').slice(22);
	if (!rReason) {
		return message.channel.send('Il faut une raison !');
	}

	let reportEmbed = new Discord.RichEmbed()
		.setDescription('Riz-porte')
		.setColor('#15F153')
		.addField('Utilisateur signalé', rMember)
		.addField('Par', message.author)
		.addField('Dans le salon', message.channel)
		.addField('À', message.createdAt)
		.addField('Raison', rReason);

	let reportsChannel = message.guild.channels.find(channel => channel.name === 'reports');
	if (!reportsChannel) {
		return message.channel.send('J\'ai pas trouvé le channel \'reports\'');
	}

	return reportsChannel.send(reportEmbed);
};

module.exports.help = {
	name: 'report',
	description: 'Signale un utilisateur: !report @utilisateur raison'
};
