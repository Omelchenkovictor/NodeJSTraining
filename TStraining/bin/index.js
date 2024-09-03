"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("./handlers/index");
const sessionId_1 = require("./middleware/sessionId");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const middleware_1 = require("./middleware");
const server = (0, express_1.default)();
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
    .post('/login', (0, cookie_parser_1.default)(), sessionId_1.sessionId, express_1.default.json(), async (req, res, next) => {
    await (0, index_1.logIn)(req, res, next);
}, middleware_1.errorOut)
    .post('/post/user', (0, cookie_parser_1.default)(), sessionId_1.sessionId, express_1.default.json(), index_1.postUser, middleware_1.errorOut)
    .post('/post/message', (0, cookie_parser_1.default)(), sessionId_1.sessionId, express_1.default.json(), middleware_1.checkUserPermission, index_1.postMessage, middleware_1.errorOut)
    .post('/post/group', (0, cookie_parser_1.default)(), sessionId_1.sessionId, express_1.default.json(), middleware_1.checkSuperAdminPermission, index_1.postGroup, middleware_1.errorOut)
    .post('/post/chat', (0, cookie_parser_1.default)(), sessionId_1.sessionId, express_1.default.json(), middleware_1.checkAdminPermission, index_1.postChat, middleware_1.errorOut)
    .get('/user/:username', (0, cookie_parser_1.default)(), sessionId_1.sessionId, express_1.default.json(), index_1.getUser, middleware_1.errorOut)
    .get('/message/:id', (0, cookie_parser_1.default)(), sessionId_1.sessionId, express_1.default.json(), middleware_1.checkUserPermission, index_1.getMessage, middleware_1.errorOut)
    .get('/chat/:id', (0, cookie_parser_1.default)(), sessionId_1.sessionId, express_1.default.json(), middleware_1.checkUserPermission, index_1.getChat, middleware_1.errorOut)
    .get('/Group/:id', (0, cookie_parser_1.default)(), sessionId_1.sessionId, express_1.default.json(), middleware_1.checkUserPermission, index_1.getGroup, middleware_1.errorOut);
server
    .get('/get', (_, res) => {
    res.end('localhost is up');
})
    .listen(3000, () => {
    console.log('launched', 'http://localhost:3000/home');
});
