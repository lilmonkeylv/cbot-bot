const { MessageEmbed } = require("discord.js");
const moment = require('moment');

module.exports.run = async (bot, message, args) => {
       message.delete();

       let member = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.find(m => m.user.username === args[0]) || message.guild.members.cache.get(args[0]) || message.member || message.author;
       const cAt = moment(member.user.createdAt).format("DD/MM/YYYY LT");
       const jAt = moment(member.joinedAt).format("DD/MM/YYYY LT")

       const status = {
              online: "\🟢 Online \🟢",
              idle: "\🟡 Idle \🟡",
              dnd: "\🔴 Do Not Disturb \🔴",
              offline: "\⚫ Offline/Invisible \⚫"
       }
       const flags = {
              DISCORD_EMPLOYEE: 'Discord Employee',
              DISCORD_PARTNER: 'Discord Partner',
              BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
              BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
              HYPESQUAD_EVENTS: 'HypeSquad Events',
              HOUSE_BRAVERY: 'House of Bravery',
              HOUSE_BRILLIANCE: 'House of Brilliance',
              HOUSE_BALANCE: 'House of Balance',
              EARLY_SUPPORTER: 'Early Supporter',
              TEAM_USER: 'Team User',
              SYSTEM: 'System',
              VERIFIED_BOT: 'Verified Bot',
              VERIFIED_DEVELOPER: 'Verified Bot Developer'
       };
       function trimArray(arr, maxLen = 20) {
		if (arr.length > maxLen) {
			const len = arr.length - maxLen;
			arr = arr.slice(0, maxLen);
			arr.push(`${len} more...`);
		}
		return arr;
	};

       if (member.user.bot === true) bot = "Yes"; else bot = "No";

              const roles = member.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1);
              const userFlags = member.user.flags.toArray();
              let permissions = member.permissions.toArray().map(perm => {
                     return perm.toLowerCase().replace(/_/g, " ").replace(/\w\S*/g, txt => {
                         return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                     })
              }).join(", ");
              if (member.hasPermission("ADMINISTRATOR")) permissions = "Administrator (All)"

              let embed = new MessageEmbed()
                .setThumbnail(member.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true, size: 1024 }))
                .setAuthor(`Information about ${member.user.username}`, member.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true, size: 1024 }))
                .setColor(bot.colors.d_blue)
                .addField("Full name:", `${member.user.tag}`, true)
                .addField("ID:", member.user.id, true)
                .addField("Server nickname:", `${member.nickname !== null ? `${member.nickname}` : "None"}`, true)
                .addField("Bot (Yes/No):", `${bot}`, true)
                .addField("Status:", `${status[member.user.presence.status]}`, true)
                .addField("Roles " + "[" + roles.length + "]:", roles.length < 10 ? roles.join(', ') : roles.length > 20 ? trimArray(roles) : 'None', false)
                .addField("Permissions:", permissions, true)
                .addField("Flags:", userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None', false)
                .addField("Created at:", cAt, true)
                .addField("Joined server at:", jAt, true)
                .setTimestamp(new Date())
                .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png' || 'gif', dynamic: true, size: 1024 }));

              message.channel.send(embed).then(m => m.delete({timeout: 195000}));
}

module.exports.config = {
       name: "userinfo",
       usage: "userinfo <@User>",
       category: "misc",
       description: "Fetches information about the specified member",
       aliases: ["whois", "ui"]
}