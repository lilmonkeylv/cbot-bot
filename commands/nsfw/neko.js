const createNSFWEmbed = require('../../functions/bases/nsfwBaseEmbed.js');

module.exports.run = async (bot, message, args) => {
       message.delete();
       createNSFWEmbed("neko", message, bot);
};

module.exports.config = {
    name: "neko",
    aliases: [""]
}