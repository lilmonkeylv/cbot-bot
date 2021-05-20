const f = require('../../functions/bases/serversBaseEmbed.js');

module.exports.run = async (bot, message, args) => {
       message.delete();
       f.createCSGOEmbed("csgo", "am.chill.lv", "27015", "Arena", message);
};

module.exports.config = {
       name: "arena",
       aliases: ["am"]
}