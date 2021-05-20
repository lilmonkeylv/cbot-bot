const { web_red } = require('../../../configs/colors.json');
const { MessageEmbed } = require('discord.js');

module.exports = async (bot, role) => {
       if (!role.guild) return;
       const roleLog = bot.settings.get(`${role.guild.id}-rolelog`)
       if (!roleLog) return;

	let embed = new MessageEmbed()
	.setColor(web_red)
	.setAuthor(`Role deleted`, role.guild.iconURL({ format: 'png' || 'gif', dynamic: true, size: 1024 }))
       .setDescription(`Name: \`${role.name}\`­`)
       .setTimestamp(new Date())
       .setFooter(`Role ID: ${role.id}`)
              
       let logsChat = bot.channels.cache.get(roleLog)
       logsChat.send(embed).catch(error => { });
}