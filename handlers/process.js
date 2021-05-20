const fs = require('fs');
const chalk = require('chalk');
const moment = require('moment');
const dateNow = moment(new Date()).format("LTS")
const log = console.log;
const process = require('process');

module.exports = (bot) => {
       const processes = fs.readdirSync('./events/process').filter(file => file.endsWith('.js'));
       for (const file of processes){
              const event = require(`../events/process/${file}`);
              let eName = file.split('.')[0];
              try{
                     process.on(eName, event.bind(null, bot));
              } catch(error) {
                     console.error(error);
              }
       };
       log(chalk`{gray [${dateNow}]} {yellow Events have been loaded}{rgb(255,255,255) !}`);
};