const Discord = require('discord.js');

module.exports.run = async (kayn, message, args) => {
	if (!args[0] || args[0].length == 0) {
		return message.channel.send('Il faut préciser un joueur!');
	}

	if (!args[1] || args[1].length == 0) {
		return message.channel.send('Il faut préciser un champion!');
	}

	const summoner = await kayn.SummonerV4.by.name(args[0]);
	const summonerIcon = `https://ddragon.leagueoflegends.com/cdn/8.24.1/img/profileicon/${summoner.profileIconId}.png`;
	
	const championName = args[1].charAt(0).toUpperCase() + args[1].slice(1).toLowerCase();
	const champion = await kayn.DDragon.Champion.getDataById(championName);
	const championIcon = `https://ddragon.leagueoflegends.com/cdn/8.24.1/img/champion/${champion.data[championName].image.full}`;

	const matchlist = await kayn.MatchlistV4.by
		.accountID(summoner.accountId)
		.query({
			champion: champion.data[championName].id,
			endIndex: 9
		});
	const matchIds = matchlist.matches.map(match => match.gameId);
	const matches = await Promise.all(matchIds.map(kayn.MatchV4.get));

	let nbOfWins = 0;
	matches.forEach(match => {
		let winningTeamId;
		match.teams.forEach(team => {
			if (team.win === 'Win') {
				winningTeamId = team.teamId;
			}
		});
		const participant = match.participantIdentities.find(
			participantIdentity =>
				participantIdentity.player.accountId === summoner.accountId
		);
		if (
			match.participants[participant.participantId - 1].teamId === winningTeamId
		) {
			nbOfWins += 1;
		}
	});
	let championEmbed = new Discord.RichEmbed()
		.setColor('#FF9900')
		.setAuthor(
			summoner.name,
			summonerIcon
		)
		.setTitle('Champion : ' + championName)
		.setThumbnail(championIcon)
		.addField(
			'Winrate les 10 dernières games',
			`${Math.round(nbOfWins * 10)}%`
		);

	return message.channel.send(championEmbed);
};

module.exports.help = {
	name: 'winrate',
	description:
    'Winrate d\'un joueur avec un champion sur les 25 dernières games: !winrate joueur champion'
};
