import { ChannelType, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Replies with your input!')
    .addStringOption(option =>
      option.setName('input')
        .setDescription('The input to echo back')
        .setRequired(true)
        .setMaxLength(2000)
    )
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('the channel to echo into')
        .addChannelTypes(ChannelType.GuildText)
    )
    .addBooleanOption(option =>
      option.setName('ephemeral-hidden')
        .setDescription('Whether or not the echo should be ephemeral')
    ),
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const response = interaction.options.getString('input');
    await interaction.reply(response ?? 'Nothing to echo');
  }
};
