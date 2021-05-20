const { stripIndents } = require('common-tags');
const { MessageEmbed } = require('discord.js');
const chillMainID = "538820484913954847"; // CHILL.LV MAIN DISCORD ID

module.exports.run = async (bot, message, args) => {
       if (message.guild.id !== chillMainID) return;
       message.delete();

       let embed = new MessageEmbed()
       .setTitle(`Socials & Links`)
       .setDescription(stripIndents`Homepage - [**here**](https://chill.lv/)
       Admin Applications - [**here**](https://chill.lv/forums/forum/126-tiesības-uz-servera/)
       Reports - [**here**](https://chill.lv/forums/forum/128-sūdzības/)
       Ban Appellations - [**here**](https://chill.lv/forums/forum/127-banu-apelācijas/)
       Suggestions - [**here**](https://chill.lv/forums/forum/129-ieteikumi/)
       `)
       .setColor(bot.colors.d_blue)
       .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
       .setTimestamp(new Date())

       message.channel.send(embed).then(m => m.delete({timeout: 150000}));
};

module.exports.config = {
       name: "socials",
       aliases: ["socs"]
};