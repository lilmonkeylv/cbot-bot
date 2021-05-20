module.exports.run = async (bot, message, args) => {
       message.delete();

       const argList = args.join(" ");
       if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You don't have access to this command!").then(m => m.delete({timeout: 150000}));
       /* Point system */
       if(argList === "points on"){
              message.reply(`Point system has been turned on!`)
              return await bot.settings.set(`${message.guild.id}-points`, { boolean: true });
       } else if(argList === "points off"){
              message.reply(`Point system has been turned off!`)
              return await bot.settings.set(`${message.guild.id}-points`, { boolean: false });
       };
       /* Ticket system */
       if(argList === "tickets on"){
              message.reply(`Ticket system has been turned on!`)
              return await bot.settings.set(`${message.guild.id}-tickets`, { boolean: true });
       } else if(argList === "tickets off"){
              message.reply(`Ticket system has been turned off!`)
              return await bot.settings.set(`${message.guild.id}-tickets`, { boolean: false });
       };
       if(!argList) return;
};

module.exports.config = {
       name: "setting",
       aliases: ["settings"]
};