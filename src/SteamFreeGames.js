const axios = require('axios');

const steamGetAllApps = "http://api.steampowered.com/ISteamApps/GetAppList/v2";
const steamGetAppDetails = "http://store.steampowered.com/api/appdetails"

class SteamFreeGames {
    static async getAllSteamApps() {
      try {
        const response = await axios.get(steamGetAllApps);
        const apps = response.data.applist.apps;
        const appList = apps.map((app, index) => {
            return `App ${app.appId}: ${app.name}`;
          }).join('\n');
    
          return appList;
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
    }
}
  

module.exports= SteamFreeGames;
