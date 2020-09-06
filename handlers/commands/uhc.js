const Discord = require('discord.js');
const colors = require('../../bot/colors.json');
const { api_key } = require('../../bot/config.json');
const HypixelAPIReborn = require('hypixel-api-reborn');

const hypixelAPIReborn = new HypixelAPIReborn.Client(api_key);

module.exports = {
    name: 'uhc',
    async execute(message, args, client) {

        hypixelAPIReborn.getPlayer(args[0]).then((player) => {

            const embed = new Discord.MessageEmbed()
                .setTitle(`UHC stats for [${player.rank}] ${player.nickname}`)
                .setColor(colors['MainColor'])
                .setFooter(`${message.author.tag} | Created by AnikoDev`, message.author.displayAvatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 2048
                }))
                .setImage('https://hypixel.net/styles/hypixel-v2/images/game-icons/UHC-64.png')
                .addField('Kills:', player.stats.uhc.kills, true)
                .addField('Level:', player.stats.uhc.starLevel, true)
                .addField('Wins:', player.stats.uhc.wins, true)
                .addField('Heads Eaten:', player.stats.uhc.headsEaten, true)
                .addField('Deaths', player.stats.uhc.deaths, true)
                .addField('Coins:', player.stats.uhc.coins, true)

            message.channel.send(embed);

        })

    }
}