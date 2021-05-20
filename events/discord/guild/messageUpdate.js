const { MessageEmbed } = require('discord.js');

module.exports = async (bot, message, old) => {
       
       if (!message.guild || old.content === message.content) return;
       const channel = bot.settings.get(`${message.guild.id}-msglog`)
       if(!channel) return;

       const embed = new MessageEmbed()
       .setColor(bot.colors.d_blue)
       .setAuthor(old.author.tag, old.author.displayAvatarURL({ format: 'png' || 'gif', dynamic: true, size: 1024 }))
       .setDescription(`**Message edited in ${old.channel}** - [**Jump to message**](${message.url})`)
       .addField("Before:", message.content)
       .addField("After:", old.content)
       .setTimestamp(new Date())
       .setFooter(`Author ID: ${old.author.id} | Message ID: ${message.id}`)

	
       let logsChat = bot.channels.cache.get(channel)
       logsChat.send(embed).catch(() => false);
}