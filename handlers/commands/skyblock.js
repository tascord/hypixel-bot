const Discord = require('discord.js');
const colors = require('../../bot/colors.json');
const fetch = require('cross-fetch');
const slothpixel = require('slothpixel');
const fs = require('fs');
const nbt = require('prismarine-nbt');
const {
    api_key
} = require('../../bot/config.json');
const utils = require('../../util');
const {
    error
} = require('console');

module.exports = {
    name: 'skyblock',
    aliases: ['sb'],
    notReady: true,
    async execute(message, args, client) {

        let expMessage = 'Keep in mind this is experimental!\nThere are many bugs in this command!\nIf you get an error message then please report it to MatthewTGM#4058';

        let helpMessages = {
            "bazaar": "[item id (ie. \"raw fish\")]",
            "stats": "[player name (ie. \"MatthewTGM\")]",
            "kills": "[player name (ie. \"MatthewTGM\")]",
            "ah": "[item id (ie. \"aspect of the dragon\")]"
        }

        if (!args.length) {
            message.channel.send(`Specify an argument!\nAvailable args:\n\`\`\`bazaar ${helpMessages['bazaar']},\nstats ${helpMessages['stats']},\nkills ${helpMessages['kills']},\nah ${helpMessages['ah']}\`\`\``)
        }

        /*var emoji = '';

        if (profiles[0].cute_name == 'Apple') {
            emoji = '🍏';
        } else if (profiles[0].cute_name == 'Banana') {
            emoji = '🍌'
        } else if (profiles[0].cute_name == 'Grapes') {
            emoji = '🍇'
        } else if (profiles[0].cute_name == 'Pear') {
            emoji = '🍐'
        } else if (profiles[0].cute_name == 'Zucchini') {
            emoji = '🥒'
        } else if (profiles[0].cute_name == 'Pineapple') {
            emoji = '🍍'
        } else if (profiles[0].cute_name == 'Watermelon') {
            emoji = '🍉'
        } else if (profiles[0].cute_name == 'Lemon') {
            emoji = '🍋'
        } else if (profiles[0].cute_name == 'Tomato') {
            emoji = '🍅'
        } else if (profiles[0].cute_name == 'Coconut') {
            emoji = '🥥'
        } else if (profiles[0].cute_name == 'Orange') {
            emoji = '🍊'
        } else if (profiles[0].cute_name == 'Kiwi') {
            emoji = '🥝'
        } else if (profiles[0].cute_name == 'Pomegranate') {
            emoji = '🥭'
        }*/

        if (args[0] == 'bazaar') {

            let msg = await message.channel.send('Fetching...');

            try {

                let item = args.join(' ').slice(args[0].length + 1).replace(/ /g, '_').toUpperCase();
                const bazaarResponse = await fetch(`https://api.slothpixel.me/api/skyblock/bazaar/${item}`);
                const bazaarData = await bazaarResponse.json();
                const {
                    quick_status
                } = bazaarData;
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Bazaar details of ${item.replace(/_/g, ' ').toLowerCase()}`)
                    .setColor(colors['MainColor'])
                    .setFooter(expMessage)
                    .addField('Buy Price:', quick_status.buyPrice.toFixed(1))
                    .addField('Sell Price:', quick_status.buyPrice.toFixed(1))
                msg.edit('', embed);
            } catch (err) {
                if (err) {
                    msg.edit(`There was an error fetching that item!\n\n\`\`\`${err}\`\`\`\n\nPlease report this to MatthewTGM#4058`)
                    return console.error(err);
                }
            }
        }

        if (args[0] == 'optimizer' || args[0] == 'optimiser') {

            message.reply(`this ${client.user.username} feature is still in development! Check back later!`)
        }

        if (args[0] == 'ah' || args[0] == 'auctions') {

            let msg = await message.channel.send('Fetching...');

            try {

                let item = args.join(' ').slice(args[0].length + 1).replace(/ /g, '_').replace(/aspect of the dragons/g, 'aspect of the dragon').toUpperCase();
                const auctionResponse = await fetch(`https://api.slothpixel.me/api/skyblock/auctions/${item}`);
                const auctionData = await auctionResponse.json();
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Auction House details of ${item.replace(/_/g, ' ').toLowerCase()}`)
                    .setColor(colors['MainColor'])
                    .addField('Average Price:', auctionData.average_price)
                    .addField('Median Price:', auctionData.median_price)
                    .addField('Standard Deviation:', auctionData.standard_deviation)
                    .addField('Max Price:', auctionData.max_price)
                    .addField('Minimum Price:', auctionData.min_price)
                    .setFooter(expMessage)
                msg.edit('', embed);
            } catch (err) {
                if (err) {
                    msg.edit(`There was an error fetching that item!\n\n\`\`\`${err}\`\`\`\n\nPlease report this to MatthewTGM#4058`)
                    return console.error(err);
                }
            }
        }

        if (args[0] == 'stats') {

            try {

                let msg = await message.channel.send('Fetching...');

                fetch(`https://api.mojang.com/users/profiles/minecraft/${args[1]}`)
                    .then(result => result.json())
                    .then(async ({
                        id,
                        name
                    }) => {

                        const fetchProf = await fetch(`https://api.slothpixel.me/api/skyblock/profile/${args[1]}`);
                        const profileData = await fetchProf.json();

                        fs.writeFile('./nbt.json', JSON.stringify(profileData, null, 4), err => {
                            if (err) return console.error(err)
                        });

                        let embed = new Discord.MessageEmbed()
                            .setTitle(`${name}'s SkyBlock Stats`)
                            .setColor(colors['MainColor'])
                            .addField('Health:', profileData.members[id].attributes.health.toFixed(1), true)
                            .addField('Effective Health:', profileData.members[id].attributes.effective_health.toFixed(1), true)
                            .addField('Defense:', profileData.members[id].attributes.defense.toFixed(1), true)
                            .addField('Strength:', profileData.members[id].attributes.strength.toFixed(1), true)
                            .addField('Speed:', profileData.members[id].attributes.speed.toFixed(1), true)
                            .addField('Crit Chance:', profileData.members[id].attributes.crit_chance.toFixed(1), true)
                            .addField('Crit Damage:', profileData.members[id].attributes.crit_damage.toFixed(1), true)
                            .addField('Current Purse:', profileData.members[id].coin_purse.toFixed(1), true)
                            .addField('Death Count', profileData.members[id].death_count, true)
                            .setFooter(expMessage)

                        if (profileData.members[id].armor[3].name != null || profileData.members[id].armor[3].name != undefined) embed.addField('Helmet', profileData.members[id].armor[3].name.replace(/§/, '').replace(/\d+/, '').replace('d', '').replace('f', ''));
                        if (profileData.members[id].armor[2].name != null || profileData.members[id].armor[2].name != undefined) embed.addField('Chestplate', profileData.members[id].armor[2].name.replace(/§/, '').replace(/\d+/, '').replace('d', '').replace('f', ''));
                        if (profileData.members[id].armor[1].name != null || profileData.members[id].armor[1].name != undefined) embed.addField('Leggings', profileData.members[id].armor[1].name.replace(/§/, '').replace(/\d+/, '').replace('d', '').replace('f', ''));
                        if (profileData.members[id].armor[0].name != null || profileData.members[id].armor[0].name != undefined) embed.addField('Boots', profileData.members[id].armor[0].name.replace(/§/, '').replace(/\d+/, '').replace('d', '').replace('f', ''));

                        msg.edit('', embed);

                    })

            } catch (err) {
                console.error(err);
            }
        }

        if (args[0] == 'skills') {

            const fetchMojang = await fetch(`https://api.mojang.com/users/profiles/minecraft/${args[1].toLowerCase()}`);
            const responseMojang = await fetchMojang.json();
            const fetchProf = await fetch(`https://api.slothpixel.me/api/skyblock/profile/${responseMojang.name}`);
            const profileData = await fetchProf.json();

            let embed = new Discord.MessageEmbed()
                .setTitle(`Skills of ${responseMojang.name}`)
                .setColor(colors['MainColor'])

            for (key in profileData.members[responseMojang.id].skills) {
                if(profileData.members[responseMojang.id].skills[key].xpForNext == null || profileData.members[responseMojang.id].skills[key].xpForNext == undefined) {
                    profileData.members[responseMojang.id].skills[key].xpForNext = 'MAXED'
                }

                embed.addField(key, `**Current Level:** ${profileData.members[responseMojang.id].skills[key].level}\n**Current XP:** ${profileData.members[responseMojang.id].skills[key].xpCurrent}\n**XP Till next level:** ${profileData.members[responseMojang.id].skills[key].xpForNext}`, true)
            }

            message.channel.send(embed);

        }

        if (args[0] == 'kills') {

            let msg = await message.channel.send('Fetching...');

            fetch(`https://api.mojang.com/users/profiles/minecraft/${args[1]}`)
                .then(result => result.json())
                .then(async ({
                    id,
                    name
                }) => {

                    const fetchProf = await fetch(`https://api.slothpixel.me/api/skyblock/profile/${args[1]}`);
                    const profileData = await fetchProf.json();

                    let embed = new Discord.MessageEmbed()
                        .setTitle(`${name}'s Kill Counts`)
                        .setColor(colors['MainColor'])
                        .setFooter(expMessage)

                    for (const key in profileData.members[id].stats.kills) {
                        embed.addField(key.replace(/_/g, ' '), profileData.members[id].stats.kills[key], true)
                    }
                    msg.edit('', embed)
                })
        }
    }
}