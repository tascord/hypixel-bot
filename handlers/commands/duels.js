const Discord = require('discord.js');
const colors = require('../../bot/colors.json');
const {
    api_key
} = require('../../bot/config.json');
const HypixelAPIReborn = require('hypixel-api-reborn');

const hypixelAPIReborn = new HypixelAPIReborn.Client(api_key);

module.exports = {
    name: 'duels',
    async execute(message, args, client) {

        if(!args.length) {

            const embed = new Discord.MessageEmbed()
                .setTitle(`Help for Duels command`)
                .setColor(colors.mainColor)
                .addField('Sub Commands:', 'uhc\nskywars\nbridge\nsumo\nop\ncombo')
                .setFooter(`${message.author.tag} | Created by AnikoDev`, message.author.displayAvatarURL({
                format: 'png',
                dynamic: true,
                size: 2048
            }))
            .setImage('https://hypixel.net/styles/hypixel-v2/images/game-icons/Duels-64.png')

            message.channel.send(embed);

        }

        if (args[0] == 'uhc') {

            hypixelAPIReborn.getPlayer(args[1]).then((player) => {

                if(!player) return message.channel.send('That player doesn\'t exist!');

                const embed = new Discord.MessageEmbed()
                    .setTitle(`UHC Duels stats of [${player.rank}] ${player.nickname}`)
                    .setColor(colors.mainColor)
                    .addField('Kills:', player.stats.duels.uhc.v1.kills)
                    .addField('Losses:', player.stats.duels.uhc.v1.losses)
                    .addField('Deaths:', player.stats.duels.uhc.v1.deaths)
                    .addField('Wins:', player.stats.duels.uhc.v1.wins)
                    .setFooter(`${message.author.tag} | Created by AnikoDev`, message.author.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                    }))

                message.channel.send(embed);

            })

        }

        if (args[0] == 'skywars') {

            hypixelAPIReborn.getPlayer(args[1]).then((player) => {

                if(!player) return message.channel.send('That player doesn\'t exist!');

                const embed = new Discord.MessageEmbed()
                    .setTitle(`SkyWars Duels stats of [${player.rank}] ${player.nickname}`)
                    .setColor(colors.mainColor)
                    .addField('Kills:', player.stats.duels.skywars.v1.kills)
                    .addField('Losses:', player.stats.duels.skywars.v1.losses)
                    .addField('Deaths:', player.stats.duels.skywars.v1.deaths)
                    .addField('Wins:', player.stats.duels.skywars.v1.wins)
                    .setFooter(`${message.author.tag} | Created by AnikoDev`, message.author.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                    }))

                message.channel.send(embed);

            })

        }

        if (args[0] == 'bridge') {

            hypixelAPIReborn.getPlayer(args[1]).then((player) => {

                if(!player) return message.channel.send('That player doesn\'t exist!');

                const embed = new Discord.MessageEmbed()
                    .setTitle(`Bridge Duels stats of [${player.rank}] ${player.nickname}`)
                    .setColor(colors.mainColor)
                    .addField('Kills:', player.stats.duels.bridge.v1.kills)
                    .addField('Losses:', player.stats.duels.bridge.v1.losses)
                    .addField('Deaths:', player.stats.duels.bridge.v1.deaths)
                    .addField('Wins:', player.stats.duels.bridge.v1.wins)
                    .setFooter(`${message.author.tag} | Created by AnikoDev`, message.author.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                    }))

                message.channel.send(embed);

            })

        }

        if (args[0] == 'sumo') {

            hypixelAPIReborn.getPlayer(args[1]).then((player) => {

                if(!player) return message.channel.send('That player doesn\'t exist!');

                const embed = new Discord.MessageEmbed()
                    .setTitle(`Sumo Duels stats of [${player.rank}] ${player.nickname}`)
                    .setColor(colors.mainColor)
                    .addField('Kills:', player.stats.duels.sumo.kills)
                    .addField('Losses:', player.stats.duels.sumo.losses)
                    .addField('Deaths:', player.stats.duels.sumo.deaths)
                    .addField('Wins:', player.stats.duels.sumo.wins)
                    .setFooter(`${message.author.tag} | Created by AnikoDev`, message.author.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                    }))

                message.channel.send(embed);

            })

        }

        if (args[0] == 'op') {

            hypixelAPIReborn.getPlayer(args[1]).then((player) => {

                if(!player) return message.channel.send('That player doesn\'t exist!');

                const embed = new Discord.MessageEmbed()
                    .setTitle(`OP Duels stats of [${player.rank}] ${player.nickname}`)
                    .setColor(colors.mainColor)
                    .addField('Kills:', player.stats.duels.op.v1.kills)
                    .addField('Losses:', player.stats.duels.op.v1.losses)
                    .addField('Deaths:', player.stats.duels.op.v1.deaths)
                    .addField('Wins:', player.stats.duels.op.v1.wins)
                    .setFooter(`${message.author.tag} | Created by AnikoDev`, message.author.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                    }))

                message.channel.send(embed);

            })

        }

        if (args[0] == 'combo') {

            hypixelAPIReborn.getPlayer(args[1]).then((player) => {

                if(!player) return message.channel.send('That player doesn\'t exist!');

                const embed = new Discord.MessageEmbed()
                    .setTitle(`Combo Duels stats of [${player.rank}] ${player.nickname}`)
                    .setColor(colors.mainColor)
                    .addField('Kills:', player.stats.duels.combo.kills, true)
                    .addField('Losses:', player.stats.duels.combo.losses, true)
                    .addField('Deaths:', player.stats.duels.combo.deaths, true)
                    .addField('Wins:', player.stats.duels.combo.wins, true)
                    .setFooter(`${message.author.tag} | Created by AnikoDev`, message.author.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                    }))

                message.channel.send(embed);

            })

        }

    }
}