import express from "express";
import {logIn} from "./handlers/index";
import cookieParser from "cookie-parser"
import {  errorOut } from "./middleware/index";
import {message, chat, user, group} from "./routers/index"
import { alternateCookieParser } from "./alternateCookieParser";

const server = express();
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
    .get('/', (_, res) => {
        res.end('Ready to go')
    })
    .get('/home', (_, res) => {
        res.end('Sweet Home!')
    })
    .get('/test', 
        alternateCookieParser,
        (req, res) => {
        console.log(req.cookies)
        res.end('delivered')
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


server
    .listen(3000, () => {
        console.log('launched', 'http://localhost:3000/home');
    })
