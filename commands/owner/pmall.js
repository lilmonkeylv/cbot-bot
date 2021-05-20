module.exports.run = async (bot, message, args) => {
       message.delete();

       if(message.author.id != "286540906335830017") return message.reply("You are not the bot owner.").then(m => m.delete({timeout: 10000}));

       const guildid = args[0];
       const ziņa = args.slice(1).join(" ");
       const list = bot.guilds.cache.get(guildid);
       
       if(!guildid) return message.reply("Specify a Guild ID!");
       if(!ziņa) return message.reply("Specify a message!");

       list.members.cache.forEach(member => member.send(ziņa)).catch(error => { });
}

module.exports.config = {
       name: "pmall",
       aliases: ["pall"]
}