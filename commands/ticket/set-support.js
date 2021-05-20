module.exports.run = async (bot, message, args) => {
       message.delete();

       if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You don't have access to this command!").then(m => m.delete({timeout: 15000}));
       if (bot.settings.get(`${message.guild.id}-tickets`) === false || !bot.settings.get(`${message.guild.id}-tickets`)){ return message.reply("The ticket system has been turned off for this server, contact an administrator!").then(m => m.delete({timeout: 5000}));; }

       bot.tickets.set(`${message.guild.id}-support-role`, role.id)
       return message.reply(`Support Team role set as ${role} for this server!`)

};

module.exports.config = {
       name: "set-support",
       aliases: ["ticket-support"]
}