"use strict"

const _ = require('underscore');
const _s = require('underscore.string');
const Discord = require('discord.js');
const bot = new Discord.Client();
// Ask James for this file. Put it in the same directory as index.js
const token = process.env.TOKEN || require('./token');
const production = process.env.NODE_ENV ? process.env.NODE_ENV === 'production' : false;

bot.on('ready', () => {
  console.log('Running in ' + (production ? 'production ' : 'staging ') + 'mode.');
});

const MessageRoute = require('./MessageRoute');

bot.on('message', message => {
  const router = MessageRoute(
    production ? /!.*/ : /_.*/, 
    production ? /!/ : /_/,
    MessageRoute(
      /repeat.*/, 
      /repeat /,
      (msg) => {
        console.log(msg.content);
        message.channel.sendMessage(msg.content);
      }
    ),
    MessageRoute(
      /reverse.*/, 
      /reverse /,
      (msg) => {
        console.log(msg.content);
        message.channel.sendMessage(_s.reverse(msg.content));
      }
    )
  );
  router(message);
});

// log our bot in
bot.login(token);