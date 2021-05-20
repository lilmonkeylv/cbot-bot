const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
       message.delete();
       
       let choices = ["Is this really my ping? 😯", "Is it okay? I can't look 🙈", "I hope it isn't bad 😶"];
       let response = choices[Math.floor(Math.random() * choices.length)];

              let izmera = new MessageEmbed()
              .setDescription(response)
              .setFooter(bot.user.username, bot.user.displayAvatarURL())
              .setTimestamp(new Date())
              .setColor(bot.colors.d_blue)

       message.channel.send(izmera).then(m => {
              let apiLatency = Math.round(bot.ws.ping);
              let botLatency = m.createdTimestamp - message.createdTimestamp;

              let embed = new MessageEmbed()
              .setDescription(`My latency is: **${botLatency}**ms \nAPI latency is: **${apiLatency}**ms`)
              .setColor(bot.colors.d_blue)
              .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
              .setTimestamp(new Date())

              m.edit(embed).then(m => m.delete({timeout: 20000}))
       });
};

module.exports.config = {
       name: "ping",
       aliases: ["pingo"]
};