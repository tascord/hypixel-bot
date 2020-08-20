const Discord = require('discord.js');
const fs = require('fs');
const colors = require('../../bot/colors.json');
const {
    api_key
} = require('../../bot/config.json');
const HypixelAPIReborn = require('hypixel-api-reborn');
const {
    schedulingPolicy
} = require('cluster');

const hypixelAPIReborn = new HypixelAPIReborn.Client(api_key);

module.exports = {
    name: 'notify',
    notReady: true,
    async execute(message, args, client) {

        const usageEmbed = new Discord.MessageEmbed()
            .setTitle(`Usage of notify command`)
            .setFooter(message.author.tag, message.author.displayAvatarURL({
                format: 'png',
                dynamic: true,
                size: 2048
            }))
            .setDescription(`notify [PLAYER IGN]`)
            .setColor(colors.mainColor);

        let userNoti = JSON.parse(fs.readFileSync('./user/notifications.json', 'utf8'));

        if (!args.length) {
            message.channel.send(usageEmbed);
        } else {

            hypixelAPIReborn.getPlayer(args[0]).then(async (player) => {

                userNoti[player.nickname] = {
                    notifiers: message.author.id
                };

                fs.writeFile('./user/notifications.json', JSON.stringify(userNoti), (err) => {

                    if (err) {
                        console.error(err);

                        const errorEmbed = new Discord.MessageEmbed()
                            .setTitle('An error in writing to JSON file!')
                            .setColor(colors.errorColor)
                            .setDescription(err)
                            .setFooter(message.author.tag, message.author.displayAvatarURL({
                                format: 'png',
                                dynamic: true,
                                size: 2048
                            }))

                        message.channel.send(errorEmbed);
                    }

                })

                const setEmbed = new Discord.MessageEmbed()
                    .setTitle('Notification Set!')
                    .setFooter(`${message.author.tag} | Created by AnikoDev`, message.author.displayAvatarURL)
                    .setDescription(`${player.nickname} has been added to your notifications list!`)
                    .setColor(colors.mainColor)

                message.channel.send(setEmbed)

            })

        }

    }
}