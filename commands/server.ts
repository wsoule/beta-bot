import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Provides information about the server'),
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    // interaction.guild is the object representing the Guild in which the command was run
    await interaction.reply((interaction.guild)
      ? `This Server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members`
      : 'No Server'
    );
  }
};
