const { MessageEmbed } = require('discord.js');

module.exports = async (bot, channel) => {
       if (!channel.guild) return;
       const channelLog = bot.settings.get(`${channel.guild.id}-channellog`)
       if(!channelLog) return;

	let embed = new MessageEmbed()
	.setColor(bot.colors.d_blue)
	.setAuthor(channel.guild.name, channel.guild.iconURL({ format: 'png' || 'gif', dynamic: true, size: 1024 }))
       .setDescription(`**Channel created: ${channel.name}**`)
       .setTimestamp(new Date())
       .setFooter(`Channel ID: ${channel.id}`)
              
       let logsChat = bot.channels.cache.get(channelLog)
       logsChat.send(embed).catch(error => { });
}