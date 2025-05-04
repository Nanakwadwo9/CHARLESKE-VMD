const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUI2VEZXVExhR1R1MWVOTmp1d1BVdmtsYXlENzNncFh3VVNaQnFqc0duVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicFNOenYyeHFXL0kvazlQb0Nma2ZUVWZWUWlxTGNrRFRJQnNmempJbkRtcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXSmpuNU1KbDZYV3JIMzNlaFhKQ2ZQSXBrMnVuOXJ0dzhMMGRyUnVGTFc0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPODNzUWkyVUZiWnlXVy9VUFN2ek9IdGtZbm1pcmFCdGhhbkx0bFdsZ2xBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNCUnpTeGVNbVJIcE93UklJanRpY3hVY2d4SmtrRDJFdUIrVUF0KzRIRlE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkR2dTlCakZOSHZiMG1mcG1PMG54c1F6aVJFNmNCL2RuY0FmOXhxc1Fwd0E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0lnK0NGNGpRMitMS1R1VWJyUGpyVERESGNQQVM3Z3YxRWtjMEZCZ0JHYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNDlRV3VPYUV2aFZqK2hnY010SFRLMy9qaU9qNVhwL3BLZlowekJiT3QwUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjlOenlURi9ZWWZnOXQ5WnNiWTNDek82SVJ1dFlhSjhIOGNuamRLUmx5d3piZ0xwRFlWWlcwSDBuaEFZUFl5dC9rMCt5THU0UUN0dkdFM2IzWGxRMWpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ5LCJhZHZTZWNyZXRLZXkiOiJqOTZPQWx3OUNZbDcvcWdCdGFsZnR3MkxYUFJoNkdxOTZnazJ6Y3p3ZmMwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzMzIwMjQyOTE4MkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQTU4OUE5QjAzMENDODU0RDVFNCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ2NDAxOTc3fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzMyMDI0MjkxODJAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiM0E3RUEzQzI5RDNGQTA1MThCRTMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NjQwMTk4Mn0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjMzMjAyNDI5MTgyQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNBMTUxRkY2MUQ0RjY1OUFBQTcyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDY0MDE5ODR9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InFqTkwzU2oyVFhTZDNFeklMOFFPd1EiLCJwaG9uZUlkIjoiNDk4MTE1MzctMzdmZC00NDBjLWE4YWEtZTUwY2VkZGYwYWUwIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJiWmpkZTRBUEhPNEt4anlQSDJONXkyanh4dz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNK2FWc3FMcFNBOHZNUm9IU3l2VFh2eWd3cm89In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRThGRlBUTUYiLCJtZSI6eyJpZCI6IjIzMzIwMjQyOTE4MjoxM0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJSRUdJTkEifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0t1VnphQUpFS24xMzhBR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Im1GR2VUZHg1OEFXMWptNHQxM3pDSGVXNmpVZGM5bG5ORUVDT21wU0ExMVU9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ik9RVVRUTk16QStHZVR4YWxNLytPQVJtVnZIRFpQNU5zQUg0Yk5CNmxCODhIbGFFbVVreHZlbXFUMDU0U0JXZWZ0ZFRzcHRrZlIwTkxid1gwUWlFQkF3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJSYTNuT3RKY1p4bUw1anVURW9jQTdXRFNLUW02WkVYWVg2K3pqcENrTnNVaGVuSDNKaXRibnRqZ3FKZTZ2a09vVkNDb1QwNFZ4dER0M1BVZ0NMVlVoUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzMzIwMjQyOTE4MjoxM0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJaaFJuazNjZWZBRnRZNXVMZGQ4d2gzbHVvMUhYUFpaelJCQWpwcVVnTmRWIn19XSwicGxhdGZvcm0iOiJzbWJpIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ2NDAxOTc1LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUM5VyJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Charles ke",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "233202429182",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CHARLESKE-VMD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
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

