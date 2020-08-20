const Discord = require('discord.js');
const colors = require('../../bot/colors.json');
const {
    api_key
} = require('../../bot/config.json');
const HypixelAPIReborn = require('hypixel-api-reborn');

const hypixelAPIReborn = new HypixelAPIReborn.Client(api_key);

module.exports = {
    name: 'socials',
    async execute(message, args, client) {

        hypixelAPIReborn.getPlayer(args[0]).then(async (player) => {
            if (!player) return message.channel.send('that player does not exist!');

            let embed = new Discord.MessageEmbed()
                .setTitle(`[${player.rank}] ${player.nickname}'s Social Media`)
                .setColor(colors.mainColor)
                .setFooter(`${message.author.tag} | Created by AnikoDev`, message.author.displayAvatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 2048
                }))

            if (player.socialmedia[0] != undefined || player.socialmedia[0] != null) {
                embed.addField(player.socialmedia[0].name, player.socialmedia[0].link)
            }

            if (player.socialmedia[1] != undefined || player.socialmedia[1] != null) {
                embed.addField(player.socialmedia[1].name, player.socialmedia[1].link)
            }

            if (player.socialmedia[2] != undefined || player.socialmedia[2] != null) {
                embed.addField(player.socialmedia[2].name, player.socialmedia[2].link)
            }

            if (player.socialmedia[3] != undefined || player.socialmedia[3] != null) {
                embed.addField(player.socialmedia[3].name, player.socialmedia[3].link)
            }

            if (player.socialmedia[4] != undefined || player.socialmedia[4] != null) {
                embed.addField(player.socialmedia[4].name, player.socialmedia[4].link)
            }

            if (player.socialmedia[5] != undefined || player.socialmedia[5] != null) {
                embed.addField(player.socialmedia[5].name, player.socialmedia[5].link)
            }

            if (player.socialmedia[6] != undefined || player.socialmedia[6] != null) {
                embed.addField(player.socialmedia[6].name, player.socialmedia[6].link)
            }

            message.channel.send(embed)

        })

    }
}