const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");
const { stripIndents } = require("common-tags");
const moment = require('moment');

module.exports.run = async (bot, message, args) => {
       message.delete();

       const token = "EB84A0A2D5C31909360E2D3B2E4799F2";
       if(!args[0]) return message.channel.send("Please provide a valid steam link ending!");
       const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${token}&vanityurl=${args.join(" ")}`;

       fetch(url).then(res => res.json()).then(body => {
              if(body.response.success === 42) return message.reply("I was unable to find a steam profile with that name!").then(m => m.delete({timeout: 1500}));

              const id = body.response.steamid;
              const summaries = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${token}&steamids=${id}`;
              const bans = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${token}&steamids=${id}`;
              const state = ["Offline", "Online", "Busy", "Away", "Snooze", "Looking to trade", "Looking to play"];

              fetch(summaries).then(res => res.json()).then(body => {
                     if(!body.response) return message.reply("I was unable to find a steam profile with that name!").then(m => m.delete({timeout: 1500}));
                     const { personaname, avatarfull, realname, personastate, loccountrycode, profileurl, timecreated } = body.response.players[0];
                     const cAt = moment(timecreated).format("DD/MM/YYYY LT");

                     fetch(bans).then(res => res.json()).then(body => {
                            if(!body.players) return message.reply("I was unable to find a steam profile with that name!").then(m => m.delete({timeout: 1500}));
                            const { NumberOfVACBans, NumberOfGameBans } = body.players[0];

                            const embed = new MessageEmbed()
                            .setColor(bot.colors.d_blue)
                            .setAuthor(`Steam Services | ${personaname}`, avatarfull)
                            .setThumbnail(avatarfull)
                            .setDescription(stripIndents`**Real Name:** ${realname || "Unknown"}
                            **Status:** ${state[personastate]}
                            **Country:** :flag_${loccountrycode ? loccountrycode.toLowerCase() : "white"}:
                            **Account Created:** ${cAt}
                            **Bans:** VAC: ${NumberOfVACBans}, Game: ${NumberOfGameBans}
                            **Link:** [link to profile](${profileurl}).`)
                            .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png' || 'gif', dynamic: true, size: 1024 }))
                            .setTimestamp(new Date());

                            message.channel.send(embed).then(m => m.delete({timeout: 150000}));
                     });
              });
       });
};

module.exports.config = {
       name: "steam",
       aliases: ["steaminfo", "steam-userinfo"]
};