const Discord = require('discord.js');
const dataDragon = require('../../RiotAPIWrapper/DataDragonAPI/dataDragonAPI');

module.exports.run = async (bot, message, args) => {
	if (!args[0] || args[0].length == 0) {
		return message.channel.send('Il faut préciser un tag!');
	}
	let {champion} = {};
	await dataDragon.getStaticIndividualChampion(args[0])
		.then(res => {
			champion = res.data[args[0]];
		});

	if (champion.data.length === 0) {
		return message.channel.send(`Le champion ${args[0]} n'existe pas...`);
	}

	let championEmbed = new Discord.RichEmbed()
		.setColor('#FF9900')
		.setTitle('Champion : ' + champion.name)
		.addField('Titre', champion.title)
		.addField('Histoire', champion.lore);

	message.channel.send(championEmbed);

};

module.exports.help = {
	name: 'champion',
	description: 'Informations générales sur un champion: !champion nom'
};
