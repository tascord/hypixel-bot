const Discord = require('discord.js');
const colors = require('../../bot/colors.json');

module.exports = {
    name: 'ping',
    async execute(message, args, client) {

        const embedOne = new Discord.MessageEmbed()
            .setTitle('Pinging...')
            .setColor(colors.mainColor)
            .setFooter(`${message.author.tag} | Created by AnikoDev`, message.author.displayAvatarURL({
                format: 'png',
                dynamic: true,
                size: 2048
            }))

        const msg = await message.channel.send(embedOne);

        const embedTwo = new Discord.MessageEmbed()
            .setTitle(`Latency is: ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms`)
            .setColor(colors.mainColor)
            .setFooter(`${message.author.tag} | Created by AnikoDev`, message.author.displayAvatarURL({
                format: 'png',
                dynamic: true,
                size: 2048
            }))

        msg.edit(embedTwo);

    }
}