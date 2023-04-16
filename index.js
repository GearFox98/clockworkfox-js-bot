console.log("Winding up...");

require('dotenv').config();

// Imports
const hello = require('./hello');
const admin_tool = require('./toolbox');
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

/*bot.onText(/\/b/, (msg) => {
    var chatId = msg.chat.id;
    var chatName = msg.chat.first_name;
    var issuerId = msg.from.id;
    var issuerMsg = msg.message_id;
    if (chatId < 0) {
        var replyId = msg.reply_to_message.from.id;
        var replyName = msg.reply_to_message.from.first_name;
    }
    else {
        var replyId = 'Group';//msg.reply_to_message.from.id;
        var replyName = 4;//msg.reply_to_message.from.first_name;
    }

    console.log(`Chat Id: ${chatId}\
    \nChat Name: ${chatName}\
    \nIssuer Id: ${issuerId}\
    \nIssuer Meassge: ${issuerMsg}\
    \nReply Name: ${replyName}\
    \nReply Id: ${replyId}`);

    bot.getChatMember(chatId, issuerId).then((issuer) => {
        console.log(issuer);
        if (replyId == undefined || chatId > 0){
            bot.sendMessage(chatId, "Esta acción solo está disponible en *Grupos*.", {parse_mode: 'Markdown'});
            return;
        }

        if (issuer.status == 'creator' || issuer.status == 'administrator') {
            if (issuer.status != 'creator' && user == 'administrator')
            bot.banChatMember(chatId, replyId).then((drop) => {
                console.log(`Banned ${replyName} from chat ${chatName}`);
                bot.deleteMessage(chatId, issuerMsg);
                bot.sendMessage(chatId, "Usuario: *" + replyName + "* ha sido expulsado de *" + chatName + "*.", {parse_mode: 'Markdown'});
            }
            )
        }
        else {
            bot.sendMessage(chatId, "Lo siento, pata esta acción debes ser *Administrador*.", {parse_mode: 'Markdown'});
        }
    })
});*/

console.log("Clockwork Fox is now running");