const Discord = require('discord.js');
const colors = require('../../bot/colors.json');
const {
    api_key
} = require('../../bot/config.json');
const HypixelAPIReborn = require('hypixel-api-reborn');

const hypixelAPIReborn = new HypixelAPIReborn.Client(api_key);

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

            if (player.rank == 'Default') {
                playerRank = "None";
            }

            if (player.rank != 'Default') {
                playerRank = player.rank;
            }

            const playerInfoEmbed = new Discord.MessageEmbed()
                .setTitle(`Stats of [${player.rank}] ${player.nickname}`)
                .setColor(colors.mainColor)
                .addField('Rank:', playerRank, true)
                .addField('Level:', player.level, true)
                .addField('Karma:', player.karma, true)
                .addField('Main MC Version:', playerMinecraftVersion, true)
                .setFooter(`this player is ${playerIsOnline} | ${message.author.tag} | Created by AnikoDev`, message.author.displayAvatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 2048
                }))

            message.channel.send(playerInfoEmbed);
        })

    }
}