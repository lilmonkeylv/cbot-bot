const { MessageEmbed, version } = require('discord.js');

module.exports.run = async (bot, message, args) => {
       message.delete();

       const embed = new MessageEmbed()
       .setAuthor(`${bot.user.username} information.`, bot.user.displayAvatarURL({ format: 'png', size: 1024 }))
       .addField("Hosting provider:", "<:host_logo:832488731785166888> [**DijxCloud**](https://dijxcloud.com/)", true)
       .addField(`Bot version:`,`\`v${require(`${process.cwd()}/package.json`).version}\``, true)
       .addField(`Total user count:`, `\`${bot.users.cache.size}\``, true)
       .addField(`Total server count:`, `\`${bot.guilds.cache.size}\``, true)
       .addField(`Total channel count:`, `\`${bot.channels.cache.size}\``, true)
       .addField(`Discord.js version:`, `\`v${version}\``, true)
       .addField(`Node.js version:`, `\`${process.version}\``, true)
       .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
       .setColor(bot.colors.d_blue);
       message.channel.send(embed).then(m => m.delete({timeout: 150000}));
}

module.exports.config = {
       name: "about",
       aliases: ["botinfo"]
}