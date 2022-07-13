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

export const Upachki: Command = {
  name: "upachki",
  description: "He'll say it for you!",
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
      const resource = createAudioResource(
        fs.createReadStream(join(__dirname, `../audio/scav6_mutter_06.wav`))
      );

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
