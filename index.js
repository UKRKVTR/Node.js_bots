const { Telegraf } = require("telegraf");
require("dotenv").config();
const { BOT_TOKEN } = process.env;
const bot = new Telegraf(BOT_TOKEN);

const api = "https://russianwarship.rip/api/v2/statistics/latest";

let dataFromServer = [];
let kindOfStatistics = "increase";

function getDataFromServer(forceFetch = false) {
  if (!forceFetch) {
    return;
  }
  console.log("Go To Server");
  return fetch(api)
    .then((response) => response.json())
    .then((data) => {
      dataFromServer = data.data;
    });
}

bot.action("getDataByDay", (ctx) => {
  kindOfStatistics = "increase";
  ctx.reply("Статистика за день");
});
bot.action("getAllData", (ctx) => {
  kindOfStatistics = "stats";
  ctx.reply("Статистика за весь час");
});

// bot.start((ctx) => {
//   ctx.replyWithHTML("Welcome to my Bot");
// });
bot.hears(/Hi/i, (ctx) => {
  ctx.replyWithHTML("Hi from bot", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Ресурс", url: "https://russianwarship.rip/" }],
        [{ text: "Статистика за день", callback_data: "getDataByDay" }],
        [{ text: "Статистика вся", callback_data: "getAllData" }],
      ],
    },
  });
});

bot.hears(/[A-Z]+/i, async (ctx) => {
  const key = ctx.message.text;
  await getDataFromServer(dataFromServer.length == 0); // todo || dateFromServer != todayDate);
  ctx.reply(
    dataFromServer[kindOfStatistics][key] === undefined
      ? "Incorrect data"
      : `${dataFromServer[kindOfStatistics][key]}`
  );
});
bot.launch();
