log = console.log;

async function consoleCmds(bot){
       let y = process.openStdin();
       y.addListener("data", res => {
              let x = res.toString().trim().split(/ +/g)
              if(x == 'exit' || x == 'stop'){
                     process.exit();
              };
              
       });
};

module.exports = {
       consoleCmds
};