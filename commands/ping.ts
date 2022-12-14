import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies With Pong'),
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.reply('Pong');
  }
};
