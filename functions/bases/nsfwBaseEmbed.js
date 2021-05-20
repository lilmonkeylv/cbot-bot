const { MessageEmbed } = require("discord.js");
const get = require('axios')
const chillMain = '538820484913954847';
const chillDayz = '739465517814775868';

function createNSFWEmbed(nsfwType,message,bot){
       
       if(message.guild.id === chillMain || message.guild.id === chillDayz){
              return message.reply("Not here!").then(m => m.delete({timeout: 15000}));
       };

       let nsfwOnly = new MessageEmbed()
       .setColor(bot.colors.red)
       .setDescription("You may only use this command in NSFW marked channels!")
       .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }));

       let errorEmbed = new MessageEmbed()
       .setColor(bot.colors.red)
       .setDescription("Someone shat itself... 😢")
       .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }));

       if (!message.channel.nsfw) {
              return message.channel.send(nsfwOnly);
       };

       get(`https://nekobot.xyz/api/image?type=${nsfwType}`).then(res => {
		const nsfwEmbed = new MessageEmbed()
              .setAuthor(`${bot.user.username} ${nsfwType} 🥵`, bot.user.displayAvatarURL())
		.setImage(res.data.message)
              .setColor(bot.colors.d_blue)
              .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
              .setTimestamp(new Date());

	       message.channel.send(nsfwEmbed);
       }).catch((err) => {
              message.channel.send(errorEmbed);
       });
};
module.exports = createNSFWEmbed;