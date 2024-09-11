"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("./handlers/index");
//import { sessionId } from "./middleware/sessionId";
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_2 = require("./middleware/index");
//import { sessionMap } from "./InnerData/sessionControl";
const server = (0, express_1.default)();
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
    .get('/home', (_, res) => {
    res.end('Hello there!');
})
    .post('/login', (0, cookie_parser_1.default)(), express_1.default.json(), index_1.logIn, index_2.errorOut)
    .post('/post/user', (0, cookie_parser_1.default)(), express_1.default.json(), index_1.postUser, index_2.errorOut)
    .post('/post/message', (0, cookie_parser_1.default)(), express_1.default.json(), (0, index_2.permission)(['user', 'admin', 'superAdmin']), index_2.checkCurrentUser, index_1.postMessage, index_2.errorOut)
    .post('/post/group', (0, cookie_parser_1.default)(), express_1.default.json(), (0, index_2.permission)(['superAdmin']), index_1.postGroup, index_2.errorOut)
    .post('/post/chat', (0, cookie_parser_1.default)(), express_1.default.json(), (0, index_2.permission)(['admin', 'superAdmin']), index_1.postChat, index_2.errorOut)
    .post('/setAdmin', (0, cookie_parser_1.default)(), express_1.default.json(), (0, index_2.permission)(['superAdmin']), index_1.setAdmin, index_2.errorOut)
    .post('/delAdmin', (0, cookie_parser_1.default)(), express_1.default.json(), (0, index_2.permission)(['superAdmin']), index_1.deleteAdmin, index_2.errorOut)
    .post('/banInGroup', (0, cookie_parser_1.default)(), express_1.default.json(), (0, index_2.permission)(['admin', 'superAdmin']), index_1.banInGroup, index_2.errorOut)
    .post('/banInChat', (0, cookie_parser_1.default)(), express_1.default.json(), (0, index_2.permission)(['admin', 'superAdmin']), index_1.banInChat, index_2.errorOut)
    .post('/ubBanInChat', (0, cookie_parser_1.default)(), express_1.default.json(), (0, index_2.permission)(['admin', 'superAdmin']), index_1.unBanInChat, index_2.errorOut)
    .post('/unban', (0, cookie_parser_1.default)(), express_1.default.json(), (0, index_2.permission)(['admin', 'superAdmin']), index_1.unBanInGroup, index_2.errorOut)
    .post('/addToGroup', (0, cookie_parser_1.default)(), express_1.default.json(), (0, index_2.permission)(['user', 'admin', 'superAdmin']), index_2.checkCurrentUser, index_1.addToGroup, index_2.errorOut)
    .post('/delFromGroup', (0, cookie_parser_1.default)(), express_1.default.json(), (0, index_2.permission)(['user', 'admin', 'superAdmin']), index_2.checkCurrentUser, index_1.delFromGroup, index_2.errorOut)
    .get('/user/:username', (0, cookie_parser_1.default)(), express_1.default.json(), index_1.getUser, index_2.errorOut)
    .get('/message/:id', (0, cookie_parser_1.default)(), express_1.default.json(), (0, index_2.permission)(['user', 'admin', 'superAdmin']), index_1.getMessage, index_2.errorOut)
    .get('/chat/:id', (0, cookie_parser_1.default)(), express_1.default.json(), (0, index_2.permission)(['user', 'admin', 'superAdmin']), (0, index_2.chatAcces)(), index_1.getChat, index_2.errorOut)
    .get('/Group/:id', (0, cookie_parser_1.default)(), express_1.default.json(), (0, index_2.permission)(['user', 'admin', 'superAdmin']), index_1.getGroup, index_2.errorOut);
server
    .get('/get', (_, res) => {
    res.end('localhost is up');
})
    .listen(3000, () => {
    console.log('launched', 'http://localhost:3000/home');
});
