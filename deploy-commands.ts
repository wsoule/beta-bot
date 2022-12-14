import { Command, REST, Routes } from 'discord.js';
import { clientId, token}  from './config.json';
import { readdir } from 'node:fs/promises';

//Grab all the command files from the commands directory created
export async function getCommands(): Promise<Command[]> {
  const files = (await readdir(`${__dirname}/commands`)).filter(file =>
    file.endsWith('.js')
  );
  const commands = [];
  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  for (const file of files) {
    const command = await import(`./commands/${file}`);
    commands.push(command.data.toJSON());
  }
  return commands;
}

// construct adn prepare an instance of the REST module
const rest = new REST({ version: '10'}).setToken(token);

// deploy the commands
(async (): Promise<void> => {
  const commands = await getCommands();
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);
    // console.log('commands', commands);
    // the put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands }
    ) as [];

    console.log(`Succesfully reloded ${data.length}`);
  } catch (error) {
    console.error(error);
  }

})();
