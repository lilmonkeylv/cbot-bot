const { Client, Collection } = require("discord.js");
const { token } = require("./configs/config.json");
// const { GiveawayManagerWithOwnDatabase, normalFunction } = require('./functions/cleanups/giveawayFunctions');
const bot = new Client({ 
    restTimeOffset: 0,
    partials: ['MESSAGE', 'CHANNEL', 'GUILD_MEMBER', 'REACTION'],
    messageSweepInterval: 60,
});
const f = require('./functions/cleanups/consoleCmds.js');
/* Enmaps */
const Enmap = require('enmap');
bot.points = new Enmap("points");
bot.settings = new Enmap("settings");
bot.tickets = new Enmap("tickets");
bot.blacklist = new Enmap("blacklist");
/* Configs */
bot.config = require('./configs/config.json');
bot.colors = require('./configs/colors.json');

/* Giveaways */
// normalFunction(GiveawayManagerWithOwnDatabase, bot);

/* ConsoleCMDS */
f.consoleCmds(bot);

/* Load commands/events */
["aliases", "commands"].forEach(x => bot[x] = new Collection());
["command", "event", "process"].forEach(x => require(`./handlers/${x}`)(bot));

/* Login */
bot.login(token);