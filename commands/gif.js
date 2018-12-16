const Discord = require('discord.js');
const superagent = require('superagent');
const botconfig = require('../botconfig.json');
// botconfig.giphyApiKey;
module.exports.run = async (bot, message) => {

	if (!args[0] || args[0].length == 0) return message.channel.send('missing gif tag : !gif tag')
	let {body} = await superagent
		.get('http://api.giphy.com/v1/gifs/random?api_key=' + botconfig.giphyApiKey+ '&tag=' + args[0]);

	let gifEmbed = new Discord.RichEmbed()
		.setColor('#FF9900')
		.setTitle('Gif : ' + args[0])
		.setImage(body.data.embed_url);

	message.channel.send(gifEmbed);
};

module.exports.help = {
	name: 'gif',
	description: 'Affiche un gif selon un tag de recherche: !gif tag'
};
