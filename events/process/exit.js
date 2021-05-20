const chalk = require('chalk');
const moment = require('moment');
const dateNow = moment(new Date()).format("LTS")
const log = console.log;

module.exports = (e) => {
       log(chalk`\n{gray [${dateNow}]} {red Activating shutdown sequence}{rgb(255,255,255) ...}`);
       log(chalk`{gray [${dateNow}]} {rgb(255,255,255) Closing threads...}`);
       log(chalk`{gray [${dateNow}]} {rgb(255,255,255) Unloading commands...}`);
       log(chalk`{gray [${dateNow}]} {rgb(255,255,255) Done!}`);
       log(chalk`{gray [${dateNow}]} {red Shutting down}{rgb(255,255,255) ...}`);
       log(chalk`{gray [${dateNow}]} {rgb(255,255,255) Thank you and goodbye!}`);
       log(chalk`{gray [${dateNow}]} {red Shutdown successful}{rgb(255,255,255) !}\n`);
};