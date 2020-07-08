const Discord = require('discord.js');
const colors = require('../../bot/colors.json');
const HypixelAPIReborn = require('hypixel-api-reborn');
const Hypixel = require('hypixel');

const hypixelAPIReborn = new HypixelAPIReborn.Client('ff3f90cb-e6d5-4ab8-a01e-86b46c97fb97');

module.exports = {
    name: 'skywars',
    async execute(message, args, client) {

            hypixelAPIReborn.getPlayer(args[0]).then(async (player) => {

                const embed = new Discord.MessageEmbed()
                    .setTitle(`SkyWars stats of [${player.rank}] ${player.nickname}`)
                    .setColor(colors.mainColor)
                    .addField('Level:', player.stats.skywars.level)
                    .addField('Heads:', player.stats.skywars.heads)
                    .addField('KD Ratio:', player.stats.skywars.KDRatio)
                    .addField('WL Ratio:', player.stats.skywars.WLRatio)
                    .addField('Coins:', player.stats.skywars.coins)
                    .addField('Total Deaths:', player.stats.skywars.deaths)
                    .addField('Total Kills:', player.stats.skywars.kills)
                    .addField('Winstreak:', player.stats.skywars.winStreak)
                    .addField('Total Wins:', player.stats.skywars.wins)
                    .addField('Tokens:', player.stats.skywars.tokens)
                    .addField('Prestige:', player.stats.skywars.prestige)
                    .addField('Souls:', player.stats.skywars.souls)
                    .addField('Ranked Kills:', player.stats.skywars.ranked.kills)
                    .addField('Ranked Losses:', player.stats.skywars.ranked.losses)
                    .addField('Ranked Games Played:', player.stats.skywars.ranked.played)
                    .addField('Ranked Wins:', player.stats.skywars.ranked.wins)
                    .addField('Ranked KD Ratio:', player.stats.skywars.ranked.KDRatio)
                    .addField('Ranked WL Ration', player.stats.skywars.ranked.WLRatio)

                message.channel.send(embed);

            })
    }
}