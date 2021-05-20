const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
       message.delete(); 
   
       if (bot.settings.get(`${message.guild.id}-tickets`) === false || !bot.settings.get(`${message.guild.id}-tickets`)){ return message.reply("The ticket system has been turned off for this server, contact an administrator!").then(m => m.delete({timeout: 5000}));; }
       if(!message.guild) return;
       let prefix = bot.settings.get(`${message.guild.id}-prefix`);
       let roleName = bot.tickets.get(`${message.guild.id}-support-role`);

       if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You may only use this command inside a ticket.`);
       if (!message.member.roles.cache.find(r => r.name === roleName)) return message.channel.send("You don't have access to this command!").then(m => m.delete({timeout: 1500}));

              let argList = args.join(" "); 
              if (!argList) return message.channel.send(`Proper usage: \`${prefix}add @User\`!`)

              let userAdd = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.find(m => m.user.username === args[0]) || message.guild.members.cache.get(args[0]);
              if(!userAdd) return message.channel.send("Specified user, was not found.")
       
              let AddedEmbed = new MessageEmbed()
              .setColor(bot.colors.magenta)
              .setDescription(`<@${message.author.id}> has added <@${userAdd.id}> to this ticket`)
              .setTimestamp(new Date())
              .setFooter(bot.user.username, bot.user.displayAvatarURL());
              message.channel.updateOverwrite(userAdd, {
                     SEND_MESSAGES: true,
                     VIEW_CHANNEL: true
              });
              message.channel.send(AddedEmbed);


              let logsChan = bot.settings.get(`${message.guild.id}-ticketlog`)
              if(!logsChan) return;

              let addCommandEmbed = new MessageEmbed()
              .setDescription(`<@${message.author.id}> has added <@${userAdd.id}> to <#${message.channel.id}> (**${message.channel.name}**).`)
              .setColor(bot.colors.d_blue)
              .setTimestamp(new Date())
              .setFooter(bot.user.username, bot.user.avatarURL());

              let logsChat = bot.channels.cache.get(logsChan)
              logsChat.send(addCommandEmbed)
}

module.exports.config = {
       name: "add",
       aliases: [""]
}