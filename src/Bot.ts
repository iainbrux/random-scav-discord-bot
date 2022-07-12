import { Client, Intents } from "discord.js";
import { config } from "./config";
import interactionCreate from "./listeners/interactionCreate";
import ready from "./listeners/ready";

console.log("Bot is starting...");

const token = config.token;

const clientIntents = new Intents();
clientIntents.add(
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_VOICE_STATES
);

const client = new Client({ intents: clientIntents });

ready(client);
interactionCreate(client);

client.login(token);
