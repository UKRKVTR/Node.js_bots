const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const BOT_TOKEN =
  "MTE1NzY2MDMwMTM5MTU4MTIzNQ.GTZOpk.KgzSC78F9U0r-iLf8I4i78vV7ubbXYQx49CQSQ";

client.login(BOT_TOKEN);

client.once("ready", () => {
  console.log("bot started");
});

client.on("messageCreate", (message) => {
  if (message.content == "Hi") {
    message.reply("HI back");
  }
});
