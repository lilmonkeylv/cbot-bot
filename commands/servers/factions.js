const f = require('../../functions/bases/serversBaseEmbed.js');

module.exports.run = async (bot, message, args) => {
       message.delete();
       f.createMCEmbed("minecraft", "146.59.220.140", "25579", "Factions", message);
};

module.exports.config = {
       name: "factions",
       aliases: ["fc", "fac"]
};