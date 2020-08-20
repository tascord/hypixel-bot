const Discord = require('discord.js');
const colors = require('../../bot/colors.json');

module.exports = {
    name: 'contributors',
    aliases: ['contribs'],
    async execute(message, args, client) {

        let contribs = ['MatthewTGM#4058', 'StavZDev#3264']

        const embed = new Discord.MessageEmbed()
            .setTitle('❤ Contributors ❤')
            .setColor(colors["mainColor"])
            .setDescription(contribs.join('\n'))

        message.channel.send(embed);
    }
}