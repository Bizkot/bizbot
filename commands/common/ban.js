const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission('BAN_MEMBERS')) {
		return message.channel.send('T\'as pas le droit de ban, cheh !');
	}

	let bMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if (!bMember) {
		return message.channel.send('J\'ai pas trouvé l\'utilisateur.');
	}
	let bReason = args.join(' ').slice(22);
	if (!bReason) {
		return message.channel.send('Il faut une raison !');
	}

	let banEmbed = new Discord.RichEmbed()
		.setDescription('Le ban des familles')
		.setColor('#BC0000')
		.addField('Utilisateur banni', bMember)
		.addField('Par', message.author)
		.addField('Dans le salon', message.channel)
		.addField('À', message.createdAt)
		.addField('Raison', bReason);

	let incidentsChannel = message.guild.channels.find(channel => channel.name === 'incidents');
	if (!incidentsChannel) {
		return message.channel.send('J\'ai pas trouvé le salon \'incidents\'.');
	}

	message.guild.member(bMember).ban(bReason);
	return incidentsChannel.send(banEmbed);
};

module.exports.help = {
	name: 'ban',
	description: 'Banni un utilisateur: !ban @utilisateur raison'
};
