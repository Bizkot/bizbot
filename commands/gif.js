const Discord = require('discord.js');
const superagent = require('superagent');
const tokenFile = require('../token.json');

module.exports.run = async (bot, message, args) => {

	if (!args[0] || args[0].length == 0) {
		return message.channel.send('Il faut préciser un tag!');
	}
	let {body} = await superagent
		.get('http://api.giphy.com/v1/gifs/search?api_key=' + tokenFile.giphyApiKey+ '&q=' + args[0]);

	if (body.data.length === 0) {
		return message.channel.send('Aucun GIF trouvé, sorry dude!')
	}

	let gifEmbed = new Discord.RichEmbed()
		.setColor('#FF9900')
		.setTitle('Gif : ' + args[0])
		.setImage(body.data[Math.trunc(Math.random()*body.data.length)].images.original.url);

	message.channel.send(gifEmbed);
};

module.exports.help = {
	name: 'gif',
	description: 'Affiche un gif selon un tag de recherche: !gif tag'
};
