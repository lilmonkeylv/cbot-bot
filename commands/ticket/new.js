const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
       message.delete();
       
       if (bot.settings.get(`${message.guild.id}-tickets`) === false || !bot.settings.get(`${message.guild.id}-tickets`)){ return message.reply("The ticket system has been turned off for this server, contact an administrator!").then(m => m.delete({timeout: 5000}));; }
       let reason = args.join(" ");
       if(!reason) reason = "No reason specified."
       
       if(!message.guild) return;
       const TicketChannel = message.guild.channels.cache.find(c => c.name == (`ticket-${message.author.username}`));
       if(TicketChannel) return message.channel.send("You already have a ticket!").then(m => m.delete({timeout: 15000}));

       let prefix = bot.settings.get(`${message.guild.id}-prefix`);

       let roleName = bot.tickets.get(`${message.guild.id}-support-role`);
       let role = message.guild.roles.cache.find(x => x.name == roleName);

       if(!role) {
              if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I don't have the permission for this command!").then(m => m.delete({timeout: 5000}))

              message.channel.send("This guild does not have a Support Team role, making one for you! 😉").then(m => m.delete({timeout: 15000}))

              message.guild.roles.create({
                     data: {
                            name: 'Support Team',
                            color: bot.colors.magenta,
                     },
                     reason: 'Support Team role, was not found',
              }).then(() => { bot.tickets.set(`${message.guild.id}-support-role`, role.id) }).catch(console.error);
              message.channel.send(`Type **${prefix}new** to make a ticket!`).then(m => m.delete({timeout: 15000}));

       } else {
              message.guild.channels.create(`ticket-${message.author.username}`, { type: 'text' }).then(c => {
       
                     c.overwritePermissions([
                            {
                                   id: message.author.id,
                                   allow: ['SEND_MESSAGES', 'ADD_REACTIONS', 'VIEW_CHANNEL'],
                            },
                            {
                                   id: role.id,
                                   allow: ['SEND_MESSAGES', 'ADD_REACTIONS', 'VIEW_CHANNEL']
                            },
                            {
                                   id: c.guild.roles.everyone,
                                   deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                            }
                     ], 'tickets.');
                     message.channel.send(`<@${message.author.id}> your ticket was created at: <#${c.id}>. <:yeahboi:818916827307966495>`).then(m => m.delete({timeout: 1500}));

                     const embed = new MessageEmbed()
                     .setColor(bot.colors.magenta)
                     .addField(`**${message.author.username}** made this ticket with the reason:`, reason, true)
                     .setTimestamp(new Date())
                     .setFooter(bot.user.username, bot.user.displayAvatarURL());
                     c.send(`<@&${role.id}>, <@${message.author.id}>`)
                     c.send(embed);

                     let newCommandEmbed = new MessageEmbed()
                     .setDescription(`<@${message.author.id}> has opened a ticket at: <#${c.id}> (**${c.name}**) with the reason: ${reason}`)
                     .setColor(bot.colors.d_blue)
                     .setTimestamp(new Date())
                     .setFooter(bot.user.username, bot.user.avatarURL());

                     let logsChan = bot.settings.get(`${message.guild.id}-ticketlog`)
                     if(!logsChan) return;

                     let logsChat = bot.channels.cache.get(logsChan)
                     logsChat.send(newCommandEmbed)

              }).catch(console.error);
       }
};

module.exports.config = {
       name: "new",
       aliases: [""]
}