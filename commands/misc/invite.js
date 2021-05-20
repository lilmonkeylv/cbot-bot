const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
       message.delete();
       bot.generateInvite({
              permissions: ['ADMINISTRATOR'],
       }).then(link => {
              let embed = new Discord.MessageEmbed()
              .setTitle("Click me!")
              .setURL(link)
              .setColor(bot.colors.d_blue)
              .setFooter(`${message.author.username}`, message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 }));
              message.channel.send(embed).then(m => m.delete({timeout: 8000}));
       });
          
};

module.exports.config = {
       name: "invite",
       aliases: ["botinvite"]
}