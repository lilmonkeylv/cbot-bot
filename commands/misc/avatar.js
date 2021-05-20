const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
       message.delete();

       let member = message.mentions.members.first() || bot.users.cache.find(user => user.tag === args[0]) || bot.users.cache.find(user => user.username === args[0]) || bot.users.cache.get(args[0]) || message.member;
 
       let embed = new MessageEmbed()
       .setColor(bot.colors.d_blue)
       if (member === message.member){
              embed.setImage(message.member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
              embed.setAuthor(`${message.member.user.username} avatar.`, message.member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
              embed.setDescription(`[Link to the picture](${message.member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })})`)
              embed.setTimestamp(new Date())
              embed.setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
       } else {
              embed.setImage(member.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
              embed.setAuthor(`${member.username} avatar.`, member.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
              embed.setDescription(`[Link to the picture](${member.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })})`)
              embed.setTimestamp(new Date())
              embed.setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
       };
       
       message.channel.send(embed).then(m => m.delete({timeout: 15000}));
};

module.exports.config = {
       name: "avatar",
       aliases: ["image", "pfp"]
};