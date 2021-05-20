const { MessageEmbed } = require('discord.js');

module.exports.run = async(bot, message, args) => {
       message.delete();

       if (bot.settings.get(`${message.guild.id}-points`) === false || !bot.settings.get(`${message.guild.id}-points`)){ return message.reply("The point system has been turned off for this server, contact an administrator!").then(m => m.delete({timeout: 5000})); }

       const user = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.find(m => m.user.username === args[0]) || message.guild.members.cache.get(args[0]) || message.member || message.author;
       const key = `${message.guild.id}-${user.id}`;
       const pointAmount = bot.points.get(key, "points");
       const lvlAmount = bot.points.get(key, "level");

       const embed = new MessageEmbed()
       .setColor(bot.colors.d_blue)
       .setFooter(message.author.username, bot.MSGauthorIMG)
       .setTimestamp(new Date())
       if(user === message.member || user === message.author){
              embed.setDescription(`**You currently have \`${pointAmount}\` points and \`${lvlAmount}\` level!**`);
       } else {
              embed.setDescription(`${user} **currently has \`${pointAmount}­\` points and \`${lvlAmount}\` level!**`);
       };

       try {
              if(!bot.points.get(key)) return message.reply('something went wrong, maybe the user doesn\'t have points?').then(m => m.delete({timeout: 15000}));
              message.channel.send(embed).then(m => m.delete({timeout: 15000}));
       }catch(error){
              if(err === `EnmapPathError: The key "${message.guild.id}-${user.id}" does not exist in the enmap "points"` || user === message.member || user === message.author) {
                     return message.reply(`you don't have any points!`).then(m => m.delete({timeout: 15000}));
              } else {
                     return message.reply(`${user} doesn't have any points!`).then(m => m.delete({timeout: 15000}));
              };
       };
};

module.exports.config = {
       name: "points",
       aliases: ["pts", "level", "lvl"]
};