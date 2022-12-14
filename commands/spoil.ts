import { SlashCommandBuilder } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('spoil')
    .setDescription('reply to a message to set as a spoiler'),

  async execute(interaction: any):Promise<void> {
    await interaction.reply(`Spoiled message from ${interaction.user}`);
  }
};
