const wait = require('util').promisify(setTimeout);
const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const chalk = require('chalk');
const moment = require('moment');
const dateNow = moment(new Date()).format("LTS");

async function nowReady(bot){
       // Wait till start
       await wait(1000)

       // Ready log
       console.log(chalk`{red #################################################}`);
       console.log(chalk`{gray [${dateNow}]} {magenta Loading Enmap}{rgb(255,255,255) ...}`)
       console.log(chalk`{gray [${dateNow}]} {magenta Enmap has been loaded}{rgb(255,255,255) !}`)
       console.log(chalk`{red #################################################}`);
       console.log(chalk`{gray [${dateNow}]} {green Starting up}{rgb(255,255,255) ...}`);
       console.log(chalk`{gray [${dateNow}]} {green Started}{rgb(255,255,255) !}`);
       console.log(chalk`{gray [${dateNow}]} {rgb(255,255,255) Now watching ${bot.guilds.cache.size} servers, ${bot.channels.cache.size} channels and ${bot.users.cache.size} users!}\n`)
       bot.user.setStatus('dnd');

};
function createStatuses(bot){
       let statuses = [
              `chill.lv`,
              `%help`,
              `${bot.guilds.cache.size} servers!`,
              `${bot.channels.cache.size} channels!`,
              `${bot.users.cache.size} users!`
       ];
       function autoSponsori(){
              let status = statuses[Math.floor(Math.random() * statuses.length)]
              if(status === `%help`) bot.user.setActivity(status, {type: "LISTENING"}); else bot.user.setActivity(status, {type: "WATCHING"});
       }
       setInterval(autoSponsori, 4000);
};
function createAd(bot){
       let generalChat = bot.channels.cache.get('538821821882171418');
       
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
       .setFooter(bot.user.username, bot.user.displayAvatarURL())
       .setTimestamp(new Date());
       
       setInterval(autoEmbed, 18000000)
       function autoEmbed(){ generalChat.send(embed); };
};
function dcToAPI(bot){
       function axiosGet(){
              let logchat = bot.channels.cache.get('828467400118370314');

              let embed = new MessageEmbed()
              .setDescription("Sent request to API")
              .setTimestamp(new Date())
              .setColor(bot.colors.d_blue);

              const guild = bot.guilds.cache.get("538820484913954847");
              const members = guild.members.cache;
              const totalUsers = members.filter(member => !member.user.bot).size; // All members
              const onlineUsers = members.filter(member => !member.user.bot && member.presence.status === 'online').size; // Only online members

              axios.get(`http://chill.lv/app/moni/discord.php?user_count=${totalUsers}&user_online=${onlineUsers}`);
              logchat.send(embed);
       };
       setInterval(axiosGet, 15000);
};

module.exports = {
       nowReady,
       createStatuses,
       createAd,
       dcToAPI
};