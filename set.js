const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEwxd3EwWWxGTFRONGpqYng0OEEzL2tLdUJWVUtEbklNWU9pTHhsVHRXMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0RGOFJJTlh4Ky9vTUtJb1I0bEVqZnhpeG1IRWZQKy9XZmFOaEdJMDJDRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyRmlLc2lsQUU2aWRJTi9xQVB0R3hVaVd0YXBpQm1LOXlpUmJGdVhrTjBjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKS2FtWVUwOE1NdytPdjZGQ3B5dDFpTkVRUTBnR054ZndFVHVYSmNHNzM0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklNRnBsSzNUK3ZHRERLNlRCSmxuRjhUYzVnSlBCMGI5bWhFRjVDeDFYVjg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9XdHQzakM1Q3NydXVpOVVZdUxlblIwMnhsUWEwQStOSFlmOHRQd3d4RGs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0YzV3hNSVE1WHdCeEtnQVNDSWlMWFJNeVE0YzVBVFJ6ZFpuNUlXSXhrUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibWdDV2Flb0JvSnVUOFZoUGlIcGplSkdNQ0ZubFhPSTZONG1ic0tQK2duMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Inc4YkdWL2ZpdVdBamkvQWxMWm9yNHBVci9lU2hseld0OHM0aVJPcm5uRVRkbys1TmVrYSs5UHRVMFZiaUdSY1o0ZnBscy8wYzVvdDl6WlpVN1lkR2hRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ0LCJhZHZTZWNyZXRLZXkiOiJOc3F6bzVzN0phTUVaWUtRL2JKeExWNVduT3VhdnB5cUt6alErMlF5NlJNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzMzU1MzM5ODEzOUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQTkxOTJFOEQyN0E0MjkxOUU0QSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUwODcwNzY4fV0sIm5leHRQcmVLZXlJZCI6NjEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo2MSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6ZmFsc2UsImFjY291bnQiOnsiZGV0YWlscyI6IkNMK3I1TnNGRU1YVjhNSUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJHNjhjQkttNGJ5bndJS1FScld1d2VrZkN5M0cwd2U2aEFRZTBHVTFxZ1dZPSIsImFjY291bnRTaWduYXR1cmUiOiIreFB2YldBNWY4YmQyZHFxSHl1ZGg0OTBNWnp1czVpSldSTzRFVG1QZkx4K0xyTnp1YzJUYlFvellpQ2c4aTB4aHlJdnV4bmFOaEMraEFzUFpIWnhpZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiTm9vcVhSSXJ0OUc4VHVDL2lqQkdERnl3MUVBdFk0bDFxR29FMHEvSXVmczVnd0VBdUl0MVJ1Q3FsU2EzckM2KzNWNTNqTDR1TWw0c2FNTWhTODhFaFE9PSJ9LCJtZSI6eyJpZCI6IjIzMzU1MzM5ODEzOTozOEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJOYW5hIGt3YWR3byIsImxpZCI6IjUyNTMxOTEyNzk4Mzc4OjM4QGxpZCJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzM1NTMzOTgxMzk6MzhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUnV2SEFTcHVHOHA4Q0NrRWExcnNIcEh3c3R4dE1IdW9RRUh0QmxOYW9GbSJ9fV0sInBsYXRmb3JtIjoic21iaSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSUFnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUwODcwOTI5LCJsYXN0UHJvcEhhc2giOiJubTNCYiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRGRhIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Nana kwadwo®",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "233553398139",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CHARLESKE-XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/p6uxq0.png',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
                  ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
                  CHARLESKE_CHATBOT : process.env.CHARLESKE_CHATBOT || 'yes',
                  ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'no',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
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
