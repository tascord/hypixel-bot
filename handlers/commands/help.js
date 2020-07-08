const Discord = require('discord.js');
const colors = require('../../bot/colors.json');
const { prefix } = require('../../bot/config.json');

module.exports = {
    name: 'help',
    async execute(message, args, client) {

        let server = message.guild;
        const data = [];
        const {
            commands
        } = message.client;

        if (!args.length) {

        }

        const embed = new Discord.MessageEmbed()
            .setTitle(`${server.name} Help`)
            .setColor(colors.mainColor)
            .setDescription(`My Commands\nDon\'t forget that the prefix is \'${prefix}\'`)
            .addField("Commands", commands.filter(e => !e.modOnly).filter(e => !e.hiddenCommand).map(command => command.name).join('\n'))
            .setFooter(message.author.tag, message.author.displayAvatarURL({
                format: 'png',
                dynamic: true,
                size: 2048
            }))


        if (!args.length) {
            data.push(embed);
            return message.author.send(data, {
                    split: true
                })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve sent you a DM with all my commands!');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
                });
        }

    }
}