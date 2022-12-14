import { ChatInputCommandInteraction, GuildMember, SlashCommandBuilder } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Provides information on the user'),
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const member: GuildMember = interaction.member as GuildMember;
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild
    await interaction.reply((interaction.member)
      ? `this command was run by ${interaction.user}, who joined on ${member.joinedAt}.`
      : 'No member'
    );
  }
};
