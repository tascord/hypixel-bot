const Discord = require('discord.js');
const colors = require('../../bot/colors.json');
const { api_key } = require('../../bot/config.json');
const HypixelAPIReborn = require('hypixel-api-reborn');

const hypixelAPIReborn = new HypixelAPIReborn.Client(api_key);

module.exports = {
    name: 'watchdog',
    async execute(message, args, client) {

        hypixelAPIReborn.getWatchdogStats().then(async (stats) => {

            const watchdogStatsEmbed = new Discord.MessageEmbed()
                .setTitle('Watchdog Stats')
                .setColor(colors.mainColor)
                .addField('Total Watchdog bans:', stats.ByWatchdogTotal)
                .addField('Bans in the last minute:', stats.ByWatchDogLastMinute)
                .addField('Total staff bans', stats.ByStaffTotal)

            message.channel.send(watchdogStatsEmbed);

        });

    }
}