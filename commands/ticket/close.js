const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
       message.delete();

       if (bot.settings.get(`${message.guild.id}-tickets`) === false || !bot.settings.get(`${message.guild.id}-tickets`)){ return message.reply("The ticket system has been turned off for this server, contact an administrator!").then(m => m.delete({timeout: 5000}));; }
       if(!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You may only use this command inside a ticket.`);

       if(!message.guild) return;
       let prefix = bot.settings.get(`${message.guild.id}-prefix`);

       let logsChan = bot.settings.get(`${message.guild.id}-ticketlog`)

       let closeCommandEmbed = new MessageEmbed()
       .setDescription(`<@${message.author.id}> has closed **${message.channel.name}**.`)
       .setColor(bot.colors.d_blue)
       .setTimestamp(new Date())
       .setFooter(bot.user.username, bot.user.avatarURL());

       let logsChat = bot.channels.cache.get(logsChan)

       message.channel.send(`Are you sure you want to close the ticket? Type **${prefix}confirm** to confirm! (You have 10 seconds!)`).then((m) => {
              message.channel.awaitMessages(response => response.content === `${prefix}confirm`, {
                     max: 1,
                     time: 10000,
                     errors: ['time'],
              }).then((collected) => {
                     message.channel.delete();
                     if(!logsChan) return; else logsChat.send(closeCommandEmbed);
              }).catch(() => {
                     m.edit('I shat myself, unable to close the ticket.').then(m2 => {
                            m2.delete();
                     }, 3000);
              });
       });    
}

module.exports.config = {
       name: "close",
       aliases: [""]
}