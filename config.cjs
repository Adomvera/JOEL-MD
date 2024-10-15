// config.js
const fs = require("fs");
require("dotenv").config();

const config = {
  SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUIyZXQxcVVhQkNKdHpuZ214cXNGV3A1VkU2Q2phMzdBbnJnbm5KRkwwaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU2hNeXJCL3Z3REpIbkhqTVNHVkNwWnQxbHFSY09oVGlVL0FMekdLYXZtaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNSHJwbk9pVWYyZ2tqT0F2NzZQelZMb2FBVXNpTDBEd0thMldzWDFMYkg4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKYkVQUS94S0pDemluQVFic3E4Vjd1citKSkprUzVPZTlVSkRidkJZbHlRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFKSG1Fcmh0M3RFVVlJTFo4eTJjdHE1dlg3RDRsZjk0aHhBNGtoRnFUbGM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFzT01FSEdIMEpKYjBJY2hlVVpKYWx6Q1hZWGtDTHJlNDRkTmhKdFdMSFU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUVB5S2dsYUhmaGo4TmJqY2Y5c3RGRHoxakY4YVZ1OXU5WDh0MEVQTHJrUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibHRnWXo5KzEveHBiaGxWQ0NkU3czQ25yZ1pRNXFPbFFnQml5WTU0bEZWbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InV4U0JTa2RoME5FSFdOSjdWeHZxcnE0U2RwYTdqc1B2NnNCOHhEdVFMUGJ3eExKeFh5Vjh1bW45L3FaNmZOMkI2THVwdjNpcncrRXZDd0NtcXNob2h3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTksImFkdlNlY3JldEtleSI6IjdTRU8vNkhPSDVSOUNZNUFrWWFkTnlHNWlGbEtqNmNIUXhjT3I2OVJHNjA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImkxU1pidUhTUW02SkR3Uy1mV2tFWXciLCJwaG9uZUlkIjoiOTNlODFlYzctZmYwYS00MzQwLTkxZWMtZGYyNmZiNDUyYTNlIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Inp0clh3akp0OFIzYXNqdFNRSURpRERCNzBQVT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1RmNWb0ZEZ2dmVTVtalZwdCtvblA5RUJTRUE9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiOEQ0SFJMN0EiLCJtZSI6eyJpZCI6IjIzMzU5MTg1NjYzMDo0MUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSW5uenRjRkVLem9yYmdHR0JJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZU1QR2cvdE9mVEtmUVVkZE1XVkI3MllvV0gvdVNFdUUyS0NlM0dTUjAyWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoic0RxUTVqV0FJSzdsZXlLclI3dXlaZU9ZakcyU3hEOHlNenhxZFE1NGhpNllTc3dJcE8wQW5nRWpvbm9QQk5RY3lCN3BrZWVQU2FJaC8yYkQ4L01WQ0E9PSIsImRldmljZVNpZ25hdHVyZSI6ImRuL3NFeUFxbmY3NWNBQVAzUzcvaDhuMXdCaEFzMkNWeEQyWldJdHlwOTNJNWY1QnFxTlJTc1N1M2t6QjFVK1hPYWEvazZXcVFjRi9yQ3RnU0gvZGhBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjMzNTkxODU2NjMwOjQxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlhqRHhvUDdUbjB5bjBGSFhURmxRZTltS0ZoLzdraExoTmlnbnR4a2tkTm0ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mjg4MDM4OTYsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBR1M4In0=",
  PREFIX: process.env.PREFIX || '.',
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN !== undefined ? process.env.AUTO_STATUS_SEEN === 'true' : true, 
  AUTO_DL: process.env.AUTO_DL !== undefined ? process.env.AUTO_DL === 'true' : false,
  AUTO_READ: process.env.AUTO_READ !== undefined ? process.env.AUTO_READ === 'true' : false,
  AUTO_TYPING: process.env.AUTO_TYPING !== undefined ? process.env.AUTO_TYPING === 'true' : false,
  AUTO_RECORDING: process.env.AUTO_RECORDING !== undefined ? process.env.AUTO_RECORDING === 'true' : false,
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE !== undefined ? process.env.ALWAYS_ONLINE === 'true' : true,
  AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'true' : false,
   /*auto block only for 212 */
  AUTO_BLOCK: process.env.AUTO_BLOCK !== undefined ? process.env.AUTO_BLOCK === 'true' : false,
  
  
  REJECT_CALL: process.env.REJECT_CALL !== undefined ? process.env.REJECT_CALL === 'true' : true, 
  NOT_ALLOW: process.env.NOT_ALLOW !== undefined ? process.env.NOT_ALLOW === 'true' : true,
  MODE: process.env.MODE || "public",
  OWNER_NAME: process.env.OWNER_NAME || "𝙻𝚘𝚛𝚍 𝚓𝚘𝚎𝚕",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "233591856630",
  GEMINI_KEY: process.env.GEMINI_KEY || "AIzaSyCUPaxfIdZawsKZKqCqJcC-GWiQPCXKTDc",
  WELCOME: process.env.WELCOME !== undefined ? process.env.WELCOME === 'true' : false, 
};


module.exports = config;
