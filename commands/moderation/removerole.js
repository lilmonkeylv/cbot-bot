const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    message.delete();

    if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("You don't have access to this command!").then(m => m.delete({timeout: 150000}));

    let rMember = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.find(m => m.user.username === args[0]) || bot.users.cache.get(args[0])
    if(!rMember) return message.channel.send("Please specify a member to modify. <:yeahboi:818916827307966495>")
    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
    if(!role) return message.channel.send("Please specify a role. <:yeahboi:818916827307966495>") 
    
let nav = new MessageEmbed()
.setDescription(`<@${rMember.id}> doesn't have this role! <:yeahboi:818916827307966495>`)
.setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
.setColor(red)
.setTimestamp(new Date())

let tikaatņemts = new MessageEmbed()
.setDescription(`<@${rMember.id}> was removed from the: <@&${role.id}> role! <:yeahboi:818916827307966495>`)
.setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
.setColor(bot.colors.d_blue)
.setTimestamp(new Date())

    if(!rMember.roles.cache.has(role.id)) {
        return message.channel.send(nav).then(m => m.delete({timeout: 15000}))
    } else {
        await rMember.roles.remove(role.id).catch(e => console.log(e.message))
        message.channel.send(tikaatņemts).then(m => m.delete({timeout: 15000}))
    }
}

module.exports.config = {
    name: "removerole",
    usage: "removerole <@User> <@Role/RoleID>",
    description: "Removes the specified role from the specified user",
    category: "moderation",
    aliases: ["delrole", "rolerem"]
}