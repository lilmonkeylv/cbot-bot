const Gamedig = require('gamedig');
const { MessageEmbed } = require("discord.js");

function createCSGOEmbed(sType,sHost,sPort,Name,message){
       const msgAuthor = message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
       let fetchingEmbed = new MessageEmbed()
       .setDescription(`Fetching data for the ${Name} server...`)
       .setColor(bot.colors.d_blue)
       .setFooter(message.author.username, msgAuthor)
       .setTimestamp(new Date());

       message.channel.send(fetchingEmbed).then(m => {
              Gamedig.query({type: sType, host: sHost, port: sPort}).then((state) => {
                     let players = state.players.map(player => player.name);
           
                   let embed = new MessageEmbed()
                   .setColor(bot.colors.d_blue)
                   .setAuthor('Chill.lv server tracker 🔎', 'https://i.ibb.co/w6dDk0q/logo.png')
                   .setTitle(`Chill.lv - ${Name}`)
                   .addField(`➤ Player Count:`, `${state.players.length}/${state.maxplayers}`, false)
                   .addField(`➤ Players:`, players, false)
                   .addField(`➤ Current map:`, state.map, false)
                   .addField(`➤ Server ping:`, `${state.ping}ms`, false)
                   .addField(`➤ Quickjoin:`, `steam://connect/${state.connect}`, false)
                   .setFooter(`${message.author.username}`, msgAuthor)
                   .setTimestamp(new Date());
                   m.edit(embed).then(m => m.delete({timeout: 140000}))
       
              }).catch((error) => {
                     let emptyEmbed = new MessageEmbed()
                     .setColor(bot.colors.red)
                     .setDescription(`Sorry, the ${Name} server is empty!`)
                     .setFooter(message.author.username, msgAuthor)
                     .setTimestamp(new Date())

                     if (error == "RangeError [EMBED_FIELD_VALUE]: MessageEmbed field values may not be empty."){
                            m.edit(emptyEmbed).then(m => m.delete({timeout: 140000}));
                     }
              });
       });
};
function createMCEmbed(sType,sHost,sPort,Name,message){
       const msgAuthor = message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
       let fetchingEmbed = new MessageEmbed()
       .setDescription(`Fetching data for the ${Name} server...`)
       .setColor(bot.colors.d_blue)
       .setFooter(message.author.username, msgAuthor)
       .setTimestamp(new Date());

       message.channel.send(fetchingEmbed).then(m => {
              Gamedig.query({type: sType, host: sHost, port: sPort}).then((state) => {
                     let players = state.players.map(player => player.name);
       
                     let mcEmbed = new MessageEmbed()
                     .setColor(bot.colors.d_blue)
                     .setAuthor('Chill.lv server tracker 🔎', 'https://i.ibb.co/w6dDk0q/logo.png')
                     .setTitle(`Chill.lv - ${Name}`)
                     .addField(`➤ Player Count`, `${state.players.length}/${state.maxplayers}`, false)
                     .addField(`➤ Players:`, players, false)
                     .addField(`➤ IP Address:`, `mc.chill.lv`, false)
                     .setFooter(`${message.author.username}`, msgAuthor)
                     .setTimestamp(new Date());
                     m.edit(mcEmbed).then(m => m.delete({timeout: 140000}));
       
              }).catch((error) => {
                     let emptyEmbed = new MessageEmbed()
                     .setColor(bot.colors.red)
                     .setDescription(`Sorry, the ${Name} server is empty!`)
                     .setFooter(message.author.username, msgAuthor)
                     .setTimestamp(new Date())

                     if (error == "RangeError [EMBED_FIELD_VALUE]: MessageEmbed field values may not be empty."){
                            m.edit(emptyEmbed).then(m => m.delete({timeout: 140000}));
                     } else {
                            console.error(error);
                     };
              });
       });
};
function createMTADayZEmbed(sType,sHost,sPort,Name,message){
       const msgAuthor = message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
       let fetchingEmbed = new MessageEmbed()
       .setDescription(`Fetching data for the ${Name} server...`)
       .setColor(bot.colors.d_blue)
       .setFooter(message.author.username, msgAuthor)
       .setTimestamp(new Date());

       message.channel.send(fetchingEmbed).then(m => {
              Gamedig.query({type: sType, host: sHost, port: sPort}).then((state) => {
                     let players = state.players.map((player) => player.name);
              
                     let MTAEmbed = new MessageEmbed()
                     .setColor(bot.colors.d_blue)
                     .setAuthor("Chill.lv server tracker 🔎", "https://i.ibb.co/w6dDk0q/logo.png")
                     .setTitle(`Chill.lv - ${Name}`)
                     .addField(`➤ Server type`, `${state.raw.gametype}`, true)
                     .addField(`➤ IP Address`, `${state.connect}`, true)
                     .addField(`➤ Player Count:`, `${state.players.length}/${state.maxplayers}`, false)
                     .addField(`➤ Player Names:`, players, true)
                     .setTimestamp(new Date())
                     .setFooter(`${message.author.username}`, msgAuthor);
                     m.edit(MTAEmbed).then((m) => m.delete({ timeout: 35000 }));
              }).catch((error) => {
                     let emptyEmbed = new MessageEmbed()
                     .setColor(bot.colors.red)
                     .setDescription(`Sorry, the ${Name} server is empty!`)
                     .setFooter(message.author.username, msgAuthor)
                     .setTimestamp(new Date())

                     if (error == "RangeError [EMBED_FIELD_VALUE]: MessageEmbed field values may not be empty."){
                            m.edit(emptyEmbed).then(m => m.delete({timeout: 140000}));
                     };
              });
       });
};
function createMTARPEmbed(sType,sHost,sPort,Name,message){
       const msgAuthor = message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
       let fetchingEmbed = new MessageEmbed()
       .setDescription(`Fetching data for the ${Name} server...`)
       .setColor(bot.colors.d_blue)
       .setFooter(message.author.username, msgAuthor)
       .setTimestamp(new Date());

       message.channel.send(fetchingEmbed).then(m => {
              Gamedig.query({type: sType, host: sHost, port: sPort}).then((state) => {
                     let players = state.players.map((player) => player.name);
                     let playerscore = state.players.map((player) => player.score);
              
                     let MTAEmbed = new MessageEmbed()
                     .setColor(bot.colors.d_blue)
                     .setAuthor("Chill.lv server tracker 🔎", "https://i.ibb.co/w6dDk0q/logo.png")
                     .setDescription(`[${state.name}](https://chill.lv/forums/forum/199-mta-roleplay/)`)
                     .setTitle(`Chill.lv - ${Name}`)
                     .addField(`➤ Server type`, `${state.raw.gametype}`, true)
                     .addField(`➤ IP Address`, `${state.connect}`, true)
                     .addField(`➤ Player Count:`, `${state.players.length}/${state.maxplayers}`, false)
                     .addField(`➤ Player Names:`, players, true)
                     .addField(`➤ Player Hours:`, playerscore, true)
                     .setTimestamp(new Date())
                     .setFooter(`${message.author.username}`, msgAuthor);
                     m.edit(MTAEmbed).then((m) => m.delete({ timeout: 35000 }));
              }).catch((error) => {
                     let emptyEmbed = new MessageEmbed()
                     .setColor(bot.colors.red)
                     .setDescription(`Sorry, the ${Name} server is empty!`)
                     .setFooter(message.author.username, msgAuthor)
                     .setTimestamp(new Date())

                     if (error == "RangeError [EMBED_FIELD_VALUE]: MessageEmbed field values may not be empty."){
                            m.edit(emptyEmbed).then(m => m.delete({timeout: 140000}));
                     };
              });
       });
};

module.exports = {
       createCSGOEmbed,
       createMCEmbed,
       createMTADayZEmbed,
       createMTARPEmbed,
}