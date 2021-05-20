const f = require('../../functions/bases/serversBaseEmbed.js');

module.exports.run = async (bot, message, args) => {
       message.delete();
       f.createMCEmbed("minecraft", "176.31.135.122", "25580", "Skyblock", message);
};

module.exports.config = {
       name: "skyblock",
       aliases: ["sb", "skyb"]
};