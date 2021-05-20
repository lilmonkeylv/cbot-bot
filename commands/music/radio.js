const { MessageEmbed } = require('discord.js');
const { stripIndents } = require("common-tags");

module.exports.run = async (bot, message, args) => {
       message.delete();

       const authorImage = 'https://sslradiostream.com/wp-content/uploads/2020/05/logo-sslradiostream.png';
       /*
              Radio Tev: <http://stream.radiotev.lv:8002/radiov>,
              EHR: <http://82.135.234.195:8000/ehr.aac>,
              EHR Hits: <http://stream.europeanhitradio.com:8000/Stream_02.aac>,
              LR5: <http://live.pieci.lv/live19-hq.mp3>,
              MonkeyFM: <http://stream.zeno.fm/f1wpbbymh5zuv>

              More streams: http://fmstream.org/index.php?c=LVA&o=E
       */

       if(!message.guild) return;
       let prefix = bot.settings.get(`${message.guild.id}-prefix`);

       let embed = new MessageEmbed()
       .setColor(bot.colors.d_blue)
       .setDescription(stripIndents`Use the ones below, for example:\n
       \`Radio TEV\`, \`EHR\`, \`EHR Hits\`, \`Pieci.lv\`, \`MonkeyFM\`;
       **Audio streams**: You can also play any stream of yours.
       **YouTube**: You can also play any [**youtube**](https://www.youtube.com) link.

       Use **${prefix}radio** and the **name** for one of the stations above to play music in the channel!
       Use **${prefix}radio leave** or **stop** to stop playing music!
       Suggest new links to **lilmonkey#1210** or in the [**support server**](https://discord.gg/sySpTPbjJe)`)
       .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
       .setTimestamp(new Date())

       let argList = args[0];

       // Main and radio aliases
              if(argList === "Radio TEV" || argList === "radio tev") argList = "http://stream.radiotev.lv:8002/radiov"
              if(argList === "EHR" || argList === "ehr") argList = "http://82.135.234.195:8000/ehr.aac"
              if(argList === "EHR Hits" || argList === "ehr hits") argList = "http://stream.europeanhitradio.com:8000/Stream_02.aac"
              if(argList === "Pieci.lv" || argList === "pieci.lv") argList = "http://live.pieci.lv/live19-hq.mp3"
              if(argList === "MonkeyFM" || argList === "monkeyfm") argList = "http://stream.zeno.fm/f1wpbbymh5zuv"
       // Aliases end
       if(argList === "help"){
              embed.setAuthor("Radio Help", authorImage)
       } else {
              embed.setAuthor("No audio stream was specified", authorImage)
       }
              if(!argList || argList === "help"){
                     return message.channel.send(embed).then(m => m.delete({timeout: 150000}));
              } else {
                     if(message.member.voice.channel){
                            const connection = await message.member.voice.channel.join();
                                   dispatcher = connection.play(argList, {bitrate: 512000 /* 512kbps */});
                                   dispatcher.setVolume(0.09);
                                   if(argList === "stop" || argList === "leave" && message.member.voice.channel === message.guild.me.voice.channel){
                                          message.member.voice.channel.leave();
                                   }
                     } else {
                            message.reply("Join a voice channel!").then(m => m.delete({timeout: 15000}));
                     };
              };
};

module.exports.config = {
       name: "radio",
       aliases: ["247"]
};