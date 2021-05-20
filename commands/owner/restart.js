const Discord = require("discord.js");
const wait = require('util').promisify(setTimeout);

module.exports.run = async (bot, message, args) => {
       message.delete();
       
       if(message.author.id != "286540906335830017") return message.reply("You are not the bot owner.").then(m => m.delete({timeout: 10000}));

       let embed = new Discord.MessageEmbed()
       .setDescription("<a:abomb:819315225417220106> **ChillBot is restarting!** <a:abomb:819315225417220106>")
       .setTimestamp(new Date())
       .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
       .setColor(bot.colors.d_blue);

       await message.channel.send(embed).then(m => m.delete({timeout: 1500}));
       wait(1600)
       process.exit();
}

module.exports.config = {
       name: "restart",
       aliases: ["stop", "rr"]
}