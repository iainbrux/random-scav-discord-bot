import { Client } from "discord.js";
import { config } from "./config";

console.log("Bot is starting...");

const client = new Client({
  intents: [],
});

// client.login(config.token);

console.log("Succesfully logged in...");
