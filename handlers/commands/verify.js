const Discord = require('discord.js');
const fs = require('fs');
const beautify = require('beautify');
const colors = require('../../bot/colors.json');

const { api_key } = require('../../bot/config.json');
const HypixelAPIReborn = require('hypixel-api-reborn');

const hypixelAPIReborn = new HypixelAPIReborn.Client(api_key);

module.exports = {
    name: 'verify',
    notReady: true,
    async execute(message, args, client) {

        let userInfoFile = JSON.parse(fs.readFileSync('./users/userinfo.json', 'utf-8'));
        if(!userInfoFile[message.author.id]) {
            userInfoFile[message.author.id] = {
                username: '',
                uuid: ''
            };

            fs.writeFile('./users/userinfo.json', beautify(JSON.stringify(userInfoFile)), async (err) => {
                if(err) throw err;
            })
        }

        hypixelAPIReborn.getPlayer(args[0].toLowerCase()).then(async (player) => {

            if(userInfoFile[message.author.id].username) {
                message.channel.send('you\'re already verified!');
            }

            for(length in userInfoFile) {
                if(player.nickname == userInfoFile[message.author.id].username) return;
            }
        })
    }
}