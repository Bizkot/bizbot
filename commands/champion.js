const Discord = require('discord.js');
const dataDragon = require('../../RiotAPIWrapper/DataDragonAPI/dataDragonAPI');

module.exports.run = async (bot, message, args) => {
	if (!args[0] || args[0].length == 0) {
		return message.channel.send('Il faut préciser un champion!');
	}
	const championName = args[0].charAt(0).toUpperCase() + args[0].slice(1);

	let {champion} = {};
	await dataDragon.getStaticIndividualChampion(championName)
		.then(res => {
			champion = res.data[championName];
		})
		.catch(() => {
			message.channel.send(`Le champion ${championName} n'existe pas...`);
		});

	if (!champion) return;

	const championIcon = dataDragon.getChampionSquareURL(champion.image['full']);

	let championEmbed = new Discord.RichEmbed()
		.setColor('#FF9900')
		.setTitle('Champion : ' + champion.name)
		.setThumbnail(championIcon)
		.addField('Titre', champion.title)
		.addField('Histoire', champion.lore);

	return message.channel.send(championEmbed);

};

module.exports.help = {
	name: 'champion',
	description: 'Informations générales sur un champion: !champion nom'
};
