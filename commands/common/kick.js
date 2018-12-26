const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission('KICK_MEMBERS')) {
		return message.channel.send('T\'as pas le droit de kick, cheh !');
	}

	let kMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if (!kMember) {
		return message.channel.send('J\'ai pas trouvé l\'utilisateur.');
	}
	let kReason = args.join(' ').slice(22);
	if (!kReason) {
		return message.channel.send('Il faut une raison !');
	}

	let kickEmbed = new Discord.RichEmbed()
		.setDescription('Ça dégage')
		.setColor('#E56B00')
		.addField('Utilisateur dégagé', kMember)
		.addField('Par', message.author)
		.addField('Dans le salon', message.channel)
		.addField('À', message.createdAt)
		.addField('Raison', kReason);

	let incidentsChannel = message.guild.channels.find(channel => channel.name === 'incidents');
	if (!incidentsChannel) {
		return message.channel.send('J\'ai pas trouvé le salon \'incidents\'.');
	}

	message.guild.member(kMember).kick(kReason);
	return incidentsChannel.send(kickEmbed);
};

module.exports.help = {
	name: 'kick',
	description: 'Expulse un utilisateur: !kick @utilisateur raison'
};
