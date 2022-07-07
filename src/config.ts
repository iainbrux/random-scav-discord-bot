import dotenv from "dotenv";
dotenv.config();

export const config = {
  token: process.env.DISCORD_BOT_TOKEN,
  clientId: process.env.BOT_CLIENT_ID,
};
