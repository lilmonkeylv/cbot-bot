const createNSFWEmbed = require('../../functions/bases/nsfwBaseEmbed.js');

module.exports.run = async (bot, message, args) => {
       message.delete();
       createNSFWEmbed("4k", message, bot);
};

module.exports.config = {
    name: "4k",
    aliases: [""]
}