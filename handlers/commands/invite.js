const Discord = require('discord.js');

module.exports = {
	name: 'invite',
	async execute(message, args, client) {
		
		message.channel.send('You can invite me [here](https://top.gg/bot/730063696130211901)');
	}
}