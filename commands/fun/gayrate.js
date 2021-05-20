const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
       message.delete();
       const TaggedUser = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.find(m => m.user.username === args[0]) || bot.users.cache.get(args[0]) || message.member || message.author; 

       let result = Math.floor((Math.random() * 101));

       let embed = new MessageEmbed()
       .setTitle("Magical gayrate | 🏳️‍🌈")
       .setColor(bot.colors.d_blue)
       .setDescription(`<@${TaggedUser.id}> is ${result}% gay`)
       .setFooter(`${message.author.username}`, message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
       .setTimestamp(new Date());
       message.channel.send(embed).then(m => m.delete({timeout: 15000}));

};

module.exports.config = {
       name: "gayrate",
       aliases: ["howgay"]
}
