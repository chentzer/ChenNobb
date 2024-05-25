const axios = require('axios');
const {url, urlSearchParams} = require('url')

const steamGetAllApps = "http://api.steampowered.com/ISteamApps/GetAppList/v2";
const steamGetAppDetails = "http://store.steampowered.com/api/appdetails"
const freeGames = new Map();

class SteamFreeGames {
    static async getAllSteamApps() {
      try {
        const response = await axios.get(steamGetAllApps);
        const apps = response.data.applist.apps;
    
          return apps;
      } catch (e) {
        console.error('Error:', e);
        return null;
      }
    }

    static async getCurrentFreeGames(){
      const apps = await SteamFreeGames.getAllSteamApps();

      for (const app of apps) {
        const currentAppId = app.appid.toString();
    
        try {
            const response = await SteamFreeGames.getAppDetails(parseInt(currentAppId));
            const appDetails = response.data;
    
            console.log("appDetails ", appDetails);
    
            if (appDetails[currentAppId].success) {
              console.log("Game exists")
              if(!appDetails[currentAppId].data.is_free){
                console.log("GAME is not free, proceeding to check")
                try{
                  if (appDetails[currentAppId].data.price_overview.discount_percent === 100) {
                    const appDetailsMap = {
                        steam_appid: currentAppId,
                    };
                    freeGames.set(appDetailsMap);
                  }
                }catch{
                  console.log("price_overview field not found, game is probably not yet released.")
                }
              }

            }

        } catch (error) {
            console.error('Error occurred:', error);
        }
    }
    console.log("CHECK ME ", freeGames);
  
      return freeGames;
    }

    static async getAppDetails(appId){
      const params = new URLSearchParams({ appids: appId, cc: 'MYR' });
      const steamGetAppDetailsWithParams = `${steamGetAppDetails}?${params.toString()}`;
      
      const maxRetries = 3; // Maximum number of retries
      let retryCount = 0;
      const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
  
      while (retryCount < maxRetries) {
          try {
              const response = await axios.get(steamGetAppDetailsWithParams, {
                  timeout: 300000
              });
              return response;
          } catch (error) {
              if (error.code === 'ECONNABORTED') {
                  console.error('Request timed out');
              } else {
                  console.error('Error:', error.message);
              }
              retryCount++;
              await sleep(60000);
              console.log(`Retry attempt ${retryCount}`);
          }
      }
  
      console.error('Max retry attempts reached');
      return null;
  }

  
}
  

module.exports= SteamFreeGames;
