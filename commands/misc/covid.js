const request = require("request");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.delete();
       
  let country = args.join(" ").toLowerCase();
  let argres = args.join(" ").toLowerCase();
  if(!argres) argres = "global";
  let URL_TO_FETCH = "";

  if (!country || country === "all") {
    URL_TO_FETCH = "https://disease.sh/v3/covid-19/all";
  } else {
    URL_TO_FETCH = `https://disease.sh/v3/covid-19/countries/${country}`;
  }

request.get(URL_TO_FETCH, (error, response, body) => {
       let json = JSON.parse(body);
       if(error) return message.reply("Try again in English.").then(m => m.delete({timeout: 1500}))

     let embed = new MessageEmbed()
       .setColor(bot.colors.red)
       .setAuthor(`Covid-19 stats - ${argres}`)
       .addField("Overall:", `Cases: ${json.cases}\nDeaths: ${json.deaths}\nIn a critical state: ${json.critical}\nRecovered: ${json.recovered}\nTests: ${json.tests}`, true)
       .addField("Today:", `Cases: ${json.todayCases}\nDeaths: ${json.todayDeaths}\nRecovered: ${json.todayRecovered}`, true)
       .setTimestamp(new Date())
       .setFooter(bot.user.username, bot.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }));
       
       if(json.cases === undefined) return message.reply("Try again in English.").then(m => m.delete({timeout: 1500}))

     message.channel.send(embed).then((m) => m.delete({timeout: 155550}));
})};

module.exports.config = {
    name: "covid",
    aliases: ["covid19", "corona", "covidstats"]
}
