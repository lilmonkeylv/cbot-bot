module.exports.run = async(bot, message, args) => {
       message.delete();
       if(message.author.id != "286540906335830017") return message.reply("Hell to the no :)").then(m => m.delete({timeout: 10000}));

       let user = await bot.users.cache.get(args[0]);
       if(!user) return message.channel.send(`Invalid ID was provided`).then(m => m.delete({timeout: 10000}));
       
       let fetched = bot.blacklist.get(`${user.id}-blacklist`)
       if(!fetched) {
              bot.blacklist.set(`${user.id}-blacklist`, true)
              message.channel.send(`The user was blacklisted!`).then(m => m.delete({timeout: 10000}));
       } else { 
              return message.channel.send(`The user is already blacklisted!`).then(m => m.delete({timeout: 10000}));
       }
}

module.exports.config = {
       name: "blacklist",
       aliases: [""]
}