import express from "express";
import logger from "morgan";

import { Server } from "socket.io";
import { createServer } from "node:http";

import dotenv from "dotenv";
dotenv.config();

//import { createClient } from "@libsql/client"

const port = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, { connectionStateRecovery: {} });
let message = [];
let indice = message.length || 0;

io.on("connection", (socket) => {
  console.log("a user has connected");

  socket.on('disconnect', () =>{
    console.log(`user disconnected ${socket.id}`);
  })

  socket.on("chat message", (msg) => {
    console.log("Ingreso nuevo msj", socket.handshake.auth);
    const chat = {
      user: socket.handshake.auth.username,
      msg: msg,
      indice: indice++,
    };
    message.push(chat);

    if (msg != "") {
      console.log(`Como msg es diferente de "" entonces vemos =>`, message);
    }

    io.emit("chat message", chat);
  });

  if(!socket.recovered){
    try {
      let finLi = socket.handshake.auth.indice ?? 0;
      console.log(indice, message.length)
      if (finLi <= (message.length + 1) ) {
        let result = message.filter((chat) => chat.indice >= finLi)
        console.log(result)

        result.forEach(function (objeto) {
          io.emit("chat message", objeto);
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
});

app.use(logger("dev"));

app.get("/", (reg, res) => {
  res.sendFile(process.cwd() + "/client/index.html");
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
