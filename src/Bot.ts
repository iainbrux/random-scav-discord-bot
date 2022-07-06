import { Client } from "discord.js";
import { config } from "./config";
import interactionCreate from "./listeners/interactionCreate";
import ready from "./listeners/ready";

console.log("Bot is starting...");

const token = config.token;

const client = new Client({
  intents: [],
});

ready(client);
interactionCreate(client);

client.login(token);
