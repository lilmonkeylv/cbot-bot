const { MessageEmbed } = require("discord.js")
const { red } = require("../../configs/colors.json");

module.exports.run = async (bot, message, args) => {
       message.delete()

       if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("You don't have access to this command!").then(m => m.delete({timeout: 150000}));

       let bMember = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.find(m => m.user.username === args[0]) || message.guild.members.cache.get(args[0]);
       if(!args[0] || !bMember) return message.channel.send("Please specify a user.").then(m => m.delete({timeout: 5000}))

       let reason = args.slice(1).join(" ");
       if(!reason) reason = "No reason specified."

       if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I don't have the permission for this command!").then(m => m.delete({timeout: 5000}))

       // embedi 
       let banetDM = new MessageEmbed()
       .setColor(red)
       .setAuthor(message.guild.name, message.guild.iconURL())
       .setDescription(`Hello, you have been banned in **${message.guild.name}** for **${reason}**`)
       .setFooter(`Banned by ${message.author.username}`, message.author.displayAvatarURL())
       .setTimestamp(new Date())

       let banetPublic = new MessageEmbed()
       .setColor(red)
       .setDescription(`<@${bMember.id}> has been banned.`)
       .setFooter(`Banned by ${message.author.username}`, message.author.displayAvatarURL())
       .setTimestamp(new Date())

       const TicketChannel = message.guild.channels.cache.find(c => c.name == (`ticket-${bMember.username}`));
       if(TicketChannel) TicketChannel.delete();

       if(bMember.user.bot === true){
              message.guild.members.ban(bMember, {days: 7, reason: reason}).catch(err => console.log(err))
       } else {
              bMember.send(banetDM).then(() =>
              message.guild.members.ban(bMember, {days: 7, reason: reason})).catch(err => console.log(err))
       }
       message.channel.send(banetPublic).then(m => m.delete({timeout: 5000}))

}

module.exports.config = {
       name: "ban",
       aliases: ["pban"]
}