import { SlashCommandBuilder } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Provides information about the server'),
  async execute(interaction: any): Promise<void> {
    // interaction.guild is the object representing the Guild in which the command was run
    await interaction.reply(`This Server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members`);
  }
};
