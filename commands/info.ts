import { ChatInputCommandInteraction, Collection, GuildMember, SlashCommandBuilder } from 'discord.js';

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
      const user = interaction.options.getMember('target') as GuildMember;
      if (user) {
        await interaction.reply(`Username: ${user.displayName}\nID: ${user.id}\nJoined on: ${user.joinedAt?.toDateString()}`);
        user.send(`${interaction.user.username} says hi!`);
      } else {
        const member = interaction.member as GuildMember;
        await interaction.reply(`Your Username: ${interaction.user.username}\nYour ID: ${interaction.user.id}\nJoined on: ${member.joinedAt?.toDateString()}`);
      }
    } else if (interaction.options.getSubcommand() === 'server') {
      await interaction.deferReply();
      if(interaction.guild){
        const clientCache = interaction.client.guilds.cache.get(interaction.guild.id);
        const members = clientCache?.members;
        let membersList: Collection<string, GuildMember> | undefined;
        const memberNames: string[] = [];
        const memberNickNames: string[] = [];
        (async (): Promise<void> => {
          membersList = await members?.fetch();
          const usernameColumnLength = Math.max(...(membersList?.map((m) => m.user.username.length) ?? [0])) + 4;
          membersList?.forEach(member => {
            memberNames.push(member.user.username);
            memberNickNames.push(member.nickname ?? member.user.username);
          });
          let membersListStr = '';
          for (let i = 0; i < memberNames.length; ++i) {
            const name = memberNames[i];
            const space = ' '.repeat(usernameColumnLength - name.length);
            membersListStr += `\`\`\`${name}${space}:\t\t${memberNickNames[i]}\`\`\``;
          }
          const str = `Server name: ${interaction.guild?.name}\nTotal members: ${interaction.guild?.memberCount}`;
          let usernameTitle = 'USERNAME';
          usernameTitle += ' '.repeat(usernameColumnLength - usernameTitle.length);
          await interaction.editReply(`\`\`\`${str}\`\`\` \`\`\`${usernameTitle}:\t\tNICKNAME\`\`\` ${membersListStr}`);
        })();
      }
    }
  }
};
