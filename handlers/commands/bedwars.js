const Discord = require('discord.js');
const colors = require('../../bot/colors.json');
const { api_key } = require('../../bot/config.json');
const HypixelAPIReborn = require('hypixel-api-reborn');

const hypixelAPIReborn = new HypixelAPIReborn.Client(api_key);

module.exports = {
    name: 'bedwars',
    async execute(message, args, client) {

        hypixelAPIReborn.getPlayer(args[0]).then(async (player) => {

            const embed = new Discord.MessageEmbed()
                .setTitle(`BedWars stats of [${player.rank}] ${player.nickname}`)
                .setColor(colors.mainColor)
                .addField('KD Ratio:', player.stats.bedwars.KDRatio)
                .addField('Final KD Ratio:', player.stats.bedwars.finalKDRatio)
                .addField('WL Ratio:', player.stats.bedwars.WLRatio)
                .addField('Bed Breaks:', player.stats.bedwars.beds.broken)
                .addField('Beds Lost:', player.stats.bedwars.beds.lost)
                .addField('Bed Break/Loss Ratio:', player.stats.bedwars.beds.BLRatio)
                .addField('Coins:', player.stats.bedwars.coins)
                .addField('Total Deaths:', player.stats.bedwars.deaths)
                .addField('Final Deaths:', player.stats.bedwars.finalDeaths)
                .addField('Total Kills:', player.stats.bedwars.kills)
                .addField('Total Final Kills:', player.stats.bedwars.finalKills)
                .addField('Winstreak:', player.stats.bedwars.winstreak)
                .addField('Total Wins:', player.stats.bedwars.wins)

            message.channel.send(embed);

        })

    }
}