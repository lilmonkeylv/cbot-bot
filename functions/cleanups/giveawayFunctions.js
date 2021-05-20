const { GiveawaysManager } = require("discord-giveaways");
const db = require('quick.db');

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
       async getAllGiveaways(){
              return db.get("giveaways");
       };
       async saveGiveaway(messageID, giveawayData){
              db.push("giveaways", giveawayData);
              return true;
       };
       async editGiveaway(messageID, giveawayData){
              const giveaways = db.get("giveaways");
              const newGiveawaysArray = giveaways.filter((giveaway) => giveaway.messageID !== messageID);
              newGiveawaysArray.push(giveawayData);
              db.set("giveaways", newGiveawaysArray);
              return true;
       };
       async deleteGiveaway(messageID){
              const newGiveawaysArray = db.get("giveaways").filter((giveaway) => giveaway.messageID !== messageID);
              db.set("giveaways", newGiveawaysArray);
              return true;
       };
};
function normalFunction(GiveawayManagerWithOwnDatabase,bot){
       if(!db.get("giveaways")) db.set("giveaways", []);
       const manager = new GiveawayManagerWithOwnDatabase(bot, {
              storage: false,
              updateCountdownEvery: 5000,
              default: {
                     botsCanWin: false,
                     exemptPermissions: [ "MANAGE_MESSAGES", "ADMINISTRATOR" ],
                     embedColor: "#FF0000",
                     reaction: "🎉"
              }
       });
       bot.giveawaysManager = manager;
};

module.exports = {
       GiveawayManagerWithOwnDatabase,
       normalFunction
};