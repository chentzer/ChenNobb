require('dotenv').config();
const { Client, IntentsBitField} = require('discord.js');
const SteamFreeGames = require('./SteamFreeGames')

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
})

client.on('ready', (c) => {
    console.log(`${c.user.tag} is running! Vroom Vroom!`);
})

client.on('messageCreate', async (message) => {
    if(message.content === "getAllSteamApps"){
        console.log("STARTED getAllSteamApps");
        try {
            const appListPromise  = SteamFreeGames.getAllSteamApps();
            const appList = await appListPromise;
            if (appList) {
              // Send the appList as a single message
              message.reply(`Here are the free Steam apps:\n${appList}`);
            } else {
              message.reply('Failed to retrieve the list of Steam apps.');
            }
          }catch{
            console.error('Error:', error);
            message.reply('An error occurred while retrieving the list of Steam apps.');
          }
    }else{
        console.log(message);
    }
})
client.login(process.env.TOKEN);

