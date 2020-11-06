import { createServer } from 'http'
import next from 'next'
import Discord from 'discord.js';

const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

const roasts = [
  'sus',
  'an imposter',
  'Jack',
  'Kody',
  'a piece of :poop:'
];

client.on('message', message => {
  if (message.content.startsWith('!roast')) {
    if ((message.channel as Discord.TextChannel).id !== '769393944487788554') {
      message.reply(`No roasting outside the <#769393944487788554> you meanie`);
    } else if (message.mentions.users.size) {
      const taggedUser = message.mentions.users.first();
      const user = message.author;
      const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
      message.channel.send(`<@${user?.id}> says <@${taggedUser?.id}> is ${randomRoast}`);
    }
  }
});

const port = parseInt(process.env.PORT || '3001', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

console.log(process.env.TOKEN);

client.login(process.env.TOKEN);

app.prepare().then(() => {
  createServer(() => {
  }).listen(port)

  // tslint:disable-next-line:no-console
  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  )
})
