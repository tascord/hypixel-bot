const Discord = require("discord.js");
const colors = require('../../bot/colors.json');

module.exports = {
    name: 'info',
    async execute(message, args, client) {

        const embed = new Discord.MessageEmbed()
            .setTitle('✨ Information ✨')
            .setColor(colors.mainColor)
            .setImage(client.user.displayAvatarURL({ format: 'png', size: 2048, dynamic: true }))
            .addField('Username:', client.user.tag, true)
            .addField('Guild Size:', client.guilds.cache.size, true)
            .addField('User Count:', client.users.cache.size, true)

        message.channel.send(embed);

    }
}