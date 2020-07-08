const Discord = require('discord.js');
const colors = require('../../bot/colors.json');
const HypixelAPIReborn = require('hypixel-api-reborn');
const Hypixel = require('hypixel');

const hypixelAPIReborn = new HypixelAPIReborn.Client('API-KEY');

module.exports = {
    name: 'player',
    async execute(message, args, client) {

        hypixelAPIReborn.getPlayer(args[0]).then(async (player) => {
            if (!player) return message.channel.send('that player does not exist!');

            playerIsOnline = "";

            if (!player.isOnline) {
                playerIsOnline = "offline"
            }

            if (player.isOnline) {
                playerIsOnline = "online"
            }

            playerMinecraftVersion = "";

            if (player.mcVersion == null) {
                playerMinecraftVersion = "unknown";
            }

            if (player.mcVersion != null) {
                playerMinecraftVersion = player.mcVersion;
            }

            playerRank = "";

            if(player.rank == 'Default') {
                playerRank = "None";
            }

            if(player.rank != 'Default') {
                playerRank = player.rank;
            }

            const playerInfoEmbed = new Discord.MessageEmbed()
                .setTitle(`Stats of [${player.rank}] ${player.nickname}`)
                .setColor(colors.mainColor)
                .addField('Rank:', playerRank)
                .addField('Level:', player.level)
                //.addField('First Login:', player.firstLogin.toExponential())
                //.addField('Last Login:', player.lastLogin.toPrecision())
                .addField('Karma:', player.karma)
                .addField('Main MC Version:', playerMinecraftVersion)
                .setFooter(`this player is ${playerIsOnline} | ${message.author.tag}`, message.author.displayAvatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 2048
                }))

            message.channel.send(playerInfoEmbed);
        })

    }
}
