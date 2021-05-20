const { MessageEmbed } = require('discord.js');

module.exports = async (bot, oldMember, newMember) => {
       if (!oldMember.guild || !newMember.guild) return;

       if (newMember && oldMember && newMember.nickname !== oldMember.nickname){
              const nickLog = bot.settings.get(`${oldMember.guild.id}-nicklog`)
              if(!nickLog) return;

              let nickLogEm = new MessageEmbed()
              .setColor(bot.colors.d_blue)
              .setAuthor(newMember.user.tag, newMember.user.avatarURL({ format: 'png' || 'gif', dynamic: true, size: 1024 }))
              .setDescription(`**${newMember} nickname changed**`)
              .addField("Before:", `${oldMember.nickname ? oldMember.nickname : "None"}`)
              .addField("After:", `${newMember.nickname ? newMember.nickname : "None"}`)
              .setTimestamp(new Date())
              .setFooter(`User ID: ${newMember.id}`)
                     
              let NickLog = bot.channels.cache.get(nickLog)
              return NickLog.send(nickLogEm).catch(error => { console.log(error) });
       } else return;
}