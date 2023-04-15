console.log("Winding up...");

require('dotenv').config();

// Imports
const hello = require('./hello');
//const grpio = require('./grpio');
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TOKEN;

// Bot
const bot = new TelegramBot(token, {polling: true});

// Function
function notify_admin(chatId, text){
    bot.getChatAdministrators(chatId).then((value) => {
        let date = new Date();
        let current_date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

        text += "\nCercano a la fecha: " + current_date;

        value.forEach((admin) => {
            try {
                bot.sendChatAction(admin.user.id, "typing");
                bot.sendMessage(admin.user.id, text);
            } catch (error) {
                console.log(error);
            }
        });
    });
}

// Commands
bot.onText(/\/start/, (msg) => {
    hello.start(bot, msg);
});

// Greet and farewell
bot.on("new_chat_members", (msg) => {
    let chatId = msg.chat.id;
    let group_name = msg.chat.title;

    msg.new_chat_members.forEach((user) => {
        console.log(user);

        bot.sendChatAction(chatId, "typing");

        notify_admin(chatId, `Usuario: ${user.first_name}\
        \nAlias: ${user.username}\
        \nSe ha unido a: ${group_name}`);

        if(user.is_bot){
            bot.sendMessage(chatId, "El bot: *" + user.first_name + "*, ha sido añadido a *" + group_name + "*", {parse_mode: "Markdown"});
        }
        else{
            bot.sendMessage(chatId, "Hola " + user.first_name + ", bienvenido al grupo *" + group_name + "*", {parse_mode: "Markdown"});
        }
    });
});

bot.on("left_chat_member", (msg) => {
    let user = msg.left_chat_member;
    let chatId = msg.chat.id;
    let group_name = msg.chat.title;

    notify_admin(chatId, `Usuario: ${user.first_name}\nAlias: ${user.username}\nYa no pertenece a: ${group_name}`.toString());

    bot.sendChatAction(chatId, "typing");
    bot.sendMessage(chatId, user.first_name + " ya no forma parte de *" + group_name + "*", {parse_mode: "Markdown"});
});

bot.onText(/\/adm/, (msg) => {
    notify_admin(msg.chat.id, `It works!!`);
});

console.log("Clockwork Fox is now running");