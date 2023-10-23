# chat-socketIO
Practica => Creacion de un chat sencillo utilizando Socket.IO

Conocimientos aplicados: 

Socket.io | JavaScript | CSS 3 | Node.js | Express.js | HTML | Consumo del API = https://random-data-api.com/api/users/random_user

En este ejecicio se consume un API gratis para la creacion de usuarios random, se guardan los msj en un objeto con 3 propiedades { username: xxxx, msg: xxxx, indice: xxxx} que se guarda en un array, estos datos se utilizan para mostrar el msj en el chat con el nombre del usuario, el indice es un consecutivo que se asigna a cada msg para poder llevar un consecutivo. 

Al perder la conexion de alguno de los usuarios y volver a reconectar con el servidor este recive el indice del ultimo msj mostrado y carga los que faltan y en caso de refrescar la pantalla, el chat se carga de nuevo con toda la conversacion que se ha guardado en la sesion de servidor.

