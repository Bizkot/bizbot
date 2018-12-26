const Discord = require('discord.js');
const superagent = require('superagent');

module.exports.run = async (bot, message) => {
	let {body} = {};
	await superagent
		.get('http://aws.random.cat/meow')
		.then(cat => {
			body = cat.body;
		})
		.catch(err => {
			return message.channel.send(err.message);
		});

	let catEmbed = new Discord.RichEmbed()
		.setColor('#FF9900')
		.setTitle('Cat :cat:')
		.setImage(body.file);

	message.channel.send(catEmbed);
};

module.exports.help = {
	name: 'cat',
	description: 'Affiche un chat aléatoire: !cat'
};
