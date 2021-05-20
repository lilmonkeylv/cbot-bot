const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
       message.delete();

       let rMember = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.find(m => m.user.username === args[0]) || message.guild.members.cache.get(args[0]) || message.author;
       let invites = await message.guild.fetchInvites();
       const userInvites = invites.array().filter(e => e.inviter.id == rMember.id);
       let inviteCount = 0;
       userInvites.forEach(invite => inviteCount += invite.uses);

       let embed = new MessageEmbed()
       .setDescription(`<@${rMember.id}> has **${userInvites.length}** active links and **${inviteCount}** invited members.`)
       .setColor(bot.colors.d_blue)
       .setTimestamp(new Date())
       .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))

       message.channel.send(embed);

}

module.exports.config = {
       name: "invites",
       aliases: ["invited"]
}