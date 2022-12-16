import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies With Pong'),
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const wait = (await import('node:timers/promises')).setTimeout;
    await interaction.reply('Pong1!');
    await wait(1000);
    await interaction.followUp('check out the [github](https://github.com/wsoule/)!');
    const message = await interaction.fetchReply();
    console.log(message);
  }
};
