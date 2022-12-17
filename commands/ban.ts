import { ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

module.exports = {
  data : new SlashCommandBuilder()
    .setName('ban')
    .setDescription('ban a selected member')
    .addUserOption(option =>
      option
        .setName('target')
        .setDescription('Member to ban')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('the reason for banning')
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
    .setDMPermission(false),

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const target = interaction.options.getUser('target');
    const result = interaction.options.getString('reason') ?? 'No Reason';

    if(target) {
      await interaction.reply(`Banning ${target.username} for reason: ${result}`);
      await interaction.guild?.members.ban(target);
    } else {
      await interaction.reply('No such member');
    }
  }

};
