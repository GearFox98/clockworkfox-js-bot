module.exports = {
	start: function (bot, msg){
		if(msg.chat.id > 0){
			let user = msg.from.first_name;
			bot.sendChatAction(msg.chat.id, "typing");
			
			bot.sendMessage(msg.chat.id, "¡Hola, "+ user +"! Soy Clockwork Fox\
			\nEstoy acá para dar la bienvenida a los nuevos miembros de tus grupos, también puedo ayudarte con algunos eventos que quieras hacer con amigos.\
			\
			\n\nSi quieres saber como hacer algunas cosas puedes usar /help");
		}
	}
}
