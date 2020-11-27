const mineflayer = require('mineflayer')
const express = require("express")
const app = express()
const chalk = require("chalk");

const options = ({
	host: 'play.pixelempiresmc.net',
	port: 25565,
	username: process.argv[2],
	password: String(process.argv[3])
})

app.get("/", (req, res) => res.send(""))

console.log(chalk.green('Bot is starting...'));

const bot = mineflayer.createBot(options)

var users = ['ExpressCow30', 'xAdit', 'Advin'];

// Initial things when bot joins the server
bot.on('spawn', () => {
	console.clear();
    console.log(chalk.green("Bot has joined the server"))
    bot.chat('e');
})

// Commands that only authed users can run
bot.on('whisper', function(username, message) {
	if (username == bot.username) return;

	if (users.includes(username)) {
		if (message.includes("leave")) {
            console.log(chalk.red(username + "said to leave"));
            bot.chat(username + "said to leave");
			quitGame();
		}
	}
})

// Logs all chat messages in the console
bot.on('chat', function(username, message) {
	console.log(username + ": " + message)
});

bot.on('playerJoined', function(player) {
	setTimeout(function() {
		currentPlayers("joined")
	}, 2000);
})

function currentPlayers(action) {
	console.log(chalk.yellow("Someone " + action + ": " + Object.keys(bot.players)));
}

function quitGame() {
	bot.quit();
	console.log(chalk.red("Bot has left the server"))
}

bot.on('playerLeft', function(player) {
	currentPlayers("left");
})

// Logs info when kicked
bot.on('kicked', function(reason, loggedIn) {
	console.log(chalk.cyan("Kicked for " + reason + "while " + loggedIn))
});

// Calls people out when bed is broken
bot.on('spawnReset', () => {
	bot.chat('Who broke my bed');
})

// Has some fun with people when killed
bot.on('death', () => {
	bot.chat('why u got to be like dat');
})

bot.on('rain', () => {
    bot.chat('it appears to be raining');
})

app.listen(3000) // Keeping an open port for Uptime Robot