const { web_red } = require('../../../configs/colors.json');
const { MessageEmbed } = require('discord.js');

module.exports = async (bot, channel) => {
       if (!channel.guild) return;
       const channelLog = bot.settings.get(`${channel.guild.id}-channellog`)
       if(!channelLog) return;

	let embed = new MessageEmbed()
	.setColor(web_red)
	.setAuthor(channel.guild.name, channel.guild.iconURL({ format: 'png' || 'gif', dynamic: true, size: 1024 }))
       .setDescription(`**Channel deleted: ${channel.name}**`)
       .setTimestamp(new Date())
       .setFooter(`Channel ID: ${channel.id}`)
              
       let logsChat = bot.channels.cache.get(channelLog)
       logsChat.send(embed).catch(error => { });
}