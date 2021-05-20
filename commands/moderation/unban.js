const { MessageEmbed } = require("discord.js")
const { red } = require("../../configs/colors.json");

module.exports.run = async (bot, message, args) => {
       message.delete()

       if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("You don't have access to this command!").then(m => m.delete({timeout: 150000}));

       if(!args[0]) return message.channel.send("Please specify an ID").then(m => m.delete({timeout: 5000}))
       let bMember = await bot.users.fetch(args[0]) 
       if(!bMember) return message.channel.send("Please specify an ID.").then(m => m.delete({timeout: 5000}))

       let reason = args.slice(1).join(" ");
       if(!reason) reason = "No reason specified."

       if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I don't have the permission for this command!").then(m => m.delete({timeout: 5000}))

       // embedi

       let unbanetPublic = new MessageEmbed()
       .setColor(red)
       .setDescription(`<@${bMember.id}> got unbanned.`)
       .setFooter(`Unbanned by: ${message.author.username}`, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
       .setTimestamp(new Date())

       let notBanet = new MessageEmbed()
       .setColor(red)
       .setDescription(`<@${bMember.id}> is not banned.`)
       .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
       .setTimestamp(new Date())

       message.guild.members.unban(bMember, reason).catch(err => console.log(err))
       message.channel.send(unbanetPublic).then(m => m.delete({timeout: 5000}))
}

module.exports.config = {
       name: "unban",
       aliases: [""]
}