const f = require('../../functions/bases/serversBaseEmbed.js');

module.exports.run = async (bot, message, args) => {
       message.delete();
       f.createCSGOEmbed("csgo", "retake.chill.lv", "27016", "Retake #2", message);
};

module.exports.config = {
       name: "retake2",
       aliases: ["ret2"],
};