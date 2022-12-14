import { Client, Events } from 'discord.js';

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client: Client): void {
    if(client.user) {
      console.log(`Ready! Logged in as ${client.user.tag}`);
    }
  }
};
