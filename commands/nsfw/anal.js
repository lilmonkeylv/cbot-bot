const createAnalEmbed = require('../../functions/bases/nsfwBaseEmbed.js');

module.exports.run = async (bot, message, args) => {
       message.delete();
       createAnalEmbed("anal", message, bot);
};

module.exports.config = {
    name: "anal",
    usage: "anal",
    category: "nsfw",
    description: "NSFW Command",
    aliases: ["analhole"]
}