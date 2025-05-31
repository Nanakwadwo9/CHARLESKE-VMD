const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUdJWUdkWDRWZUw0dkdmamxsM1lWQlY0dHdyOTFvTVRhYnIzYitQMW5uQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVXJYeC9aZXBBNlkzWVNFdkFxQTQ4SnFIa3V2Z3ppS2EyTDRWdGJ3UmNTMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXSXFLRE1NQ3E1NFpaUHJneUxFR3lSZGVWQ3EwZk9CajFZTmQ4b2FsdWxJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJSY01wSG9ackxTL3IxM2libEtKK01RaENVZ3hSbjFudU5tLzZCYkRzOFJzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFOdjl1QmJYd3RPdFJqSVI5WHByeGRUcWhHYndGNUJIOStGaFFId0tWSHM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNIYmJXN2RrRytxazJKSXIzaGNhNUwzblZNOVZueE5xMUhVdlBoUWFkRlk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0JDQ1JFZWE2SDhteHEvWHlzaHF1bXJTU1lRaENkTnUrVnhTT1dOVHBsUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQXYySGdjQkZoMkRWc0pzUlFZTkRSVzJmaWtNYndHUS84Nkl4clhuSkloQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVCSVl2SjVLQlowckpVM3hIcis0eWp5eW03cFROaG9qWTlWVHVSWUk0U216USt2bFRzT3RGK2lPMW1uMloxV3kyaXVUTmhZK3hpUlVENldVTDFTcUJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjAsImFkdlNlY3JldEtleSI6IkhWNEVmd0xkVVhyNkJFNncxVEFaM1hxbm9QcWZuMk50eXJsbVJpQ25nRVE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjpmYWxzZSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tEajNiMEJFS3JDN01FR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkN3ZTMrK3A3UnVER0sxNEtLbzBNOGs1QW5CZ1M4UzQxSUluMlVkQlV0Q289IiwiYWNjb3VudFNpZ25hdHVyZSI6IllPWjgrcjF6M1hDTi9pWDVjUHhFVVAyWVBWS0NiejQ1am1vcldkTkE4OHFSdCsyUERocVVjZ2pBVGRxZEUxN0dTL2ZaMEdCU0FDOXh6eDdQTGRPbWhBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI3ZWlTL2lTOHlHeHVjWisxb2FHMStjMGNtZkxyTDJubFZrbWlRaGc0bTZUOC9SZ2tkVUN4bnVKSDJ6WTBpY0xyemFqM2NmbUpiUXFCMjhLM2hLRitCQT09In0sIm1lIjp7ImlkIjoiMjMzMjA2MTE1NjY0OjlAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxNjEyMzc1MDE1MDU3MDk6OUBsaWQifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjMzMjA2MTE1NjY0OjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUXNIdC92cWUwYmd4aXRlQ2lxTkRQSk9RSndZRXZFdU5TQ0o5bEhRVkxRcSJ9fV0sInBsYXRmb3JtIjoic21iaSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ4NzA1NTkxLCJsYXN0UHJvcEhhc2giOiIyUDFZaGYifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "COACH DERICK",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "233206115664",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CHARLESKE-VMD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'no',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

