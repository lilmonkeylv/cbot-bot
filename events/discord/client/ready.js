const f = require('../../../functions/cleanups/readyFunctions');

module.exports = async (bot,message) => {
       f.nowReady(bot);
       f.createAd(bot);
       f.createStatuses(bot);
       // f.dcToAPI(bot);
};