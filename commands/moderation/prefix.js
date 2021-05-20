const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports.run = async (bot, message, args) => {
       message.delete();

       let prefix = bot.settings.get(`${message.guild.id}-prefix`);

       let embed = new MessageEmbed()
       .setColor(bot.colors.d_blue)
       .setTimestamp(new Date())
       .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
       .setDescription(stripIndents`The prefix for **\`${message.guild.name}\`** is **\`${prefix}\`**

       To set a new prefix, use ${prefix}prefix <prefix>
       To remove a prefix, use ${prefix}prefix %
       (Requires \`ADMINISTRATOR\` permissions)`)

       if(!args[0] || args[0] === "help") return message.channel.send(embed).then(m => m.delete({timeout: 15000}));

       if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You don't have access to this command!").then(m => m.delete({timeout: 15000}));

       if(args[1]) return message.channel.send("You can't use spaces in the prefix").then(m => m.delete({timeout: 15000}));
       if(args[0].length > 3) return message.channel.send("Prefix can't be bigger than 3 characters").then(m => m.delete({timeout: 15000}));
       if(args[0] === "%") {
              bot.settings.delete(`${message.guild.id}-prefix`)
              return await message.channel.send("Prefix has been reset to \`%\`!").then(m => m.delete({timeout: 15000}));
       } else {
              bot.settings.set(`${message.guild.id}-prefix`, args[0])
              await message.channel.send(`Prefix has been set to: \`${args[0]}\``).then(m => m.delete({timeout: 15000}));
       };
}

module.exports.config = {
       name: "prefix",
       aliases: ["prefixset", "setprefix"]
}