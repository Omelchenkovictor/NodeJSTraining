import express from "express";
import { getUser, postUser, logIn, postMessage, getMessage, getChat, getGroup, postChat, postGroup, setAdmin, deleteAdmin, banInGroup, unBanInGroup } from "./handlers/index";
//import { sessionId } from "./middleware/sessionId";
import cookieParser from "cookie-parser"
import { checkAdminPermission, checkSuperAdminPermission, checkUserPermission, errorOut } from "./middleware";
//import { sessionMap } from "./InnerData/sessionControl";

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
    .get('/home', (_, res) => {
        res.end('Hello there!')
    })
    .post('/login',
        cookieParser(),
        express.json(),
        logIn,
        errorOut
    )
    .post('/post/user',
        cookieParser(),
        express.json(),
        postUser,
        errorOut
    )
    .post('/post/message',
        cookieParser(),
        express.json(),
        checkUserPermission,
        postMessage,
        errorOut
    )
    .post('/post/group',
        cookieParser(),
        express.json(),
        checkSuperAdminPermission,
        postGroup,
        errorOut
    )
    .post('/post/chat',
        cookieParser(),
        express.json(),
        checkAdminPermission,
        postChat,
        errorOut
    )
    .post('/setAdmin',
        cookieParser(),
        express.json(),
        checkSuperAdminPermission,
        setAdmin,
        errorOut
    )
    .post('/delAdmin',
        cookieParser(),
        express.json(),
        checkSuperAdminPermission,
        deleteAdmin,
        errorOut
    )
    .post('/ban',
        cookieParser(),
        express.json(),
        checkAdminPermission,
        banInGroup,
        errorOut
    )
    .post('/unban',
        cookieParser(),
        express.json(),
        checkAdminPermission,
        unBanInGroup,
        errorOut
    )
    .get('/user/:username',
    cookieParser(),
    express.json(),
    getUser,
    errorOut
)
    .get('/message/:id',
        cookieParser(),
        express.json(),
        checkUserPermission,
        getMessage,
        errorOut
    )
    .get('/chat/:id',
    cookieParser(),
    express.json(),
    checkUserPermission,
    getChat,
    errorOut
)
    .get('/Group/:id',
    cookieParser(),
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
