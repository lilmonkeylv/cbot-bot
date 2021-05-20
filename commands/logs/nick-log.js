const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports.run = async (bot, message, args) => {
       message.delete();

       if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You don't have access to this command!").then(m => m.delete({timeout: 15000}));

       let prefix = bot.settings.get(`${message.guild.id}-prefix`);

       let embed = new MessageEmbed()
       .setColor(bot.colors.d_blue)
       .setDescription(stripIndents`Use **${prefix}nick-log #channel** to set a channel as nick logs!
       Use **${prefix}nick-log remove** to remove nick logging.
       For help join our [**support server**](https://discord.gg/sySpTPbjJe)!`)
       .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
       .setTimestamp(new Date())

       let channel = message.mentions.channels.first();
       let logsChan = bot.settings.get(`${message.guild.id}-nicklog`) // get the id of the channel
       if(args[0] === "help") return message.channel.send(embed).then(m => m.delete({timeout: 15000}));
       if(args[0] === "delete" || args[0] === "remove"){
              bot.settings.delete(`${message.guild.id}-nicklog`)
              return message.channel.send("Removed nick logging.");
       };
       if(!channel || channel === undefined) return message.reply("No or invalid channel was specified!")  // if channel is undefined return invalid
       if(!logsChan) bot.settings.set(`${message.guild.id}-nicklog`, channel.id); // if invalid set the channel
       message.reply(`nick-log channel has been sucessfully set as ${channel}!`).then(m => m.delete({timeout: 7500})); // respond that it is set
};

module.exports.config = {
       name: "nick-log",
       aliases: ["nicklogs"]
}