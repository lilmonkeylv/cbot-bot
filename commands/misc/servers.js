const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
       message.delete();

       let dmEmbed = new MessageEmbed()
       .setDescription(`<@${message.author.id}> check your DMs!`)
       .setFooter(bot.user.username, bot.user.displayAvatarURL())
       .setTimestamp(new Date())
       .setColor(bot.colors.d_blue)

       message.channel.send(dmEmbed).then(m => m.delete({timeout: 15000}))

       let embed = new MessageEmbed()
       .setAuthor("Chill.lv Servers 📜", 'https://i.ibb.co/Fngg9Pv/faivocn.png')
       .setColor(bot.colors.d_blue)
       .addField("Public", `go.chill.lv`, false)
       .addField("Arena", `am.chill.lv`, true)
       .addField("AWP", `awp.chill.lv`, true)
       .addField("CSDM", `csdm.chill.lv`, true)
       .addField("Retake", `retake.chill.lv`, true)
       .addField("Retake #2", `retake.chill.lv:27016`, true)
       .addField('\u200b', '\u200b', false)
       .addField("MTA:RP", `mtasa://91.134.166.79:22371`, false)
       .addField("Minecraft", `mc.chill.lv`, false)
       .setThumbnail('https://i.ibb.co/7Vjv5Dr/chill-logo.png')
       .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
       .setTimestamp(new Date());

       message.author.send(embed);
}

module.exports.config = {
       name: "servers",
       aliases: ["servinfo", "servs"]
}