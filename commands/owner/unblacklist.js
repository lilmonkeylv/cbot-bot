module.exports.run = async(bot, message, args) => {
       message.delete();
       if(message.author.id != "286540906335830017") return message.reply("Hell to the no :)").then(m => m.delete({timeout: 10000}));

       let user = await bot.users.cache.get(args[0]);
       if(!user) return message.channel.send(`Invalid User or ID was provided`).then(m => m.delete({timeout: 10000}));

       let fetched = bot.blacklist.get(`${user.id}-blacklist`)
       if(!fetched) {
              return message.channel.send(`The user is not blacklisted!`).then(m => m.delete({timeout: 10000}));
       } else {
              bot.prefixes.delete(`${user.id}-blacklist`)
              message.channel.send(`The user was unblacklisted.`).then(m => m.delete({timeout: 10000}));
       }
}

module.exports.config = {
       name: "unblacklist",
       aliases: ["whitelist"]
}