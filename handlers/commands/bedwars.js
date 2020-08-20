const Discord = require('discord.js');
const colors = require('../../bot/colors.json');
const { api_key } = require('../../bot/config.json');
const HypixelAPIReborn = require('hypixel-api-reborn');

const hypixelAPIReborn = new HypixelAPIReborn.Client(api_key);

module.exports = {
    name: 'bedwars',
    aliases: ['bw'],
    async execute(message, args, client) {

        hypixelAPIReborn.getPlayer(args[0]).then(async (player) => {

            const embed = new Discord.MessageEmbed()
                .setTitle(`BedWars stats of [${player.rank}] ${player.nickname}`)
                .setColor(colors.mainColor)
                .setFooter(`${message.author.tag} | Created by AnikoDev`, message.author.displayAvatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 2048
                }))
                .setImage('https://hypixel.net/styles/hypixel-v2/images/game-icons/BedWars-64.png')
                .addField('Level (Star)', player.stats.bedwars.level, true)
                .addField('KD Ratio:', player.stats.bedwars.KDRatio, true)
                .addField('Final KD Ratio:', player.stats.bedwars.finalKDRatio, true)
                .addField('WL Ratio:', player.stats.bedwars.WLRatio, true)
                .addField('Bed Breaks:', player.stats.bedwars.beds.broken, true)
                .addField('Beds Lost:', player.stats.bedwars.beds.lost, true)
                //.addField('Bed BL Ratio:', player.stats.bedwars.beds.BLRatio, true)
                .addField('Coins:', player.stats.bedwars.coins, true)
                .addField('Total Deaths:', player.stats.bedwars.deaths, true)
                .addField('Final Deaths:', player.stats.bedwars.finalDeaths, true)
                .addField('Total Kills:', player.stats.bedwars.kills, true)
                .addField('Total Final Kills:', player.stats.bedwars.finalKills, true)
                .addField('Winstreak:', player.stats.bedwars.winstreak, true)
                .addField('Total Wins:', player.stats.bedwars.wins, true)

            message.channel.send(embed);

        })

    }
}