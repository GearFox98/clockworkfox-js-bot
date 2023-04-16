// Toolbox for administrating groups
module.exports = {
    warn: function (bot, msg, match) {
        return; // TODO
        /* Database look
        *  Id: unique Id
        *  Group Id
        *  User id
        *  Warn count
        */
    },
    mute: function (bot, msg, match) {
        return; // TODO
    },
    unmute: function (bot, msg, match) {
        return; // TODO
    },
    ban: function (bot, msg) {
        var chatId = msg.chat.id;
        var userId = msg.from.id;
        var replyId = msg.reply_to_message.from.id;
        var replyName = msg.reply_to_message.from.first_name;
        var fromName = msg.from.first_name;
        var messageId = msg.message_id;

        if (msg.reply_to_message == undefined){
            bot.sendMessage(chatId, "Responde al mensaje infractor con este comando.");
        }
        
        bot.getChatMember(chatId, userId).then(function(data){
            if((data.status == 'creator') || (data.status == 'administrator')){
            bot.banChatMember(chatId, replyId).then(function(result){
                    bot.deleteMessage(chatId, messageId);
                    bot.sendMessage(chatId, "El usuario " + replyName + " ha sido baneado.");
                });
            }
            else {
            bot.sendMessage(chatId, "Lo siento " + fromName + ", no eres administrador")
            }
        });
    },
    report: function (bot, msg, match){
        return; // TODO
    }
}