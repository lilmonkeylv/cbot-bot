const { MessageEmbed } = require('discord.js');
const chalk = require('chalk');
const moment = require('moment');
const dateNow = moment(new Date()).format("LTS");

module.exports.run = async (bot, message, args) => {
       message.delete();
       if(message.author.id != "286540906335830017") return message.reply("You are not the bot owner.").then(m => m.delete({timeout: 10000}));

       let argList = args[0];
       let statusList = {
              "dnd": "dnd",
              "offline": "invisible",
              "idle": "idle",
              "online": "online"
       };
       let statusChatList = {
              "dnd": "Do not disturb",
              "offline": "Offline",
              "idle": "Idle",
              "online": "Online"
       };
       statusEmojiList = {
              "dnd": "🔴",
              "offline": "⚫",
              "idle": "🟡",
              "online": "🟢"
       };

       let embed = new MessageEmbed()
       .setDescription(`**${bot.user.username}** status has been set to ${statusEmojiList[argList]} **${statusChatList[argList]}** ${statusEmojiList[argList]}`)
       .setColor(bot.colors.d_blue)
       .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
       .setTimestamp(new Date())
       
       bot.user.setStatus(statusList[argList]);
       if(argList === "dnd"){
              console.log(chalk.gray(`[${dateNow}] `) + chalk.cyan(`${bot.user.tag}`) + chalk.rgb(255,255,255)(` status has been set to `) + chalk.red(`do not disturb`) + chalk.rgb(255,255,255)(` by `) + chalk.cyan(`${message.author.tag}`) + chalk.rgb(255,255,255)(`.`));
       } else if(argList === "online"){
              console.log(chalk.gray(`[${dateNow}] `) + chalk.cyan(`${bot.user.tag}`) + chalk.rgb(255,255,255)(` status has been set to `) + chalk.green(`online`) + chalk.rgb(255,255,255)(` by `) + chalk.cyan(`${message.author.tag}`) + chalk.rgb(255,255,255)(`.`));
       } else if(argList === "idle"){
              console.log(chalk.gray(`[${dateNow}] `) + chalk.cyan(`${bot.user.tag}`) + chalk.rgb(255,255,255)(` status has been set to `) + chalk.yellow(`idle`) + chalk.rgb(255,255,255)(` by `) + chalk.cyan(`${message.author.tag}`) + chalk.rgb(255,255,255)(`.`));
       } else if(argList === "offline"){
              console.log(chalk.gray(`[${dateNow}] `) + chalk.cyan(`${bot.user.tag}`) + chalk.rgb(255,255,255)(` status has been set to `) + chalk.gray(`offline`) + chalk.rgb(255,255,255)(` by `) + chalk.cyan(`${message.author.tag}`) + chalk.rgb(255,255,255)(`.`));
       };
       message.channel.send(embed).then(m => m.delete({timeout: 10000}));
};

module.exports.config = {
       name: "setstatus",
       aliases: ["botstatus"]
};