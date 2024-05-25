require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const { getAllSteamApps } = require('./discordMessaging');
const { getCurrentFreeGames } = require('./steam');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log(`${c.user.tag} is running! Vroom Vroom!`);
});

client.on('messageCreate', async (message) => {
    if (message.content === "getAllSteamApps") {
        try {
            const response = await getAllSteamApps();  
        } catch (e) {
            console.error('An error occurred while retrieving the list of Steam apps., Error:', e);
        }
    } else if(message.content === "free"){
        try{
            const response = await getCurrentFreeGames();
            message.reply(response)
        }catch(e){
            console.error('An error occurred while retrieving the list of Steam apps., Error:', e);
        }
    }else {
        console.log(message);
    }
});

client.login(process.env.TOKEN);
