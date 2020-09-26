const Discord = require('discord.js');
const DBL = require('dblapi.js');
const fs = require('fs');
const colors = require('./bot/colors.json');
const {
    token,
    dbl_key,
    prefix,
    version
} = require('./bot/config.json');

const client = new Discord.Client();
const dbl = new DBL(dbl_key, client);
client.commands = new Discord.Collection();

dbl.on('posted', async () => {
    console.log('Server count posted!');
})

dbl.on('error', async (e) => {
    console.error(e);
})

client.debugmode = false;

//EVENT + COMMAND HANDLER
const commandFiles = fs.readdirSync('./handlers/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./handlers/commands/${file}`);

    try {
        client.commands.set(command.name, command);
    } catch (err) {
        console.error(err);
    }
}



fs.readdir('./handlers/events', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const eventFunction = require(`./handlers/events/${file}`);
        if (eventFunction.disabled) return;

        const event = eventFunction.event || file.split('.')[0];
        const emitter = (typeof eventFunction.emitter == 'string' ? client[eventFunction.emitter] : eventFunction.emitter) || client;
        const once = eventFunction.once;

        try {
            emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.run(client, ...args))
        } catch (error) {
            console.error(error.stack);
        }
    });
});
//EVENT + COMMAND HANDLER

client.on("ready", async () => {

    console.log(`${client.user.username}: ` + 'now online | version: ' + version);

    let statuses = {
        "0": {
            "status": "on hypixel.net",
            "type": "PLAYING"
        },
        "1": {
            "status": "for h!help",
            "type": "WATCHING"
        },
        "2": {
            "status": "for h!suggest",
            "type": "WATCHING"
        },
        "3": {
            "status": "now verified!",
            "type": "WATCHING"
        },
        "4": {
            "status": `NOW IN ${client.guilds.cache.size} SERVERS!`,
            "type": "PLAYING"
        },
    }

    setInterval(function () {
        let time = Math.floor(Math.random() * Object.keys(statuses).length)
        let status = statuses[time].status
        let type = statuses[time].type
        if (client.debugmode) {
            let channel = client.guilds.cache.find(g => g.id == 733546808768462908).channels.cache.find(c => c.id == 758784929935917097);
            channel.send(`Status: ${status}\nType: ${type}`);
        }
        client.user.setActivity(status, {
            type: type,
        });
    }, 6000)

})

client.on("message", async message => {

    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' ');
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply("I can\'t execute that command in DMs!");
    }

    if (command.notReady) {

        const embed = new Discord.MessageEmbed()
            .setTitle('This command is not ready!')
            .setColor(colors.mainColor)
            .setFooter(`${message.author.tag} | Created by AnikoDev`, message.author.displayAvatarURL({
                format: 'png',
                dynamic: true,
                size: 2048
            }))

        return message.channel.send(embed)
    }

    try {
        command.execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
})

client.login(token);