import { BaseCommandInteraction, Client, Interaction } from "discord.js";
import { handleJoinChannel } from "../helpers/handleJoinChannel";
import { Commands } from "../Commands";

const timeouts: NodeJS.Timeout[] = [];

export default (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenu()) {
      await handleSlashCommand(client, interaction);
    }
  });
};

const handleSlashCommand = async (
  client: Client,
  interaction: BaseCommandInteraction
): Promise<void> => {
  const slashCommand = Commands.find((c) => c.name === interaction.commandName);
  if (!slashCommand) {
    interaction.followUp({ content: "An error has occurred" });
    return;
  }

  await interaction.deferReply();

  try {
    const connection = handleJoinChannel(interaction);

    if (!connection) {
      throw new Error("Voice Channel Connection could not be established.");
    }

    // If we have active timeouts, we want to clear those and ensure the most
    // recently added timer is in there as we can't check the event loop
    if (timeouts.length > 0) {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    }

    timeouts.push(setTimeout(() => connection.destroy(), 300_000));
  } catch (error) {
    console.log("Error", error);
  }

  slashCommand.run(client, interaction);
};
