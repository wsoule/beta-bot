import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

const funnyMemes = ['https://tenor.com/view/opihomm-funny-funny-memes-gif-25834042'];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gif')
    .setDescription('sends a random gif!')
    .addStringOption(option =>
      option.setName('category')
        .setDescription('the gif category')
        .setRequired(true)
        .addChoices(
          { name: 'Funny', value: 'funny'},
          { name: 'Ballin', value: 'ballin'},
          { name: 'Movie', value: 'movie'}
        )
    ),
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const category = interaction.options.getString('category');
    let arr: string[] = [];
    switch(category) {
      case 'funny':
        arr = funnyMemes;
        break;
      case 'ballin':
        arr = ['ballin'];
        break;
      case 'movie':
        arr = ['movie'];
        break;
      default:
        arr = ['default'];
    }
    const selectVal = (length: number): number => {
      return (Math.floor(Math.random() * length));
    };
    const words = arr[selectVal(arr.length)];
    await interaction.reply(words);
  }
};
