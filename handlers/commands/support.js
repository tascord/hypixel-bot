const Discord = require('discord.js');
const colors = require('../../bot/colors.json');

module.exports = {
    name: 'support',
    async execute(message, args, client) {

        const embed = new Discord.MessageEmbed()
            .setTitle('Support')
            .setColor(colors.mainColor)
            .setFooter(`${message.author.tag} | Created by AnikoDev`, message.author.displayAvatarURL({
                format: 'png',
                dynamic: true,
                size: 2048
            }))
            .setDescription('to get support for our bot join either of the servers below\n\nhttps://discord.gg/F3zJNwd\nhttps://discord.gg/eetFjJr')

        message.channel.send(embed);

    }
}