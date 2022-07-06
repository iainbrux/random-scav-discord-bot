import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../Command";

export const Bye: Command = {
  name: "bye",
  description: "Returns a goodbye message",
  type: "CHAT_INPUT",
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const content =
      "Khot' mne tut pizdets kak ne nravitsya, no vykhoda u nas net";

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
