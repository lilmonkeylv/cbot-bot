const createNSFWEmbed = require('../../functions/bases/nsfwBaseEmbed.js');

module.exports.run = async (bot, message, args) => {
       message.delete();
       createNSFWEmbed("ass", message, bot);
};

module.exports.config = {
    name: "ass",
    usage: "ass",
    category: "nsfw",
    description: "NSFW Command",
    aliases: ["booty"]
}