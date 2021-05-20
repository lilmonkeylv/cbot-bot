const f = require('../../functions/bases/serversBaseEmbed.js');

module.exports.run = async (bot, message, args) => {
       message.delete();
       f.createCSGOEmbed("csgo", "csdm.chill.lv", "27015", "CSDM", message);
};

module.exports.config = {
       name: "csdm",
       aliases: ["dm"]
}