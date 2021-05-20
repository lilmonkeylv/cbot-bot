const createNSFWEmbed = require('../../functions/bases/nsfwBaseEmbed.js');

module.exports.run = async (bot, message, args) => {
       message.delete();
       createNSFWEmbed("pussy", message, bot);
};

module.exports.config = {
    name: "pussy",
    usage: "pussy",
    category: "nsfw",
    description: "NSFW Command",
    aliases: ["vagina"]
}