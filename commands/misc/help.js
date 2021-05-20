const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports.run = async (bot, message, args) => {
       message.delete();

       let prefix = bot.settings.get(`${message.guild.id}-prefix`);

       let dmEmbed = new MessageEmbed()
       .setDescription(`<@${message.author.id}> check your DMs!`)
       .setFooter(bot.user.username, bot.user.displayAvatarURL())
       .setTimestamp(new Date())
       .setColor(bot.colors.d_blue)
       

       if(!args[0]){
              message.channel.send(dmEmbed).then(m => m.delete({timeout: 15000}))

              const embed = new MessageEmbed()
              .setColor(bot.colors.d_blue)
              .setAuthor(`${message.guild.me.displayName} Help`, bot.user.displayAvatarURL())
              .setDescription(stripIndents`\`${message.guild.me.displayName}\` Help message.
              Bot prefix is: \`${prefix}\`
              Visit our [homepage](https://cbot.chill.lv) to see all the available commands. (__Might be out of date!__)`)
              .setFooter(`CBot © | Command amount: ${bot.commands.size}`, bot.user.displayAvatarURL())
              .setTimestamp(new Date());
              
              message.author.send(embed)
       }
}

module.exports.config = {
       name: "help",
       aliases: [""],
}