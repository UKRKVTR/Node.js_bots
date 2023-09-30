const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const BOT_TOKEN =
  "MTE1NjkzNzUyMTQ0NDQzODEyOA.GR6vtl.KaDYqKsobmI6GSO-JU-cvVje22GybC0TRAcOxw";

client.login(BOT_TOKEN);

client.once("ready", () => {
  console.log("bot started");
});

client.on("messageCreate", (message) => {
  if (message.content == "Hi") {
    message.reply("HI back");
  }
});
