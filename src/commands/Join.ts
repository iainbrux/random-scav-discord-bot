import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
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

type JoinInteraction = Interaction & BaseCommandInteraction;

export const Join: Command = {
  name: "join",
  description: "Joins the chat",
  type: "CHAT_INPUT",
  run: async (client: Client, interaction: JoinInteraction) => {
    const adapterCreator = interaction.guild?.voiceAdapterCreator;
    const member = interaction.member as GuildMember;
    const channelId = member.voice.channelId;
    const guildId = interaction.guildId;

    if (!adapterCreator || !channelId || !guildId) {
      return;
    }

    let content = "";

    try {
      const connection = joinVoiceChannel({
        adapterCreator,
        channelId,
        guildId,
        selfDeaf: false,
        selfMute: false,
      });

      const player = createAudioPlayer();
      const resources = fs.readdirSync(join(__dirname, "../audio"));
      const randomIndex = Math.floor(Math.random() * resources.length);
      const resource = createAudioResource(
        fs.createReadStream(
          join(__dirname, `../audio/${resources[randomIndex]}`)
        )
      );

      console.log("randomIndex", randomIndex);

      const channelName = client.channels.cache.get(channelId);
      content = `Joined ${channelName}, upachki!`;

      connection.subscribe(player);
      player.play(resource);

      player.on(AudioPlayerStatus.Idle, () => connection.destroy());
    } catch (error) {
      content = `Cyka Blyat! Error with command /${interaction?.commandName}.`;
    }

    await (interaction as BaseCommandInteraction).followUp({
      ephemeral: true,
      content,
    });
  },
};
