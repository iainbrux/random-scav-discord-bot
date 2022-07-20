import {
  createAudioPlayer,
  createAudioResource,
  getVoiceConnection,
} from "@discordjs/voice";
import {
  BaseCommandInteraction,
  Client,
  GuildMember,
  Interaction,
} from "discord.js";
import { Command } from "../Command";
import { join } from "node:path";
import fs from "fs";
import { handleJoinChannel } from "../helpers/handleJoinChannel";

type MumbleInteraction = Interaction & BaseCommandInteraction;

export const Mumble: Command = {
  name: "mumble",
  description: "He'll say something, but what?",
  type: "CHAT_INPUT",
  run: async (client: Client, interaction: MumbleInteraction) => {
    const member = interaction.member as GuildMember;
    const channelId = member.voice.channelId;

    let content: string;
    let botAlreadyInVoiceChannel = false;

    try {
      if (getVoiceConnection(interaction?.guildId ?? "")) {
        botAlreadyInVoiceChannel = true;
      }

      const connection = handleJoinChannel(interaction);

      if (!connection || !channelId) {
        throw new Error("Error with connection");
      } else {
        const player = createAudioPlayer();
        const resources = fs.readdirSync(join(__dirname, `../audio`));
        const randomIndex = Math.floor(Math.random() * resources.length);
        const resource = createAudioResource(
          fs.createReadStream(
            join(__dirname, `../audio/${resources[randomIndex]}`)
          )
        );

        const channelName = client.channels.cache.get(channelId);
        content = `Joined ${channelName}!`;

        connection.subscribe(player);
        player.play(resource);

        if (!botAlreadyInVoiceChannel) {
          connection.destroy();
        }
      }
    } catch (error) {
      content = `Cyka Blyat! Error with command /${interaction?.commandName}.`;
    }

    await (interaction as BaseCommandInteraction).followUp({
      ephemeral: true,
      content,
    });
  },
};
