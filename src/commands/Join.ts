import {
  BaseCommandInteraction,
  Client,
  GuildMember,
  Interaction,
} from "discord.js";
import { handleJoinChannel } from "../helpers/handleJoinChannel";
import { Command } from "../Command";

type JoinInteraction = Interaction & BaseCommandInteraction;

export const Join: Command = {
  name: "join",
  description: "Joins the chat",
  type: "CHAT_INPUT",
  run: async (client: Client, interaction: JoinInteraction) => {
    const member = interaction.member as GuildMember;
    const channelId = member.voice.channelId;

    let content: string;

    try {
      handleJoinChannel(interaction);

      if (!channelId) {
        throw new Error();
      } else {
        const channelName = client.channels.cache.get(channelId);
        content = `Joined ${channelName}, upachki!`;
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
