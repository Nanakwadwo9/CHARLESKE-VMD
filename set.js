const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0Jlb0w1eGs2dlVFUDFMcE8vY0QrcG1HaFRndUN0a0NWQWZPd1loaTcwVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicTVKNm44emtiMjgrVGplRVdGSXdYTzlpY3ZpQmx4YUpLNWlZYXpqUzVHWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtSjAwb2ErN05OS2psM0d0elMyVXkrMXU1ZkwwMXhsaWpvUGI2aG1HamtFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzMTl0TmgwNVZRRm93UWZjNGxCZG0zT3JCeElweFRFV3JaK0V0WlRGN2dFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9JUDdBcDBCOUpjNTV1QkEzR3pEc3RtNVNsODRhQ0VVSnRwRElPUWREMFU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImprRmlmQWVKdkFFYitnWG1NZWRyTGZJUFZHdjBTZVZpdEJ5NUhBTmhSQjQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYU5FRmVFWGxCakRmcm4vRmpLdHNIdU9ZQ2dHRTNxdWdHTkRNbXYrTExGMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ1krQVpxNFFDN3hjekxZTEEzQ3BIVE9DU0VyREFZOS9PZjgrQmZWRm5Wbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ill2bDNnaDFpQk9FZUlqb2FsUkhYVTZsajluWkp1V1Naa2NJSnpSenl5ZGpCdENmUkcra3RKQzBWWTlBb25SU2xERG02YjVyQkJWOHVKZ1RZbWtNd2dnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTA3LCJhZHZTZWNyZXRLZXkiOiJXUG1KcTd6d3c2QnhjLytVK2pNNVdhVjh6NUxkYmoyUy85SXNycG05d240PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzMzIwMjQyOTE4MkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQTI5NEQ1ODRDRUYzNjFGRDkyNSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ2Mzk5OTI3fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzMyMDI0MjkxODJAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiM0FGMkREMjBFMjRENEU1ODI1NzcifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NjM5OTkyOX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjMzMjAyNDI5MTgyQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNBMUREQjJDQjZFODczODhFQjYzIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDYzOTk5MzF9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjdLSk0zOGtiU0FlT0djaWZpazQzVlEiLCJwaG9uZUlkIjoiZjI3YmFkYjctNDZkYS00ODc4LTgzNTEtZTYyMmEzNmJlYWY2IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ind1U0V2cDJnVVYvQlZ3MzY3L1R4VEp5SWh3TT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2YlhGS2xWSi9TYTRWVzdjWTlXMk9QMEJJWGs9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiVk4zWVROWjEiLCJtZSI6eyJpZCI6IjIzMzIwMjQyOTE4MjoxMkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJSRUdJTkEifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0t1VnphQUpFS2psMzhBR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Im1GR2VUZHg1OEFXMWptNHQxM3pDSGVXNmpVZGM5bG5ORUVDT21wU0ExMVU9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkUzME4za2xCeHdxNlFza0VmVE5ENU1lRmM3TC9jdXI4ZU41RFc3Z3FaOVMrUXliMDNhWjh2eHBNVzJEeTNYdk1wRndLcE8yaXY0SzlzNXVKejUyWkNnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIwaW1pcG1GOWMxdkg5czNqODBtM3RxSVBpYkp3Sm9iekZmNjFBVXo4L2Z0czJvb1Vka3VJKzg3VW43YklqSFZwdUpnNElmRFBhM0pZYnVOUXFlZ1Fpdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzMzIwMjQyOTE4MjoxMkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJaaFJuazNjZWZBRnRZNXVMZGQ4d2gzbHVvMUhYUFpaelJCQWpwcVVnTmRWIn19XSwicGxhdGZvcm0iOiJzbWJpIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ2Mzk5OTI1LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUM5VyJ9',
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

