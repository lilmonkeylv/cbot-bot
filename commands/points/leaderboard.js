const { MessageEmbed } = require('discord.js');

module.exports.run = async(bot, message, args) => {
       message.delete();

       if (bot.settings.get(`${message.guild.id}-points`) === false || !bot.settings.get(`${message.guild.id}-points`)){ return message.reply("The point system has been turned off for this server, contact an administrator!").then(m => m.delete({timeout: 5000}));; }

       const filtered = bot.points.filter(p => p.guild === message.guild.id).array();
       const sorted = filtered.sort((a, b) => b.points - a.points);
       const top10 = sorted.splice(0, 10);

       const embed = new MessageEmbed()
       .setAuthor(bot.user.username,bot.user.displayAvatarURL())
       .setDescription(`\`${message.guild.name}\` **Top 10 point leaderboard**!`)
       .setColor(bot.colors.d_blue)
       .setFooter(message.author.username, bot.MSGauthorIMG)
       .setTimestamp(new Date());

       for (const data of top10){
              const user = bot.users.cache.get(data.user);
              try {
                     embed.addField(user.tag, `${data.points} points (level ${data.level})`);
              } catch {
                     embed.addField(`${data.user.tag}`, `${data.points} points (level ${data.level})`);
              };
       };
       return message.channel.send({embed}).then(m => m.delete({timeout: 150000}));
}

module.exports.config = {
       name: "leaderboard",
       aliases: ["ptlead"]
}