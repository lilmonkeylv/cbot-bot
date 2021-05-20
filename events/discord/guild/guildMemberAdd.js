const { MessageEmbed } = require('discord.js');

module.exports = async (bot, member) => {
       if (!member.guild) return;
       const autoRole = bot.settings.get(`${member.guild.id}-autorole`)
       const memberLog = bot.settings.get(`${member.guild.id}-memberlog`)

       if (autoRole){
              member.roles.add(autoRole);
       } else if (memberLog){
              let embed = new MessageEmbed()
              .setColor(bot.colors.d_blue)
              .setAuthor(`Member joined`, member.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true, size: 1024 }))
              .setDescription(`${member} ${member.user.tag}`)
              .setThumbnail(member.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true, size: 1024 }))
              .setTimestamp(new Date())
              .setFooter(`ID: ${member.user.id}`)

              let logsChat = bot.channels.cache.get(memberLog);
              logsChat.send(embed).catch(error => { });
       } else return;
}