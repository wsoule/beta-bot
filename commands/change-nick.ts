import { ChatInputCommandInteraction, GuildMember, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nick')
    .setDescription('change your nickname')
    .addStringOption(option =>
      option
        .setName('nickname')
        .setDescription('new name')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname),

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const newNick = interaction.options.getString('nickname');
    const member: GuildMember = interaction.member as GuildMember;
    await interaction.reply(`${interaction.user.username}(${interaction.user}) changed thier nickname to ${newNick}`);
    member.setNickname(newNick);
  }
};
