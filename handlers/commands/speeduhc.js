const Discord = require('discord.js');
const colors = require('../../bot/colors.json');
const HypixelAPIReborn = require('hypixel-api-reborn');
const Hypixel = require('hypixel');

const hypixelAPIReborn = new HypixelAPIReborn.Client('API-KEY');

module.exports = {
    name: 'speeduhc',
    async execute(message, args, client) {

        hypixelAPIReborn.getPlayer(args[0]).then((player) => {

            const embed = new Discord.MessageEmbed()
                .setTitle(`SpeedUHC stats for [${player.rank}] ${player.nickname}`)
                .setColor(colors.mainColor)
                .addField('Kills:', player.stats.speedUHC.kills)
                .addField('Losses:', player.stats.speedUHC.losses)
                .addField('Wins:', player.stats.speedUHC.wins)
                .addField('Winstreak:', player.stats.speedUHC.winstreak)
                .addField('Deaths:', player.stats.speedUHC.deaths)
                .addField('Games Played:', player.stats.speedUHC.playedGames)
                .addField('KD Ratio:', player.stats.speedUHC.KDRatio)
                .addField('WL Ratio:', player.stats.speedUHC.WLRatio)

            message.channel.send(embed);

        })

    }
}
