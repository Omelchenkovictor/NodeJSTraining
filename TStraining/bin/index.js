"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const index_1 = require("./handlers/index");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_2 = require("./middleware/index");
const index_3 = require("./routers/index");
//import { alternateCookieParser } from "./alternateCookieParser";
const socket_io_1 = require("socket.io");
const sessionControl_1 = require("./InnerData/sessionControl");
const alternateCookieParser_1 = require("./alternateCookieParser");
const GetData_1 = require("./InnerData/GetData");
const server = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(server);
const io = new socket_io_1.Server(httpServer /* ,
    {
        path: "http://localhost:3000/socketChat"
      } */);
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
    .get('/', (0, cookie_parser_1.default)(), express_1.default.json(), (0, index_2.permission)(['user', 'admin', 'superAdmin']), (_, res) => {
    res.sendFile("/home/viktor/NodeJSTraining/TStraining/html/chatbox.html");
})
    .get('/home', (_, res) => {
    res.end('Sweet Home!');
})
    /* .get('/socketChat',
        cookieParser(),
        express.json(),
        (_, res) => {
        res.sendFile("/home/viktor/NodeJSTraining/TStraining/html/chatbox.html");
    }) */
    .post('/login', (0, cookie_parser_1.default)(), express_1.default.json(), index_1.logIn, index_2.errorOut)
    .use('/message', index_3.message)
    .use('/chat', index_3.chat)
    .use('/user', index_3.user)
    .use('/group', index_3.group);
io.on('connection', async (socket) => {
    try {
        const cookieMap = (0, alternateCookieParser_1.alternateCookieParser2)(socket.request.headers.cookie);
        let chatId = (0, GetData_1.StringParser)(socket.request.headers.referer).chatId;
        let session = (0, sessionControl_1.accessSession)(cookieMap.sessionId);
        let banned = await (0, GetData_1.isChatBanned)(session.id, chatId);
        if (session.role == 'superAdmin'
            || await session.groups.find((element) => element.group.chats.find((element1) => element1.id == chatId) && element.isAdmin) != undefined
            || (await session.groups.find((element) => element.group.chats.find((element1) => element1.id == chatId)) != undefined
                && (banned == null || !banned.isBanned))) {
            socket.join(chatId.toString());
            const history = await (0, GetData_1.chatHistory)(chatId);
            console.log(history.messages);
            history.messages.reverse().forEach(async (element) => {
                await io.to(socket.id).emit('chat message', await (0, GetData_1.getUsername)(element.userId) + ": " + element.text);
            });
            console.log('a', cookieMap.user, 'connected');
            socket.on('chat message', (msg) => {
                // console.log('message: ' + msg);
                // console.log(socket.request.headers.cookie);
                let message = {
                    text: msg,
                    userId: session.id,
                    chatId: chatId
                };
                (0, GetData_1.createMessage)(message);
                io.to(chatId.toString()).emit('chat message', cookieMap.user + ": " + msg);
            });
            socket.on('disconnect', () => {
                console.log('a', cookieMap.user, 'disconnected');
            });
        }
        else {
            io.emit('error', 'error 403:' + ' ' + cookieMap.user + ' connection refused');
        }
    }
    catch (error) {
        console.log(error);
        io.emit('error', error);
    }
});
httpServer
    .listen(3000, () => {
    console.log('launched', 'http://localhost:3000/home');
});
