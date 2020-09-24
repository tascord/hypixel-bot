const Discord = require('discord.js');
const colors = require('../../bot/colors.json');
const { api_key } = require('../../bot/config.json');
const HypixelAPIReborn = require('hypixel-api-reborn');

const hypixelAPIReborn = new HypixelAPIReborn.Client(api_key);

module.exports = {
    name: 'skywars',
    aliases: ['sw'],
    async execute(message, args, client) {

            hypixelAPIReborn.getPlayer(args[0]).then(async (player) => {

                const embed = new Discord.MessageEmbed()
                    .setTitle(`SkyWars stats of [${player.rank}] ${player.nickname}`)
                    .setColor(colors['MainColor'])
                    .setFooter(`${message.author.tag} | Created by AnikoDev`, message.author.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                    }))
                    .setImage('https://hypixel.net/styles/hypixel-v2/images/game-icons/Skywars-64.png')
                    .addField('Level:', player.stats.skywars.level, true)
                    .addField('Heads:', player.stats.skywars.heads, true)
                    .addField('KD Ratio:', player.stats.skywars.KDRatio, true)
                    .addField('WL Ratio:', player.stats.skywars.WLRatio, true)
                    .addField('Coins:', player.stats.skywars.coins, true)
                    .addField('Total Deaths:', player.stats.skywars.deaths, true)
                    .addField('Total Kills:', player.stats.skywars.kills, true)
                    .addField('Winstreak:', player.stats.skywars.winStreak, true)
                    .addField('Total Wins:', player.stats.skywars.wins, true)
                    .addField('Tokens:', player.stats.skywars.tokens, true)
                    .addField('Prestige:', player.stats.skywars.prestige, true)
                    .addField('Souls:', player.stats.skywars.souls, true)
                    .addField('Ranked Kills:', player.stats.skywars.ranked.kills, true)
                    .addField('Ranked Losses:', player.stats.skywars.ranked.losses, true)
                    .addField('Ranked Games Played:', player.stats.skywars.ranked.played, true)
                    .addField('Ranked Wins:', player.stats.skywars.ranked.wins, true)
                    .addField('Ranked KD Ratio:', player.stats.skywars.ranked.KDRatio, true)
                    .addField('Ranked WL Ration', player.stats.skywars.ranked.WLRatio, true)

                message.channel.send(embed);

            })
    }
}