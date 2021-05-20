const f = require('../../functions/bases/serversBaseEmbed.js');

module.exports.run = async (bot, message, args) => {
       message.delete();
       f.createMTADayZEmbed("mtasa", "51.255.215.248", "23004", "MTA DayZ", message);
};

module.exports.config = {
       name: "mtadayz",
       aliases: ["dayz"],
};
