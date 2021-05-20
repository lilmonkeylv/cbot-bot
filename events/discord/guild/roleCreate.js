const { MessageEmbed } = require('discord.js');

module.exports = async (bot, role) => {
       if (!role.guild) return;
       const roleLog = bot.settings.get(`${role.guild.id}-rolelog`)
       if (!roleLog) return;

	let embed = new MessageEmbed()
	.setColor(bot.colors.d_blue)
	.setAuthor(`Role created`, role.guild.iconURL({ format: 'png' || 'gif', dynamic: true, size: 1024 }))
       .setDescription(`Name: ${role}`)
       .setTimestamp(new Date())
       .setFooter(`Role ID: ${role.id}`)
              
       let logsChat = bot.channels.cache.get(roleLog)
       logsChat.send(embed).catch(error => { });
}