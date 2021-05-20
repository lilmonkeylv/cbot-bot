const { MessageEmbed } = require('discord.js');

module.exports = async (bot, emoji) => {
       if (!emoji.guild) return;
       const emojiLog = bot.settings.get(`${emoji.guild.id}-emojilog`)
       if(!emojiLog) return;

	let embed = new MessageEmbed()
	.setColor(bot.colors.d_blue)
	.setAuthor(emoji.guild.name, emoji.guild.iconURL({ format: 'png' || 'gif', dynamic: true, size: 1024 }))
       .setDescription(`**Emoji created: ${emoji.name}**`)
       .setTimestamp(new Date())
       .setThumbnail(emoji.url)
       .setFooter(`Emoji ID: ${emoji.id}`)
              
       let logsChat = bot.channels.cache.get(emojiLog)
       logsChat.send(embed).catch(error => { });
}