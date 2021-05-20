const { readdirSync } = require("fs");
const chalk = require('chalk');
const moment = require("moment");
const log = console.log;
const dateNow = moment(new Date()).format("LTS")

module.exports = (bot) => {
       // Top of the console a.k.a First Log
       log(chalk`{rgb(255,255,255) 
                                                 
                                                 ██╗  ██╗███████╗██╗     ██╗      █████╗
                                                 ██║  ██║██╔════╝██║     ██║     ██╔══██╗
                                                 ███████║█████╗  ██║     ██║     ██║  ██║
                                                 ██╔══██║██╔══╝  ██║     ██║     ██║  ██║
                                                 ██║  ██║███████╗███████╗███████╗╚█████╔╝
                                                 ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚════╝\n
                                                 
              ██╗    ██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗    ████████╗ ██████╗      ██████╗██████╗  ██████╗ ████████╗
              ██║    ██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝    ╚══██╔══╝██╔═══██╗    ██╔════╝██╔══██╗██╔═══██╗╚══██╔══╝
              ██║ █╗ ██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗         ██║   ██║   ██║    ██║     ██████╔╝██║   ██║   ██║   
              ██║███╗██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝         ██║   ██║   ██║    ██║     ██╔══██╗██║   ██║   ██║   
              ╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗       ██║   ╚██████╔╝    ╚██████╗██████╔╝╚██████╔╝   ██║   
               ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝       ╚═╝    ╚═════╝      ╚═════╝╚═════╝  ╚═════╝    ╚═╝}\n\n`)
       log(chalk`{gray [${dateNow}]} {blue Loading core}{rgb(255,255,255) ...}`);
       log(chalk`{gray [${dateNow}]} {blue Core loaded}{rgb(255,255,255) !}`);
       log(chalk.red(`#################################################`));

       // Command loading start
       log(chalk`{gray [${dateNow}]} {cyan Loading commands}{rgb(255,255,255) ...}`);
       const load = dir => {
              const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
              // console.log(Math.floor(commands.length))
              for (let file of commands) {
                     let pull = require(`../commands/${dir}/${file}`);
                            if (pull.config.name) {
                                   bot.commands.set(pull.config.name, pull);
                            } else {
                                   log(chalk`{gray [${dateNow}]} {cyan ${file}} was loaded {red unsuccessfully}{rgb(255,255,255) !}`);
                            }
                     if (pull.config.aliases) pull.config.aliases.forEach(a => bot.aliases.set(a, pull.config.name));
              };
       };
       ["animals", "custom", "fun", "logs", "misc", "moderation", "music", "nsfw", "owner", "points", "servers", "ticket"].forEach(x => load(x));
       log(chalk`{gray [${dateNow}]} {cyan Commands have been loaded}{rgb(255,255,255) !}`);
       log(chalk.red(`#################################################`));
};