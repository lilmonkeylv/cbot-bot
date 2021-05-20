const { MessageEmbed } = require('discord.js')
const { chill_red } = require('../../configs/colors.json')

module.exports.run = async (bot, message, args) => {
    message.delete();

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have access to this command!").then(m => m.delete({timeout: 150000}));

    let mChannel = message.mentions.channels.first()

    if(mChannel) {
        args = args.slice(1).join(" ")

        let embed = new MessageEmbed()
        .setColor(chill_red)
        .setDescription(args)
        .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setTimestamp(new Date())

        mChannel.send(embed)
    } else {
        args = args.join(" ")
        
        let embed = new MessageEmbed()
        .setColor(chill_red)
        .setDescription(args)
        .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setTimestamp(new Date())

        message.channel.send(embed)
    }
}


module.exports.config = {
    name: "say2",
    usage: "say2 (#Channel) <#Message>",
    description: "Sends the specified message in specified channel in an embed",
    category: "moderation",
    aliases: ["announce2"]
}