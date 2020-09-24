const Discord = require('discord.js');
const colors = require('../../bot/colors.json');

module.exports = {
    name: 'suggest',
    asliases: ['suggestion', 'suggestfeature'],
    async execute(message, args, client) {

        if(!args.length) {
            return message.reply('you need to actually suggest **something!**')
        }

        let suggestion = args.join(' ');

        let embed = new Discord.MessageEmbed()
            .setTitle('New Suggestion!')
            .setColor(colors['MainColor'])
            .addField('Suggester:', message.author.tag)
            .addField('Suggestion:', suggestion)

        //const channel = client.guilds.cache.find(g => g.id == 733546808768462908).channels.cache.find(c => c.id == 758691382670917652);
        let MatthewTGM = client.users.cache.find(m => m.id == 432291917645086720);
        //channel.send(embed);
        MatthewTGM.send(embed);
        message.reply(`your suggestion has been submitted!`)
    }
}