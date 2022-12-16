import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import config from './config.json';


// create client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');

async function getCommandFiles(): Promise<string[]>{
  return (await readdir(`${__dirname}/commands`)).filter(file => file.endsWith('js'));
}

(async (): Promise<void> => {
  const commandFiles = await getCommandFiles();
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command  = await import(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execut" property.`);
    }
  }
})();

const eventsPath = path.join(__dirname, 'events');

async function getEventFiles(): Promise<string[]> {
  return (await readdir(`${__dirname}/events`)).filter(file =>file.endsWith('.js'));
}

// When the client is ready, run this code (only once)
// use the 'c' for the event parameter to keep it separate from the already defience 'client'
(async(): Promise<void> => {
  const eventFiles = await getEventFiles();
  for(const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = await import(filePath);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
})();


// Log in to Discord with the client token
client.login(config.token);
