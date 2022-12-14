import { ChatInputCommandInteraction, SlashCommandBuilder, spoiler } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('spoil')
    .setDescription('reply to a message to set as a spoiler'),

  async execute(interaction: ChatInputCommandInteraction) :Promise<void> {
    await interaction.reply(spoiler(`Spoiled message from ${interaction.user}`));
  }
};
