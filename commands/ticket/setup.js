module.exports.run = async (bot, message, args) => {
       message.delete();

       
       let helpChannelMessage = args.slice(2).join(" ");
       let channelName = args[0];
       
       if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You don't have access to this command!").then(m => m.delete({timeout: 15000}));
       if (bot.settings.get(`${message.guild.id}-tickets`) === false || !bot.settings.get(`${message.guild.id}-tickets`)){ return message.reply("The ticket system has been turned off for this server, contact an administrator!").then(m => m.delete({timeout: 5000})); }
       if(!message.guild) return;
       let prefix = bot.settings.get(`${message.guild.id}-prefix`);
       
       let roleName = args[1];
       let role = message.guild.roles.cache.find(x => x.name == roleName);
       let helpChannel = message.guild.channels.cache.find(x => x.name == channelName)
       if(!roleName) return message.reply(`please provide a name for the support team role!`).then(m => m.delete({timeout: 5000}))
       if(!role) {
           if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I don't have the permission for this command!").then(m => m.delete({timeout: 5000}))
       
              message.guild.roles.create({
                     data: {
                            name: roleName,
                            color: bot.colors.magenta,
                     },
                     reason: 'Support Team role, was not found',
              }).then(() => {
                     bot.tickets.set(`${message.guild.id}-support-role`, role.id)

              }).catch(console.error);
       } else  {
              message.channel.send("Your server already has a Support Team role!").then(m => m.delete({timeout: 15000}));
       }
       if(!helpChannelMessage) {
              message.channel.send("Please specify a message to send in the help channel!").then(m => m.delete({timeout: 15000}));
       } else {

              if(!helpChannel) {
                     if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("I don't have the permission for this command!").then(m => m.delete({timeout: 5000}))

                     message.guild.channels.create(channelName, {
                            type: 'text',
                            topic: `Type ${prefix}new to make a ticket, don't create two tickets!`,
                     }).then(channel => channel.send(helpChannelMessage))
              } else {
                     message.channel.send("This server already has that channel!").then(m => m.delete({timeout: 15000}));
              };
       };     
};

module.exports.config = {
       name: "setup",
       aliases: ["ticket-setup"]
}