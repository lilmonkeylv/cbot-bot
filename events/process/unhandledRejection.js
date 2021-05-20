const { red } = require('../../configs/colors.json');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const datenow = moment().format('YYYY-MM-DD LT')

module.exports = (bot, error) => {
       console.error(error);
       let logchat = bot.channels.cache.get('');

       let embed = new MessageEmbed()
       .setTitle("<a:attention:822179370373611530> New error found <a:attention:822179370373611530>")
       .setDescription(error)
       .setColor(red)
       .setFooter("CBot", bot.user.displayAvatarURL())
       .setTimestamp(datenow);
       logchat.send(embed).catch(error => { });
};
