const { stripIndents } = require('common-tags');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
       message.delete();
       const TaggedUser = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.find(m => m.user.username === args[0]) || bot.users.cache.get(args[0]) || message.member || message.author; 

       let sizes = [
              '8=D',
              "8==D",
              "8===D",
              "8====D",
              "8=====D",
              "8======D",
              "8=======D",
              "8========D",
              "8=========D",
              "8==========D"
       ];
       let result = Math.floor((Math.random() * sizes.length));

       let embed = new MessageEmbed()
       .setTitle("Magical penis size | 🍆")
       .setColor(bot.colors.d_blue)
       .setDescription(stripIndents`<@${TaggedUser.id}> penis size is:
       **${sizes[result]}**`)
       .setFooter(`${message.author.username}`, message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
       .setTimestamp(new Date());
       message.channel.send(embed).then(m => m.delete({timeout: 15000}));

};

module.exports.config = {
       name: "howbig",
       aliases: ["penis"]
}
