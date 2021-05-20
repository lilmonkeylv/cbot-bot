const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
       message.delete();

       if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have access to this command!").then(m => m.delete({timeout: 150000}));

       let jaut = args.join(" ");
       if(!jaut) return message.reply("Please specify a question.")

       let poll = new MessageEmbed()
       .setDescription(jaut)
       .setAuthor(`Made by ${message.author.username}`, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
       .setFooter(`Use the reactions below.`, bot.user.displayAvatarURL())
       .setTimestamp(new Date())
       .setColor(bot.colors.d_blue)
       
       message.channel.send(poll).then(msg = async (msg) => {
           await msg.react('<a:atickgreen:818916828670590977>')
           await msg.react('<a:atickred:818916829220700200>')
       });  
};

module.exports.config = {
       name: "poll",
       aliases: [""]
}