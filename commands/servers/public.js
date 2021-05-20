const f = require('../../functions/bases/serversBaseEmbed.js');

module.exports.run = async (bot, message, args) => {
       message.delete();
       f.createCSGOEmbed("csgo", "go.chill.lv", "27015", "Public", message);
};

module.exports.config = {
       name: "public",
       aliases: ["pub"]
}