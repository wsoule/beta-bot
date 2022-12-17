import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('get info about a user or the server')
    .addSubcommand(subcommand =>
      subcommand
        .setName('user')
        .setDescription('Info about user')
        .addUserOption(option => option.setName('target').setDescription('The user'))
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('server')
        .setDescription('Info about server')
    ),

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    if (interaction.options.getSubcommand() === 'user') {
      const user = interaction.options.getUser('target');
      if (user) {
        await interaction.reply(`Username: ${user.username}\nID: ${user.id}\nJoined at:`);
      } else {
        await interaction.reply(`Your Username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`);
      }
    } else if (interaction.options.getSubcommand() === 'server') {
      await interaction.reply(`Server name: ${interaction.guild?.name}\nTotal members: ${interaction.guild?.members}`);
    }
  }
};
