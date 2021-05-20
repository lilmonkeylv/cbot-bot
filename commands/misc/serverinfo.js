const { MessageEmbed } = require("discord.js");
const moment = require('moment');

module.exports.run = async (bot, message, args) => {
       message.delete();

       let roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
       const members = message.guild.members.cache;
       const channels = message.guild.channels.cache;
       const emojis = message.guild.emojis.cache;

       let region = {
              "brazil": ":flag_br: Brazil :flag_br:",
              "eu-central": ":flag_eu: Central Europe :flag_eu:",
              "singapore": ":flag_sg: Singapore :flag_sg:",
              "us-central": ":flag_us: U.S. Central :flag_us:",
              "sydney": ":flag_au: Sydney :flag_au:",
              "us-east": ":flag_us: U.S. East :flag_us:",
              "us-south": ":flag_us: U.S. South :flag_us:",
              "us-west": ":flag_us: U.S. West :flag_us:",
              "eu-west": ":flag_eu: Western Europe :flag_eu:",
              "vip-us-east": ":flag_us: VIP U.S. East :flag_us:",
              "london": ":flag_gb: London :flag_gb:",
              "amsterdam": ":flag_nl: Amsterdam :flag_nl:",
              "hongkong": ":flag_hk: Hong Kong :flag_hk:",
              "russia": ":flag_ru: Russia :flag_ru:",
              "southafrica": ":flag_za: South Africa :flag_za:"
       };
       let verifLevels = {
              "NONE": "**None**",
              "LOW": "**Low** (Must have a verified email)",
              "MEDIUM": "**Medium** (Must be registered in discord for 5 minutes)",
              "HIGH": "**(╯°□°）╯︵ ┻━┻** (Must be in the server for 10 minutes)",
              "VERY_HIGH": "**(ノಠ益ಠ)ノ彡┻━┻** (Must have a verified phone number)"
       };
       function trimArray(arr, maxLen = 20) {
		if (arr.length > maxLen) {
			const len = arr.length - maxLen;
			arr = arr.slice(0, maxLen);
			arr.push(`${len} more...`);
		}
		return arr;
	}

    const embed = new MessageEmbed()
       .setAuthor(message.guild.name, message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
       .addField("Name:", `${message.guild.name}`, true)
       .addField("ID:", `${message.guild.id}`, true)
       .addField("Owner:", `<@${message.guild.owner.user.id}>`, false)
       .addField("Region:", region[message.guild.region], true)
       .addField("Boost tier:", message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None', true)
       .addField("Verification level:", verifLevels[message.guild.verificationLevel], false)
       .addField('\u200b', '\u200b', false)
       .addField('Statistics:', [
            `Role Count: ${roles.length}`,
            `Emoji Count: ${emojis.size}`,
            `Regular Emojis: ${emojis.filter(emoji => !emoji.animated).size}`,
            `Animated Emojis: ${emojis.filter(emoji => emoji.animated).size}`,
            `Member Count: ${message.guild.memberCount}`,
            `Humans: ${members.filter(member => !member.user.bot).size}`,
            `Bots: ${members.filter(member => member.user.bot).size}`,
            `Text Channels: ${channels.filter(channel => channel.type === 'text').size}`,
            `Voice Channels: ${channels.filter(channel => channel.type === 'voice').size}`,
            `Boost Count: ${message.guild.premiumSubscriptionCount || '0'}`,
       ], true)
       .addField('\u200b', '\u200b', true)
       .addField('Presence:', [                  
            `Online: ${members.filter(member => !member.user.bot && member.presence.status === 'online').size}`,
            `Idle: ${members.filter(member => !member.user.bot && member.presence.status === 'idle').size}`,
            `Do Not Disturb: ${members.filter(member => !member.user.bot && member.presence.status === 'dnd').size}`,
            `Offline: ${members.filter(member => !member.user.bot && member.presence.status === 'offline').size}`,
       ], true)
       .addField('\u200b', '\u200b')
       .addField(`Roles [${roles.length - 1}]:`, roles.length < 10 ? roles.join(', ') : roles.length > 20 ? trimArray(roles) : 'None')
       .addField("Created at:", `${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`, false)
       .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
       .setTimestamp(new Date())
       .setColor(bot.colors.d_blue)
       .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
       message.channel.send(embed).then(m => m.delete({timeout: 150000}));
}

module.exports.config = {
       name: "serverinfo",
       aliases: ["si"]
}