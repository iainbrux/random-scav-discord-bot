import { joinVoiceChannel } from "@discordjs/voice";
import { GuildMember, Interaction } from "discord.js";

export const handleJoinChannel = (interaction: Interaction) => {
  const adapterCreator = interaction.guild?.voiceAdapterCreator;
  const member = interaction.member as GuildMember;
  const channelId = member.voice.channelId;
  const guildId = interaction.guildId;

  if (!adapterCreator || !channelId || !guildId) {
    return;
  }

  const connection = joinVoiceChannel({
    adapterCreator,
    channelId,
    guildId,
    selfDeaf: false,
    selfMute: false,
  });

  return connection;
};
