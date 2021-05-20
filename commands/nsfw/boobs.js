const createNSFWEmbed = require('../../functions/bases/nsfwBaseEmbed.js');

module.exports.run = async (bot, message, args) => {
       message.delete();
       createNSFWEmbed("boobs", message, bot);
};

module.exports.config = {
    name: "boobs",
    usage: "boobs",
    category: "nsfw",
    description: "NSFW Command",
    aliases: ["boobies"]
}