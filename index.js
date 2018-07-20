const Discord = require('discord.js');
const client = new Discord.Client();
client.request = require('request-promise');
client.config = require('./config.json');
client.apiLink = 'http://discord.bot';

client.commands = new Discord.Collection();
client.commands.set('ping', require('./commands/ping.js'));
client.commands.set('fp', require('./commands/fp.js'));
client.commands.set('metar', require('./commands/metar.js'));

client.on('message', (message) => require('./events/message.js')(client, message));
client.on('ready', () => require('./events/ready')(client));

client.login(client.config.DISCORD_TOKEN);
