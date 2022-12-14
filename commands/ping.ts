import { SlashCommandBuilder } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies With Pong'),
  async execute(interaction: any): Promise<void> {
    await interaction.reply('Pong');
  }
};
