const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid091ZUx0YnloalZ1K3JsaXNsamtna2pycG9LMGxmLzFscVQvT083SHFXVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVjBDWTZoNUVzWW54ck41Yk1nV0ZpckJaL3JNU0grVE5obmIxU1N4ZklTQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZQTFPbC9aMFlMZ3VNYXpVZ1E2eTgyNkZ3SnNOaFd1OW1pOVdrY1g5NVdzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzaGszdDBSNlF3d29RVHFQZHRXL3IwOWs1Smp6cjJob0ZmNnNGOFRwMVNJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdCTnJsODY3dGwxQ25Pa1Q3SzJtNWRKN0YveWNUdEpUdTJVbnJobGtzSDA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFtVVU4eGpYWnlDSUJ2aUx4UWZiTmc0K2U0aEpqTldya2F1Yndua1U0WFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0t3aW44Ulc2M1RVUlJCajd5aHFXYUtVVytXZlozUWRtYVFkR2dqekhHUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMFBVcFJHZTNGcGh0a1ErNDZReHlBNy8xSWMvQkY3dTRSY2lxRXhEYWVXMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZBVDBMbU8vaEthL3poNnNvNXVBQm5sT0t6OUZTdE8xUjAwN2tUSTVBTGdyOG9pd2M2OVhXV25NekNpdjdLVFQrMDVjVVE3RnBDMUU5Rnc4bitpbGdnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTEyLCJhZHZTZWNyZXRLZXkiOiJiaUxSN1pjQzJZTjFmUXIwRStmU05Dajc1MU45dkt1cVd4c1ZTa2taWi9rPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6ZmFsc2UsImFjY291bnQiOnsiZGV0YWlscyI6IkNMbTV2ZFlNRU5UbDhNSUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJHNjhjQkttNGJ5bndJS1FScld1d2VrZkN5M0cwd2U2aEFRZTBHVTFxZ1dZPSIsImFjY291bnRTaWduYXR1cmUiOiJUc0VrcUFCSmdKMmRzdHN5U2JhK1puOEJSdUMzOGxCNXN1OGxhbDgvdGppS2I2MmJIVFVIRlRBTXZqMUNjTmZYRW1wV3ZDQ05rTHZGVWYybUc2ZGVqUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiazBOVDBvZW5VK013cWNIVm9FdVhYaDFJTFRqeXBxQVdmdVpQTjRjWTlBaG91Q2Y0Vm9obzd6RUJud3R5cVp1a2E5L3RFeGxJL1drMzBzdHhOck1OaUE9PSJ9LCJtZSI6eyJpZCI6IjIzMzU1MzM5ODEzOTozOUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJOYW5hIGt3YWR3byIsImxpZCI6IjUyNTMxOTEyNzk4Mzc4OjM5QGxpZCJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzM1NTMzOTgxMzk6MzlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUnV2SEFTcHVHOHA4Q0NrRWExcnNIcEh3c3R4dE1IdW9RRUh0QmxOYW9GbSJ9fV0sInBsYXRmb3JtIjoic21iaSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSUFnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUwODcyODAxLCJsYXN0UHJvcEhhc2giOiJubTNCYiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTWpnIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "NANA KWADWO®",
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
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'yes',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
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
