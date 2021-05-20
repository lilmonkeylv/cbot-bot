const { MessageEmbed } = require('discord.js');
const urban = require("urban");
const { stripIndents } = require("common-tags");

module.exports.run = async (bot, message, args) => {
       message.delete();

       if(!message.guild) return;
       let prefix = bot.settings.get(`${message.guild.id}-prefix`);

       if(!args[0] || !["search", "random"].includes(args[0])) return message.reply(`\`${prefix}urban <search|random> (query)\``).then(m => m.delete({timeout: 1500}));
       let image = "http://cdn.marketplaceimages.windowsphone.com/v8/images/5c942bfe-6c90-45b0-8cd7-1f2129c6e319?imageType=ws_icon_medium";
       let search = args[1] ? urban(args.slice(1).join(" ")) : urban.random();
       try {
              search.first(res => {
                     if(!res) return message.channel.send("No results found for this topic, sorry!").then(m => m.delete({timeout: 1500}));
                     let { word, definition, example, thumbs_up, thumbs_down, permalink, author} = res;
                     let embed = new MessageEmbed()
                     .setColor(bot.colors.d_blue)
                     .setAuthor(`Urban Dictionary | ${word}`, image)
                     .setThumbnail(image)
                     .setDescription(stripIndents`**Defintion:** ${definition || "No definition"}
                     **Example:** ${example || "No Example"}
                     **Upvote:** ${thumbs_up || 0}
                     **Downvote:** ${thumbs_down || 0}
                     **Link:** [link to ${word}](${permalink || "https://www.urbandictionary.com/"}).`)
                     .setTimestamp(new Date())
                     .setFooter(`Written by ${author || "unknown"}`);

                     message.channel.send(embed).then(m => m.delete({timeout: 150000}));
              })

       } catch(e) {
              return message.reply("Looks like i've broken! Try again").then(m => m.delete({timeout: 1500}));
       }
};

module.exports.config = {
       name: "urban",
       aliases: ["urban-dictionary"]
};