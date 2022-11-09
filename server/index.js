import express from "express";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import http from "http";
import cors from "cors";

const app = express();
const server = http.createServer(app);

const io = new SocketServer(server, {
    cors:{
        origin:'*'
    }
});

app.use(cors());
app.use(morgan("dev"));

io.on('connection', (socket) => {
    console.log("Un usuario conectado", socket.id);

    socket.on('mensaje', (mjs) =>{
        socket.broadcast.emit('mensaje', {
            body:mjs,
            from : socket.id
        });
    })

});

server.listen(5000, () => {
  console.log(`Servidor corriendo desde el puerto 5000`);
});