import express from "express";
import { createServer } from "http"
import { logIn } from "./handlers/index";
import cookieParser from "cookie-parser"
import { errorOut, permission } from "./middleware/index";
import { message, chat, user, group } from "./routers/index"
//import { alternateCookieParser } from "./alternateCookieParser";
import { Server as ioServer } from "socket.io"

const server = express();
const httpServer = createServer(server)
const io = new ioServer(httpServer/* ,
    {
        path: "http://localhost:3000/socketChat"
      } */
);

//const sessions = sessionMap
/* 
fetch('/logIn', {
    headers: { 'Content-Type': 'application/json'},
    method: 'POST',
    body:'{"username": "Hannover", "password": "666"}'
}).then(response=>response.text()).then(console.log)
 */

//(async() => {console.log( await bcryptjs.hash('adminPassword', 10))})()

server
    .get('/',
        cookieParser(),
        express.json(),
        permission(['user', 'admin', 'superAdmin']),
        (_, res) => {
            res.sendFile("/home/viktor/NodeJSTraining/TStraining/html/chatbox.html");
        }
    )
    .get('/home', (_, res) => {
        res.end('Sweet Home!')
    })
    /* .get('/socketChat', 
        cookieParser(),
        express.json(),
        (_, res) => {
        res.sendFile("/home/viktor/NodeJSTraining/TStraining/html/chatbox.html");
    }) */
    .post('/login',
        cookieParser(),
        express.json(),
        logIn,
        errorOut
    )
    .use('/message', message)
    .use('/chat', chat)
    .use('/user', user)
    .use('/group', group)


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});




httpServer
    .listen(3000, () => {
        console.log('launched', 'http://localhost:3000/home');
    })
