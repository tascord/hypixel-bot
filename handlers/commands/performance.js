const Discord = require('discord.js');
const colors = require('../../bot/colors.json');
const MathHelper = require('../../bot/MathHelper');

module.exports = {
    name: 'performance',
    async execute(message, args, client) {

        let msg = await message.channel.send('Checking...');
        let embed = new Discord.MessageEmbed()
            .setTitle('Bot Performance')
            .setColor(colors['MainColor'])
            .addField('API Latency:', `**${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms**`, true)
            .addField('Websocket Latency:', `**${client.ws.ping}ms**`, true)
            .addField('Uptime:', `**${MathHelper.secondsToString(process.uptime())}**`)
            .addField('Memory Usage:', `**${Math.floor(process.memoryUsage().heapUsed / 1024 / 1024)}MB**`)
        msg.edit('', embed);
    }
}