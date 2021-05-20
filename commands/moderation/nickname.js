const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    message.delete();

    if (!message.member.hasPermission("MANAGE_NICKNAMES")) return message.reply("You don't have access to this command!").then(m => m.delete({timeout: 150000}));

    let lietotajs = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.find(m => m.user.username === args[0]) || bot.users.cache.get(args[0]) 
    let newnick = args[1];

    if(!newnick) return message.reply("Please specify a new nickname!").then(m => m.delete({timeout: 15000}))

    let uzlikts = new MessageEmbed()
    .setColor(bot.colors.d_blue)
    .setDescription(`${lietotajs} name was changed to **${newnick}**. <:yeahboi:818916827307966495>`)
    .setTimestamp(new Date())
    .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))

    lietotajs.setNickname(newnick)
    message.channel.send(uzlikts).then(m => m.delete({timeout: 15000}));


}

module.exports.config = {
    name: "nickname",
    aliases: ["nick"]
}