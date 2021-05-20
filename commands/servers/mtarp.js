const f = require('../../functions/bases/serversBaseEmbed.js');

module.exports.run = async (bot, message, args) => {
       message.delete();
       f.createMTARPEmbed("mtasa", "213.32.120.178", "22003", "MTA:RP", message);
};

module.exports.config = {
       name: "mtarp",
       aliases: ["rp"],
};
