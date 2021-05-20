module.exports.run = async (bot, message, args) => {
       message.delete();

       if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have access to this command!").then(m => m.delete({timeout: 150000}));

       let mChannel = message.mentions.channels.first()

       if(mChannel) {
              args = args.slice(1).join(" ")
              mChannel.send(args)
       } else {
              args = args.join(" ")
              message.channel.send(args)
       }
}

module.exports.config = {
       name: "say",
       aliases: ["announce"]
}