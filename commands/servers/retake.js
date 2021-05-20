const f = require('../../functions/bases/serversBaseEmbed.js');

module.exports.run = async (bot, message, args) => {
       message.delete();
       f.createCSGOEmbed("csgo", "retake.chill.lv", "27015", "Retake", message);
};

module.exports.config = {
       name: "retake",
       aliases: ["ret"],
};