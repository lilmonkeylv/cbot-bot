const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
       message.delete();
       if(!args.slice(0).join(" ").endsWith('?') || !args[0]) return message.reply("Please ask a real question, using: **?**").then(m => m.delete({timeout: 10000}));

       let replies = [
              'As I see it, yes.',
              'Ask again later.',
              'Better not tell you now.',
              'Cannot predict now.',
              'Concentrate and ask again.',
              `Don't count on it.`,
              `It is certain.`,
              `It is decidedly so.`,
              `Most likely.`,
              `My reply is no.`,
              `My sources say no.`,
              `Outlook not so good.`,
              `Outlook good.`,
              `Signs point to yes.`,
              `Very doubtful.`,
              `Without a doubt.`,
              `Yes.`,
              `Yes - definitely.`,
              `You may rely on it.`,
              "Yes",
              "No",
              "I don't know",
              "Ask again later!",
              "Cyka",
              "I am not sure!",
              "You tell me",
       ];

       let question = args.slice(0).join(" ");
       let result = Math.floor((Math.random() * replies.length));

       let embed = new MessageEmbed()
       .setTitle("Magical 8-ball | :8ball:")
       .setColor(bot.colors.d_blue)
       .addField("Question:", question, false)
       .addField("Answer:", replies[result], false)
       .setFooter(`${message.author.username}`, message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
       .setTimestamp(new Date());
       message.channel.send(embed).then(m => m.delete({timeout: 155500}));

};

module.exports.config = {
       name: "8ball",
       aliases: ["8b"]
}
