const f = require('../../functions/bases/serversBaseEmbed.js');

module.exports.run = async (bot, message, args) => {
       message.delete();
       f.createCSGOEmbed("csgo", "awp.chill.lv", "27015", "AWP", message);
};

module.exports.config = {
       name: "awp",
       aliases: [""]
}