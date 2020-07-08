const Discord = require('discord.js');
const colors = require('../../bot/colors.json');

module.exports = {
    name: 'credits',
    async execute(message, args, client) {

        const embed = new Discord.MessageEmbed()
            .setTitle('MatthewTGM\'s Hypixel Bot credits')
            .setColor(colors.mainColor)
            .addField('Author / Creator', 'MatthewTGM#4058')
            .addField('NPM Library Creator', 'StatsZDev#3264')

        message.channel.send(embed)

    }
}