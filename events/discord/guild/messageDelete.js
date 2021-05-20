const { web_red } = require('../../../configs/colors.json');
const { MessageEmbed } = require('discord.js');

module.exports = async (bot, message) => {
       
       if (!message.guild) return;
       const channel = bot.settings.get(`${message.guild.id}-msglog`)
       if(!channel) return;

	const attachments = message.attachments.size ? message.attachments.map(attachment => attachment.proxyURL) : null;
	const embed = new MessageEmbed()
		.setColor(web_red)
		.setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'png' || 'gif', dynamic: true, size: 1024 }))
              if(!attachments){
                     embed.setDescription(`**Message sent by <@${message.author.id}> was deleted in** ${message.channel}\n${message.content}`);
              } else {
                     embed.setDescription(`**Message sent by <@${message.author.id}> was deleted in** ${message.channel}\n${attachments ? `**» Attachments:** ${attachments.join('\n')}` : ''}\n${message.content}`)
                     embed.setImage(attachments)
              };
              embed.setTimestamp(new Date())
              embed.setFooter(`Author ID: ${message.author.id} | Message ID: ${message.id}`)
              
	
       let logsChat = bot.channels.cache.get(channel)
       logsChat.send(embed).catch(() => false);
}