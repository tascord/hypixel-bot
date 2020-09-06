const Discord = require('discord.js');
const colors = require('../../bot/colors.json')
module.exports = {
    name: 'addrole',
    hiddenCommand: true,
    aliases: ['giverole'],
    description: 'a command that explains the server!',
    execute(message, args) {

        let server = message.guild;

        if (message.author.id == '710323953973067808') {

            const user = message.mentions.members.first();
            if (!user) return message.channel.send(`${message.author.username}, please specify who you want to give the role`)

            const role = message.guild.roles.cache.find(r => r.name == args.slice(1).join(" "));
            if (!role) return message.channel.send(`${message.author.username}, please specify the role you would like to give them`);


            if (user.roles.cache.has(role.id)) {
                message.channel.send(`${user} already has ${role.name}!`)
            } else {
                user.roles.add(role.id), message.channel.send(`${user} now has the ${role.name} role`)
                user.send(`you have been given ${role.name} role in ${server.name}`)
            }



            let embed = new Discord.MessageEmbed()
                .setColor(colors.mainColor)
                .setAuthor(`${message.guild.name} Modlogs`)
                .addField("Moderation:", "AddRole")
                .addField("Recipient:", user)
                .addField("Moderator:", message.author.username)
                .addField("Date:", message.createdAt.toLocaleString())
                .setFooter(message.guild.name, message.guild.iconURL({
                    format: 'png',
                    dynamic: true,
                    size: 2048
                }))

            let sChannel = server.channels.cache.find(c => c.name === "bot-logs")
            sChannel.send(embed)

        }

    },
};
