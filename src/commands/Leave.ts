import {
  BaseCommandInteraction,
  Client,
  GuildMember,
  Interaction,
} from "discord.js";
import { Command } from "../Command";
import { getVoiceConnection } from "@discordjs/voice";

type LeaveInteraction = Interaction & BaseCommandInteraction;

export const Leave: Command = {
  name: "leave",
  description: "Leaves the chat",
  type: "CHAT_INPUT",
  run: async (client: Client, interaction: LeaveInteraction) => {
    const member = interaction.member as GuildMember;
    const channelId = member.voice.channelId;

    let content: string;

    try {
      if (!channelId || !interaction.guildId) {
        throw new Error();
      } else {
        const connection = getVoiceConnection(interaction.guildId);

        if (!connection) {
          throw new Error(`Error leaving channel ${interaction.guildId}`);
        }

        const channelName = client.channels.cache.get(channelId);
        content = `Left ${channelName}, до свидания!`;

        connection.destroy();
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
