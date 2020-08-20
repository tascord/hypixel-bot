const Discord = require('discord.js');
const colors = require('../../bot/colors.json');
const { api_key } = require('../../bot/config.json');
const HypixelAPIReborn = require('hypixel-api-reborn');

const hypixelAPIReborn = new HypixelAPIReborn.Client(api_key);

module.exports = {
    name: 'watchdog',
    aliases: ['wdr'],
    async execute(message, args, client) {

        hypixelAPIReborn.getWatchdogStats().then(async (stats) => {

            const watchdogStatsEmbed = new Discord.MessageEmbed()
                .setTitle('Watchdog Stats')
                .setColor(colors.mainColor)
                .setFooter(`${message.author.tag} | Created by AnikoDev`, message.author.displayAvatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 2048
                }))
                .addField('Total Watchdog bans:', stats.ByWatchdogTotal, true)
                .addField('Bans in the last minute:', stats.ByWatchDogLastMinute, true)
                .addField('Total staff bans', stats.ByStaffTotal, true)

            message.channel.send(watchdogStatsEmbed);

        });

    }
}