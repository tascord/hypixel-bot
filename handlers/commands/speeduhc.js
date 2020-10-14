const Discord = require('discord.js');
const colors = require('../../bot/colors.json');
const { api_key } = require('../../bot/config.json');
const HypixelAPIReborn = require('hypixel-api-reborn');

const hypixelAPIReborn = new HypixelAPIReborn.Client(api_key);

module.exports = {
    name: 'speeduhc',
    async execute(message, args, client) {

        hypixelAPIReborn.getPlayer(args[0]).then((player) => {

            const embed = new Discord.MessageEmbed()
                .setTitle(`SpeedUHC stats for [${player.rank}] ${player.nickname}`)
                .setColor(colors['MainColor'])
                .setFooter(`${message.author.tag} | Created by AnikoDev`, message.author.displayAvatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 2048
                }))
                .setImage('https://hypixel.net/styles/hypixel-v2/images/game-icons/SpeedUHC-64.png')
                .addField('Kills:', player.stats.speedUHC.kills, true)
                .addField('Losses:', player.stats.speedUHC.losses, true)
                .addField('Wins:', player.stats.speedUHC.wins, true)
                .addField('Winstreak:', player.stats.speedUHC.winstreak, true)
                .addField('Deaths:', player.stats.speedUHC.deaths, true)
                .addField('Games Played:', player.stats.speedUHC.playedGames, true)
                .addField('KD Ratio:', player.stats.speedUHC.KDRatio, true)
                .addField('WL Ratio:', player.stats.speedUHC.WLRatio, true)

            message.channel.send(embed);

        }).catch(e => {message.channel.send('I could not find that player in the API. Check spelling and name history.')});

    }
}