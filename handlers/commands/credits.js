const Discord = require('discord.js');
const colors = require('../../bot/colors.json');

module.exports = {
    name: 'credits',
    async execute(message, args, client) {

        const embed = new Discord.MessageEmbed()
            .setTitle('Hypixel Bot credits')
            .setColor(colors['MainColor'])
            .setFooter(`${message.author.tag} | Created by AnikoDev`, message.author.displayAvatarURL({
                format: 'png',
                dynamic: true,
                size: 2048
            }))
            .addField('Author / Creator', 'AnikoDev, LLC')
            .addField('Head Developer:', 'MatthewTGM#4058 | MatthewTGM 2#9369')
            .addField('NPM Library Creator', 'StavZDev#3264')

        message.channel.send(embed)

    }
}