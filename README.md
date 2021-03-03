# API MERN Chat

Backend de una aplicación de mensajería en tiempo real.

## Construido utilizando:

- NodeJS y Express.js.
- Implementado con [Socket.io](https://socket.io/) para recibir y enviar mensajes en tiempo real a multiples clientes.
- Base de datos en MongoDB, implementada con Mongoose y hosteada en MongoAtlas.
- CRUD para editar, eliminar, listar o crear mensajes.
- Multer para subir archivos estáticos al servidor (imagenes, en este caso).

## Endpoints:

### /message

- **[GET]** /message - Obtiene todos los mensajes.
- **[GET]** /message/:chatId - Obtiene todos los mensajes de un chat.
- **[POST]** /message - Crea un nuevo mensaje en un chat.
- **[PATCH]** /message/:id - Modifica un mensaje existente.
- **[DELETE]** /message/:id - Elimina un mensaje existente.

### /user

- **[GET]** /user - Obtiene todos los usuarios.
- **[POST]** /user - Crea un nuevo usuario.

### /chat

- **[GET]** /chat/:userId - Obtiene todos los chats de un usuario.
- **[POST]** /chat - Crea un nuevo chat.
