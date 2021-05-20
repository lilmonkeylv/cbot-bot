const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
       message.delete();
       if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have access to this command!").then(m => m.delete({timeout: 150000}));

       const amount = parseInt(args.slice(0).join(" "));
       if (!amount) return message.reply("Please specify a number!").then(m => m.delete({timeout: 5000}))
       
       let embed = new MessageEmbed()
       .setDescription(`Deleting **${amount}** messages! <a:ablobtrash:818916829048209458>`)
       .setColor(bot.colors.red)
       .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
       .setTimestamp(new Date())
       if(amount == 1) embed.setDescription(`Deleting **${amount}** message! <a:ablobtrash:818916829048209458>`)
       if(!amount) return message.reply('Specify a number!').then(m => m.delete({timeout: 5000}))
       if(amount > 100) return message.reply(`You can't delete more than 100 messages!`).then(m => m.delete({timeout: 5000}))
       if(amount < 1) return message.reply(`You can't delete less than 1 message!`).then(m => m.delete({timeout: 5000}))

       message.channel.send(embed).then(m => m.delete({timeout: 2000}))

       setTimeout(() => { message.channel.bulkDelete(amount, true).then(() => {
       }) }, 2500)
};

module.exports.config = {
    name: "purge",
    usage: "purge <Number from 1-100>",
    description: "Bulkdeletes the specified amount of messages",
    category: "moderation",
    aliases: ["clear", "p"]
}
