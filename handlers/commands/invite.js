const Discord = require('discord.js');

module.exports = {
    name: 'invite',
    async execute(message, args, client) {

        let embed = new Discord.MessageEmbed()
            .setDescription('You can invite me [here](https://top.gg/bot/730063696130211901)')

        message.channel.send(embed);
    }
}
