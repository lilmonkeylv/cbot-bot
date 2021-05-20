const { MessageEmbed } = require('discord.js');

module.exports = async (bot, emoji) => {
       if (!emoji.guild) return;
       const emojiLog = bot.settings.get(`${newEmoji.guild.id}-emojilog`)
       if(!emojiLog) return;

	let embed = new MessageEmbed()
	.setColor(bot.colors.d_blue)
	.setAuthor(`Emoji updated`, newEmoji.guild.iconURL({ format: 'png' || 'gif', dynamic: true, size: 1024 }))
       .addField("Before", `${oldEmoji.name}`)
       .addField("After", `${newEmoji.name}`)
       .setTimestamp(new Date())
       .setThumbnail(newEmoji.url)
       .setFooter(`Emoji ID: ${newEmoji.id}`)
              
       let logsChat = bot.channels.cache.get(emojiLog)
       logsChat.send(embed).catch(error => { });
}