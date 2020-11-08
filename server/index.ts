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
  'a piece of :poop:',
  // courtesy of @jclaybacon
  'in the vents',
  'a neeeeeeerd',
  'eating fingers again',
  'awful at taking compliments',
  'terrible at doing math',
  'struggling with their -2000 IQ',
  'self-reporting',
  'the 3rd imposter',
  // courtesy of @nat
  'an idiot sandwich',
  'too pure, too baby',
];

const toasts = [
  'is super awesome',
  'is my best friend',
  'is a cool person',
  // couresy of @jclaybacon
  'YAS QUEEN :heart_eyes:',
  'is the best imposter',
  'you\'re doing amazing, sweetie',
  'is a legend',
  'is doing their best give them a break guys',
  'has a +2000 IQ',
  'lights up our lives',
  'is worth at least two corn chips',
  'knows how to party',
  'is a great friend',
  'is the best crewmate',
  'is the least sus',
  'can definitely do basic math',
  'is not a neeeeeerd',
];

client.on('message', message => {
  if (message.content.startsWith('!roast')) {
    if ((message.channel as Discord.TextChannel).id !== '769393944487788554') {
      message.reply(`No roasting outside the <#769393944487788554> you meanie`);
    } else if (message.mentions.users.size) {
      const taggedUser = message.mentions.users.first();
      const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
      message.channel.send(`<@${taggedUser?.id}> is ${randomRoast}`);
    }
  } else if (message.content.startsWith('!toast')) {
    if ((message.channel as Discord.TextChannel).id !== '769737506508767242') {
      message.reply(`Make your own toasts outside the <#769737506508767242>!`);
    } else if (message.mentions.users.size) {
      const taggedUser = message.mentions.users.first();
      const randomToast = toasts[Math.floor(Math.random() * toasts.length)];
      message.channel.send(`<@${taggedUser?.id}> ${randomToast}`);
    }
  } else if (message.content.startsWith('!roll')) {
    const [, num] = message.content.split(' ');
    const die = parseInt(num, 10);
    if (isNaN(die)) {
      message.channel.send(`${num} is not a number, <@${message.author?.id}>!`);
      message.channel.send(`!roast <@${message.author?.id}>`);
    } else {
      const randomNumber = Math.floor(Math.random() * die) + 1;
      message.channel.send(`<@${message.author?.id}> rolled a ${die}-sided die and got ${randomNumber}`);
    }
  }
});

const port = parseInt(process.env.PORT || '3001', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

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
