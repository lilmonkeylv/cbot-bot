const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
       message.delete();

       let sekundeskopa = (bot.uptime / 1000);
       let dienas = Math.floor(sekundeskopa / 86400);
       sekundeskopa %= 86400;
       let stundas = Math.floor(sekundeskopa / 3600);
       sekundeskopa %= 3600;
       let minutes = Math.floor(sekundeskopa / 60);
       let sekundes = Math.floor(sekundeskopa % 60);

       const embed = new MessageEmbed()
       .setAuthor(`Uptime`, bot.user.displayAvatarURL())
       .setColor(bot.colors.d_blue)
       .addField("I have been online for:", `**${dienas}** days\n**${stundas}** hours\n**${minutes}** minutes\n**${sekundes}** seconds`)
       .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
       .setTimestamp(new Date())

    message.channel.send(embed).then(m => m.delete({timeout: 15000}));
}

module.exports.config = {
       name: "uptime",
       aliases: ["up"]
}