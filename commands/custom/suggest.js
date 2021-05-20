const { MessageEmbed } = require('discord.js');
const chillMainID = "538820484913954847"; // CHILL.LV MAIN DISCORD ID
let suggestionChannelID = "836013735310393374"; // CHILL.LV MAIN DISCORD SUGGESTION CHANNEL ID

module.exports.run = async (bot, message, args) => {
       if (message.guild.id !== chillMainID) return;

       let suggestionChannel = bot.channels.cache.get(suggestionChannelID);
       if (!suggestionChannel || suggestionChannel === undefined) return message.reply("suggestion channel was not found, please contact \`lilmonkey#1210\`.").then(m => m.delete({timeout: 15000}));

       message.delete();

       let argList = args.join(" ");
       if (!argList) return message.reply("please specify a suggestion!").then(m => m.delete({timeout: 15000}));

       let embed = new MessageEmbed()
       .setDescription(argList)
       .setColor(bot.colors.d_blue)
       .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
       .setTimestamp(new Date())

       message.reply(`your suggestion has been submitted successfully!`).then(m => m.delete({timeout: 15000}));
       suggestionChannel.send(embed).then(msg = async (msg) => {
              await msg.react('<a:atickgreen:818916828670590977>')
              await msg.react('<a:atickred:818916829220700200>')
       });
};

module.exports.config = {
       name: "suggest",
       aliases: ["suggest"]
};