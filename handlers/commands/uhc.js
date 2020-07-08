const Discord = require('discord.js');
const colors = require('../../bot/colors.json');
const HypixelAPIReborn = require('hypixel-api-reborn');
const Hypixel = require('hypixel');

const hypixelAPIReborn = new HypixelAPIReborn.Client('API-KE');

module.exports = {
    name: 'uhc',
    async execute(message, args, client) {

        hypixelAPIReborn.getPlayer(args[0]).then((player) => {

            const embed = new Discord.MessageEmbed()
                .setTitle(`UHC stats for [${player.rank}] ${player.nickname}`)
                .setColor(colors.mainColor)
                .addField('Kills:', player.stats.uhc.kills)
                .addField('Level:', player.stats.uhc.starLevel)
                .addField('Wins:', player.stats.uhc.wins)
                .addField('Heads Eaten:', player.stats.uhc.headsEaten)
                .addField('Deaths', player.stats.uhc.deaths)
                .addField('Coins:', player.stats.uhc.coins)

            message.channel.send(embed);

        })

    }
}
