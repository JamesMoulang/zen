"use strict"

const _ = require('underscore');
const _s = require('underscore.string');
const Discord = require('discord.js');
const bot = new Discord.Client();
// Ask James for this file. Put it in the same directory as index.js
const token = require('./token');

bot.on('ready', () => {
  console.log('My ultimate (receive discord server events) is fully charged!');
});

const MessageRouter = require('./MessageRouter');
const MessageRoute = require('./MessageRoute');

bot.on('message', message => {
  // if (message.content === 'ping') {
  //   message.channel.sendMessage('pong');
  // }

  // if (message.content.indexOf('!repeat ') > -1) {
  // 	message.channel.sendMessage(message.content.replace('!repeat', ''));
  // }

  const router = MessageRoute(
  	/!.*/, 
  	/!/,
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