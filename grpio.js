module.exports = {
    greet: function (bot, msg) {
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
    },
    farewell: function (bot, msg) {
        let user = msg.left_chat_member;
        let chatId = msg.chat.id;
        let group_name = msg.chat.title;

        notify_admin(chatId, `Usuario: ${user.first_name}\nAlias: ${user.username}\nYa no pertenece a: ${group_name}`.toString());

        bot.sendChatAction(chatId, "typing");
        bot.sendMessage(chatId, user.first_name + " ya no forma parte de *" + group_name + "*", {parse_mode: "Markdown"});
    }
}