const { readdirSync } = require("fs")
const log = console.log;
const moment = require('moment');
const dateNow = moment(new Date()).format("LTS")
const chalk = require('chalk'); 

module.exports = (bot) => {
       log(chalk`{gray [${dateNow}]} {yellow Loading events}{rgb(255,255,255) ...}`);
       const load = dirs => {    
              const events = readdirSync(`./events/discord/${dirs}/`).filter(d => d.endsWith('.js'));
              for (let file of events) {
                     const evt = require(`../events/discord/${dirs}/${file}`);
                     let eName = file.split('.')[0];
                     bot.on(eName, evt.bind(null, bot));
              };
       };
       ["client", "guild"].forEach(x => load(x));
};