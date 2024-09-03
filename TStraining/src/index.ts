import express, { Request, Response } from "express";
import { getUser, postUser, logIn, postMessage, getMessage, getChat, getGroup, postChat, postGroup } from "./handlers/index";
import { sessionId } from "./middleware/sessionId";
import cookieParser from "cookie-parser"
import { checkAdminPermission, checkSuperAdminPermission, checkUserPermission, errorOut } from "./middleware";


const server = express();
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
        res.end('Hello there!')
    })
    .post('/login',
        cookieParser(),
        sessionId,
        express.json(),
        async (req: Request, res: Response, next: Function) => {
            await logIn(req, res, next)
        },
        errorOut
    )
    .post('/post/user',
        cookieParser(),
        sessionId,
        express.json(),
        postUser,
        errorOut
    )
    .post('/post/message',
        cookieParser(),
        sessionId,
        express.json(),
        checkUserPermission,
        postMessage,
        errorOut
    )
    .post('/post/group',
        cookieParser(),
        sessionId,
        express.json(),
        checkSuperAdminPermission,
        postGroup,
        errorOut
    )
    .post('/post/chat',
        cookieParser(),
        sessionId,
        express.json(),
        checkAdminPermission,
        postChat,
        errorOut
    )
    .get('/user/:username',
    cookieParser(),
    sessionId,
    express.json(),
    getUser,
    errorOut
)
    .get('/message/:id',
        cookieParser(),
        sessionId,
        express.json(),
        checkUserPermission,
        getMessage,
        errorOut
    )
    .get('/chat/:id',
    cookieParser(),
    sessionId,
    express.json(),
    checkUserPermission,
    getChat,
    errorOut
)
    .get('/Group/:id',
    cookieParser(),
    sessionId,
    express.json(),
    checkUserPermission,
    getGroup,
    errorOut
)
    


server
    .get('/get', (_, res): void => {
        res.end('localhost is up')
    })
    .listen(3000, () => {
        console.log('launched', 'http://localhost:3000/home');
    })
