const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const { default_prefix } = require('../../configs/config.json')

module.exports.run = async (bot, message, args) => {
       message.delete();

       if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You don't have access to this command!").then(m => m.delete({timeout: 15000}));

       let prefix = bot.settings.get(`${message.guild.id}-prefix`)
       if(!prefix) prefix = default_prefix;

       let embed = new MessageEmbed()
       .setColor(bot.colors.d_blue)
       .setDescription(stripIndents`Use **${prefix}autorole @Role** to set a a role to add on autorole!
       Use **${prefix}autorole remove** to remove autorole.
       For help join our [**support server**](https://discord.gg/sySpTPbjJe)!`)
       .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
       .setTimestamp(new Date())

       let role = message.mentions.roles.first();
       let Role = bot.settings.get(`${message.guild.id}-autorole`)
       if(args[0] === "help") return message.channel.send(embed).then(m => m.delete({timeout: 15000}));
       if(args[0] === "delete" || args[0] === "remove"){
              bot.settings.delete(`${message.guild.id}-autorole`)
              return message.channel.send("Removed autorole.");
       };
       if(!role || role === undefined) return message.reply("No or invalid role was specified!");
       if(!Role) bot.settings.set(`${message.guild.id}-autorole`, role.id);
       message.reply(`Autorole has been set as ${role}!`).then(m => m.delete({timeout: 7500}));
};

module.exports.config = {
       name: "autorole",
       aliases: [""]
}