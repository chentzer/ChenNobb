const axios = require('axios');
const {url, urlSearchParams} = require('url')

const steamGetAllApps = "http://api.steampowered.com/ISteamApps/GetAppList/v2";
const steamGetAppDetails = "http://store.steampowered.com/api/appdetails"

class SteamFreeGames {
    static async getAllSteamApps() {
      try {
        const response = await axios.get(steamGetAllApps);
        const apps = response.data.applist.apps;
    
          return apps;
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
    }

    static async getCurrentFreeGames(){
      const apps = await SteamFreeGames.getAllSteamApps();

      for (const app of apps) {
        console.log(app.appid);
    }

      const params = new URLSearchParams({ appids: '1145350', cc: 'MYR' });
      const urlWithParams = `${steamGetAppDetails}?${params.toString()}`;
      return urlWithParams;
    }
}
  

module.exports= SteamFreeGames;
