const createNSFWEmbed = require('../../functions/bases/nsfwBaseEmbed.js');

module.exports.run = async (bot, message, args) => {
       message.delete();
       createNSFWEmbed("thigh", message, bot);
};

module.exports.config = {
    name: "thigh",
    usage: "thigh",
    category: "nsfw",
    description: "NSFW Command",
    aliases: ["legs"]
}