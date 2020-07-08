const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    async execute(message, args, client) {

        const msg = await message.channel.send('Pinging...');

        msg.edit(`Latency is: ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms`);

    }
}