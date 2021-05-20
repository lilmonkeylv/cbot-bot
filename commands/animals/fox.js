const { MessageEmbed } = require("discord.js")
const animals = require('random-animals-api');

module.exports.run = async (bot, message, args) => {
       message.delete();

       let beforeImg = new MessageEmbed()
       .setDescription("Searching for a photo....")
       .setFooter(bot.user.username, bot.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))

       let msg = await message.channel.send(beforeImg)
       animals.fox().then((url) => {
              if(!url) return message.reply("Someone shat itself...")
              let img = new MessageEmbed()
              .setColor(bot.colors.d_blue)
              .setAuthor(`${bot.user.username} foxes!`, bot.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
              .setImage(url, { dynamic: true, size: 1024 })
              .setTimestamp(new Date())
              .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
              msg.edit(img).then(m => m.delete({timeout: 35560}))
       });
}

module.exports.config = {
       name: "fox",
       aliases: [""]
}