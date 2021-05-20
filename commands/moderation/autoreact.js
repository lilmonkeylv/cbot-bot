module.exports.run = async (bot, message, args) => {
       message.delete();

       if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You don't have access to this command!").then(m => m.delete({timeout: 15000}));

       let channel = message.mentions.channels.first();
       let reactChan = bot.settings.get(`${message.guild.id}-autoreact`) // get the id of the channel
       if(args[0] === "help") return message.channel.send(embed).then(m => m.delete({timeout: 15000}));
       if(args[0] === "delete" || args[0] === "remove"){
              bot.settings.delete(`${message.guild.id}-autoreact`)
              return message.channel.send("Removed autoreacting.");
       };
       if(!channel || channel === undefined) return message.reply("No or invalid channel was specified!")  // if channel is undefined return invalid
       if(!reactChan) bot.settings.set(`${message.guild.id}-autoreact`, channel.id); // if invalid set the channel
       message.reply(`Auto-reaction channel has been sucessfully set as ${channel}!`).then(m => m.delete({timeout: 7500})); // respond that it is set
};

module.exports.config = {
       name: "autoreaction",
       aliases: ["autoreact"]
}