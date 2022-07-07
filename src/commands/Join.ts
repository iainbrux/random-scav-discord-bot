// 478686889562472453

import { joinVoiceChannel } from "@discordjs/voice";
import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../Command";

export const Join: Command = {
  name: "join",
  description: "Joins the chat",
  type: "CHAT_INPUT",
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const content = `Joining channel ${interaction.channelId}...`;
    const adapterCreator = interaction.guild?.voiceAdapterCreator;
    const channelId = interaction.channel?.id;
    const guildId = interaction.guild?.id;

    if (!adapterCreator || !channelId || !guildId) {
      return interaction.channel?.send("Error joining channel.");
    }

    joinVoiceChannel({
      adapterCreator,
      channelId,
      guildId,
    });

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
