const { MessageEmbed } = require('discord.js');
const { default_prefix } = require('../../../configs/config.json')
const { stripIndents } = require('common-tags');

module.exports = async (bot, message) => {

       bot.MSGauthorIMG = message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })
       function cmdLog(bot,message){
              let embed = new MessageEmbed()
              .setColor(bot.colors.d_blue)
              .setDescription(stripIndents`__**${message.guild.name}**__, <#${message.channel.id}> (**__${message.channel.name}__**)
              
              Channel ID: ${message.channel.id}
              Guild ID: ${message.guild.id}`)
              .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
              .addField("Command:", message.content)
              .setTimestamp(new Date())
              .setFooter(`Used by ${message.author.username}`, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }));
              
              let logchat = bot.channels.cache.get('818911722726490122')
              logchat.send(embed);   
       };

       if(!message.guild) return;

       let prefix = bot.settings.get(`${message.guild.id}-prefix`);
       bot.settings.ensure(`${message.guild.id}-prefix`, default_prefix)
       if(!prefix) prefix = default_prefix;

       let reactionChan = bot.settings.get(`${message.guild.id}-autoreact`);
       if (message.channel.id === reactionChan){
              if(!message.content.startsWith(prefix)){
                     try {
                            await message.react('<a:atickgreen:818916828670590977>');
                            await message.react('<a:atickred:818916829220700200>');
                     } catch(err) {
                            console.error(err);
                     };
              };
       };
       
       if(message.guild){
              if (bot.settings.get(`${message.guild.id}-points`) === false || message.author.bot){ return; } else {
              
                     bot.settings.ensure(`${message.guild.id}-points`, {
                            boolean: false
                     });
                     bot.settings.ensure(`${message.guild.id}-tickets`, {
                            boolean: false
                     })
                     if (!message.content.startsWith(prefix)){
                            const key = `${message.guild.id}-${message.author.id}`;
                            bot.points.ensure(`${message.guild.id}-${message.author.id}`, {
                                   user: message.author.id,
                                   guild: message.guild.id,
                                   points: 0,
                                   level: 1
                            });
                            bot.points.inc(key, "points");
                            
                            const curLevel = Math.floor(0.1 * Math.sqrt(bot.points.get(key, "points")));
                            if (bot.points.get(key, "level") < curLevel){
                                   message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`).then(m => m.delete({timeout: 15000}));
                                   return await bot.points.set(key, curLevel, "level");
                            };
                     };
              };       
       };
       
       let args = message.content.slice(prefix.length).trim().split(/ +/g);
       let cmd = args.shift().toLowerCase();
       
       let user = bot.blacklist.get(`${message.author.id}-blacklist`);
       if(user == true) return;
       
       if (message.author.bot || !message.content.startsWith(prefix)){ return; }
       let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
       if(!commandfile) return;
       if(commandfile) commandfile.run(bot, message, args);
       
       if (message.content.startsWith(prefix) && message.content.length === prefix.length) return;
       cmdLog(bot,message);
};