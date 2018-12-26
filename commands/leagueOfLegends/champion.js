const Discord = require('discord.js');
const dataDragon = require('../../../RiotAPIWrapper/DataDragonAPI/dataDragonAPI');

module.exports.run = async (kayn, message, args) => {
	if (!args[0] || args[0].length == 0) {
		return message.channel.send('Il faut préciser un champion!');
	}
	const championName = args[0].charAt(0).toUpperCase() + args[0].slice(1).toLowerCase();

	kayn.DDragon.Champion.getDataById(championName)
		.callback(function(error, res) {
			if (error) {
				return message.channel.send(`Le champion ${championName} n'existe pas`);
			}

			const champion = res.data[championName];
			const championIcon = dataDragon.getChampionSquareURL(champion.image['full']);

			let championEmbed = new Discord.RichEmbed()
				.setColor('#FF9900')
				.setTitle('Champion : ' + champion.name)
				.setThumbnail(championIcon)
				.addField('Titre', champion.title)
				.addField('Histoire', champion.lore);

			return message.channel.send(championEmbed);
		});
};

module.exports.help = {
	name: 'champion',
	description: 'Informations générales sur un champion: !champion nom'
};
