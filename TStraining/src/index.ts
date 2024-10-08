import express from "express";
import { createServer } from "http"
import { logIn } from "./handlers/index";
import cookieParser from "cookie-parser"
import { errorOut, permission } from "./middleware/index";
import { message, chat, user, group } from "./routers/index"
//import { alternateCookieParser } from "./alternateCookieParser";
import { Server as ioServer } from "socket.io"
import { accessSession } from "./InnerData/sessionControl";
import { alternateCookieParser2 } from "./alternateCookieParser";
import { chatHistory, createMessage, isChatBanned, StringParser } from "./InnerData/GetData";

const server = express();
const httpServer = createServer(server)
const io = new ioServer(httpServer);

//const sessions = sessionMap
/* 
fetch('/logIn', {
    headers: { 'Content-Type': 'application/json'},
    method: 'POST',
    body:'{"username": "SuperAdmin", "password": "1234"}'
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


io.on('connection', async (socket) => {

    try {
        const cookieMap = alternateCookieParser2(socket.request.headers.cookie);
        let chatId: any = StringParser(socket.request.headers.referer).chatId;
        let session = accessSession(cookieMap.sessionId)
        let banned = await isChatBanned(session.id, chatId)


        if (session.role == 'superAdmin'
            || await session.groups.find((element: any) =>
                element.group.chats.find((element1: any) =>
                    element1.id == chatId) && element.isAdmin) != undefined
            || (await session.groups.find((element: any) =>
                element.group.chats.find((element1: any) =>
                    element1.id == chatId)) != undefined
                && (banned == null || !banned.isBanned))) {



            socket.join(chatId.toString());
            const history = await chatHistory(chatId)
            io.to(socket.id).emit('history', history)
            console.log('a', cookieMap.user, 'connected');



            socket.on('chat message', (msg) => {

                let message = {
                    text: msg,
                    userId: session.id,
                    chatId
                }
                createMessage(message)
                io.to(chatId.toString()).emit('chat message', cookieMap.user + ": " + msg);
            });




            socket.on('disconnect', () => {
                console.log('a', cookieMap.user, 'disconnected');
            });
        }
        else {
            io.emit('error', 'error 403:' + ' ' + cookieMap.user + ' connection refused');
        }

    } catch (error) {
        console.log(error);
        io.to(socket.id).emit('error', 'Error 500');
    }


});







httpServer
    .listen(3000, () => {
        console.log('launched', 'http://localhost:3000/home');
    })
