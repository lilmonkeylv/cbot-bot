const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
       message.delete(); 
   
       if (bot.settings.get(`${message.guild.id}-tickets`) === false || !bot.settings.get(`${message.guild.id}-tickets`)){ return message.reply("The ticket system has been turned off for this server, contact an administrator!").then(m => m.delete({timeout: 5000}));; }

       if(!message.guild) return;
       
       if(!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You may only use this command inside a ticket.`);
              let argList = args.join(" "); 
              let prefix = bot.settings.get(`${message.guild.id}-prefix`);
              if (!argList) return message.channel.send(`Proper usage: \`${prefix}remove @User\`!`)

              let userDel = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.find(m => m.user.username === args[0]) || message.guild.members.cache.get(args[0]);
              if(!userDel) return message.channel.send("Specified user, was not found.")
       
              let AddedEmbed = new MessageEmbed()
              .setColor(bot.colors.magenta)
              .setDescription(`<@${message.author.id}> has removed <@${userDel.id}> from this ticket`)
              .setTimestamp(new Date())
              .setFooter(bot.user.username, bot.user.displayAvatarURL())

              message.channel.send(AddedEmbed);
              message.channel.updateOverwrite(userDel, {
                     SEND_MESSAGES: false,
                     VIEW_CHANNEL: false
              });

              let logsChan = bot.settings.get(`${message.guild.id}-ticketlog`)
              if(!logsChan) return;

              let removeCommandEmbed = new MessageEmbed()
              .setDescription(`<@${message.author.id}> has removed <@${userDel.id}> from <#${message.channel.id}> (**${message.channel.name}**).`)
              .setColor(bot.colors.d_blue)
              .setTimestamp(new Date())
              .setFooter(bot.user.username, bot.user.avatarURL());

              let logsChat = bot.channels.cache.get(logsChan)
              logsChat.send(removeCommandEmbed)
}

module.exports.config = {
       name: "remove",
       aliases: ["deluser"]
}