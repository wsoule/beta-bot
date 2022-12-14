import { Events, Interaction } from 'discord.js';

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction: Interaction) : Promise<void> {
    if(!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was not found.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`Error executing ${interaction.commandName}`);
      console.error(error);
    }
  }
};
