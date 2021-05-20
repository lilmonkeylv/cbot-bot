const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
       message.delete();

       if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have access to this command!").then(m => m.delete({timeout: 15000}));

       let mChannel = message.mentions.channels.first();

       if(mChannel) {
              args = args.slice(1).join(" ")

              let embed = new MessageEmbed()
              .setColor(bot.colors.d_blue)
              .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
              .setTimestamp(new Date())
              if(args === 1) embed.setDescription(`Channel slowmode has been set to **${args}** second by <@${message.author.id}>`); else embed.setDescription(`Channel slowmode has been set to **${args}** seconds by <@${message.author.id}>`);
              if(args === 0 || args === "off") {
                     embed.setDescription(`Channel slowmode has been disabled by <@${message.author.id}>!`); 
                     message.channel.setRateLimitPerUser(0) 
                     return message.channel.send(embed).then(m => m.delete({timeout: 15000}));
              }

              if(args > 21600 || isNaN(args)) {
                     return message.reply("Invalid time specified, you may set the slowmode for 21600 seconds at max.").then(m => m.delete({timeout: 15000}));
              } else {
                     mChannel.setRateLimitPerUser(args)
                     mChannel.send(embed).then(m => m.delete({timeout: 15000}));
              }
       } else {
              args = args.join(" ")
              
              let embed = new MessageEmbed()
              .setColor(bot.colors.d_blue)
              .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
              .setTimestamp(new Date())
              if(args === 1) embed.setDescription(`Channel slowmode has been set to **${args}** second by <@${message.author.id}>`); else embed.setDescription(`Channel slowmode has been set to **${args}** seconds by <@${message.author.id}>`);
              if(args === 0 || args === "off") {
                     embed.setDescription(`Channel slowmode has been disabled by <@${message.author.id}>!`); 
                     message.channel.setRateLimitPerUser(0) 
                     return message.channel.send(embed).then(m => m.delete({timeout: 15000}));
              }

              if(args > 21600 || isNaN(args)) {
                     return message.reply("Invalid time specified, you may set the slowmode for 21600 seconds at max.").then(m => m.delete({timeout: 15000}));
              } else {
                     message.channel.setRateLimitPerUser(args)
                     message.channel.send(embed).then(m => m.delete({timeout: 15000}));
              }
       }
}

module.exports.config = {
       name: "slowmode",
       aliases: [""]
}