const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
       message.delete();

       if (bot.settings.get(`${message.guild.id}-points`) === false || !bot.settings.get(`${message.guild.id}-points`)){ return message.reply("The point system has been turned off for this server, contact an administrator!").then(m => m.delete({timeout: 5000})); }

       if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You don't have access to this command!").then(m => m.delete({timeout: 15000}));
       const user = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.find(m => m.user.username === args[0]) || message.guild.members.cache.get(args[0]) || message.member || message.author;

       const pointsToAdd = parseInt(args[1], 10);
       if(!pointsToAdd) return message.reply("You didn't tell me how many points to give...")

       bot.points.ensure(`${message.guild.id}-${user.id}`, {
              user: message.author.id,
              guild: message.guild.id,
              points: 0,
              level: 1
       });

       let userPoints = bot.points.get(`${message.guild.id}-${user.id}`, "points");
       userPoints += pointsToAdd;

       let embed = new MessageEmbed()
       .setColor(bot.colors.d_blue)
       .setDescription(`${user} **has received \`${pointsToAdd}\` points and now has a total of \`${userPoints}\` points!**`)
       .setFooter(message.author.username, bot.MSGauthorIMG)
       .setTimestamp(new Date())

       bot.points.set(`${message.guild.id}-${user.id}`, userPoints, "points")
       message.channel.send(embed).then(m => m.delete({timeout: 15000}));
};

module.exports.config = {
       name: "give-points",
       aliases: ["add-p", "ptgive"]
}