const { web_red } = require('../../../configs/colors.json');
const { MessageEmbed } = require('discord.js');

module.exports = async (bot, emoji) => {
       if (!emoji.guild) return;
       const emojiLog = bot.settings.get(`${emoji.guild.id}-emojilog`)
       if(!emojiLog) return;

	let embed = new MessageEmbed()
	.setColor(web_red)
	.setAuthor(emoji.guild.name, emoji.guild.iconURL({ format: 'png' || 'gif', dynamic: true, size: 1024 }))
       .setDescription(`**Emoji deleted: ${emoji.name}**`)
       .setTimestamp(new Date())
       .setFooter(`Emoji ID: ${emoji.id}`)
              
       let logsChat = bot.channels.cache.get(emojiLog)
       logsChat.send(embed).catch(error => { });
}