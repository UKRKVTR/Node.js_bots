const { Telegraf } = require("telegraf");
require("dotenv").config();
const { BOT_TOKEN } = process.env;
const bot = new Telegraf(BOT_TOKEN);

const api = "https://russianwarship.rip/api/v2/statistics/latest";

let dataFromServer = [];
function getDataFromServer(forceFetch = false) {
  if (!forceFetch) {
    return;
  }
  console.log("Go To Server");
  return fetch(api)
    .then((response) => response.json())
    .then((data) => {
      dataFromServer = data.data.increase;
    });
}

bot.start((ctx) => {
  ctx.replyWithHTML("Welcome to my Bot");
});
bot.hears(/Hi/i, (ctx) => {
  ctx.reply("Hi from bot");
});

bot.hears(/[A-Z]+/i, async (ctx) => {
  console.log(ctx.message.text);
  const key = ctx.message.text;
  await getDataFromServer(dataFromServer.length == 0); // todo || dateFromServer != todayDate);
  ctx.reply(`${dataFromServer[key]}`);
});
bot.launch();
