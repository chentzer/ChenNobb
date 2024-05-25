const SteamFreeGames = require('./steamFreeGames');

async function getAllSteamApps() {
    try {
        const apps = await SteamFreeGames.getAllSteamApps();
        const appList = apps.map((app, index) => {
          return `App ${app.appid}: ${app.name}`;
        }).join('\n');
        if (appList) {
            console.log(appList)
        } else {
          console.log("Failed to call getAllSteamApps")
        }
    } catch (e) {
        console.error('Failed to call getAllSteamApps, Error:', e);
    }
}

async function getCurrentFreeGames(){
  try{
    const free = await SteamFreeGames.getCurrentFreeGames();
    return free
  }catch(e){
    console.error('Failed to call getAllSteamApps, Error:', e);
  }
}

module.exports = { getAllSteamApps };
