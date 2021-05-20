const { MessageEmbed } = require('discord.js');
const weather = require('weather-js');

module.exports.run = async (bot, message, args) => {
       message.delete();

       let argList = args.join(" ").toLowerCase();
       if(!argList) return message.reply("Please enter a valid location in english!");

       let findingEmbed = new MessageEmbed()
       .setDescription(`Fetching the weather data for ${argList}...`)
       .setColor(bot.colors.d_blue)

       message.channel.send(findingEmbed).then(m2 => {
              weather.find({search: argList, degreeType: "C"}, function(err, args) {
                     if(err) message.channel.send(err);
             
                     var current = args[0].current;
                     var location = args[0].location;
             
                     let embed = new MessageEmbed()
                     .setAuthor(`Weather for ${current.observationpoint}`, current.imageUrl)
                     .setColor(bot.colors.d_blue)
                     .addField("Timezone:", `UTC-**${location.timezone}**`, true)
                     .addField("Degree Type:", location.degreetype, true)
                     .addField("Temperature:", `${current.temperature} °${location.degreetype}`, true)
                     .addField("Feels like:", `${current.feelslike} °${location.degreetype}`, true)
                     .addField("Winds:", current.winddisplay, true)
                     .addField("Humidity:", `${current.humidity}%`, true)
                     .addField("The sky is:", `${current.skytext}`,true)
                     .addField("Day:", `${current.day}`, true)
                     .addField("Date:", `${current.date}`, true)
                     .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
       
                    m2.edit(embed).then(m => m.delete({timeout: 150000}));
              });
       });
       
};

module.exports.config = {
       name: "weather",
       aliases: [""]
};