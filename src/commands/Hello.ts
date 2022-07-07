import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../Command";

export const Hello: Command = {
  name: "hello",
  description: "Returns a greeting",
  type: "CHAT_INPUT",
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const content = "Chiki-briki, pal'chik vykin";

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
