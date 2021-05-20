module.exports.run = async (bot, message, args) => {
       message.delete();
       let member = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.find(m => m.user.username === args[0]) || bot.users.cache.get(args[0])
       if(message.author.id != "286540906335830017") return message.reply("You are not the bot owner.").then(m => m.delete({timeout: 10000}));

       const ziņa = args.slice(1).join(" ")
              member.send(ziņa).catch(error => {     
       });

}

module.exports.config = {
       name: "pm",
       aliases: ["pmone"]
}