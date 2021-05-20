const { MessageEmbed } = require('discord.js')
const response = Math.floor(Math.random() * 6);

module.exports.run = (bot, message, args) => {
    message.delete();

    let embed = new MessageEmbed()
    .setColor(bot.colors.d_blue)
    .setDescription(`You rolled **${response}** | :game_die:`)
    .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
    .setTimestamp(new Date());

    message.channel.send(embed).then(m => m.delete({timeout: 15000}));
};

module.exports.config = {
       name: "dice",
       aliases: ["rollthedice"]
}