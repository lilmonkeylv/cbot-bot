const { web_red } = require('../../../configs/colors.json');
const { MessageEmbed } = require('discord.js');

module.exports = async (bot, guild, user) => {
       if (!user.guild) return;
       const banLog = bot.settings.get(`${guild.id}-banlog`)
       if(!banLog) return;

	let embed = new MessageEmbed()
	.setColor(web_red)
	.setAuthor(`Member banned`, user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true, size: 1024 }))
       .setDescription(`<@${user.id}> ${user.tag}`)
       .setThumbnail(user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true, size: 1024 }))
       .setTimestamp(new Date())
       .setFooter(`ID: ${user.id}`)
              
       let logsChat = bot.channels.cache.get(banLog)
       logsChat.send(embed).catch(error => { });
}