const { web_red } = require('../../../configs/colors.json');
const { MessageEmbed } = require('discord.js');

module.exports = async (bot, member) => {
       if (!member.guild) return;
       const memberLog = bot.settings.get(`${member.guild.id}-memberlog`)
       if(!memberLog) return;
       const roles = member.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1);
       function trimArray(arr, maxLen = 20) {
		if (arr.length > maxLen) {
			const len = arr.length - maxLen;
			arr = arr.slice(0, maxLen);
			arr.push(`${len} more...`);
		}
		return arr;
	};

	let embed = new MessageEmbed()
	.setColor(web_red)
	.setAuthor(`Member left`, member.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true, size: 1024 }))
       .setDescription(`${member} ${member.user.tag}`)
       .addField("Roles " + "[" + roles.length + "]:", roles.length < 10 ? roles.join(', ') : roles.length > 20 ? trimArray(roles) : 'None')
       .setThumbnail(member.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true, size: 1024 }))
       .setTimestamp(new Date())
       .setFooter(`ID: ${member.user.id}`)
              
       let logsChat = bot.channels.cache.get(memberLog)
       logsChat.send(embed).catch(error => { });
}