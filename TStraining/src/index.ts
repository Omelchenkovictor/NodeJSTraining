import express from "express";
import { getUser, postUser, logIn, postMessage, getMessage, getChat, getGroup, postChat, postGroup, setAdmin, deleteAdmin, banInGroup, unBanInGroup, addToGroup, banInChat, unBanInChat, delFromGroup, addToGroupForse, delFromGroupForce } from "./handlers/index";
import cookieParser from "cookie-parser"
import { accessMessage, chatAcces,  errorOut, permission } from "./middleware/index";


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
    .post('message',
        cookieParser(),
        express.json(),
        permission(['user', 'admin', 'superAdmin']),
        accessMessage,
        postMessage,
        errorOut
    )
    .post('/post/group',
        cookieParser(),
        express.json(),
        permission(['superAdmin']),
        postGroup,
        errorOut
    )
    .post('/post/chat',
        cookieParser(),
        express.json(),
        permission(['admin', 'superAdmin']),
        postChat,
        errorOut
    )
    .post('/setAdmin',
        cookieParser(),
        express.json(),
        permission(['superAdmin']),
        setAdmin,
        errorOut
    )
    .post('/delAdmin',
        cookieParser(),
        express.json(),
        permission(['superAdmin']),
        deleteAdmin,
        errorOut
    )
    .post('/banInGroup',
        cookieParser(),
        express.json(),
        permission(['admin', 'superAdmin']),
        banInGroup,
        errorOut
    )
    .post('/banInChat',
        cookieParser(),
        express.json(),
        permission(['admin', 'superAdmin']),
        banInChat,
        errorOut
    )
    .post('/ubBanInChat',
        cookieParser(),
        express.json(),
        permission(['admin', 'superAdmin']),
        unBanInChat,
        errorOut
    )
    .post('/unBan',
        cookieParser(),
        express.json(),
        permission(['admin', 'superAdmin']),
        unBanInGroup,
        errorOut
    )
    .post('/addToGroup',
        cookieParser(),
        express.json(),
        permission(['user', 'admin', 'superAdmin']),
        addToGroup,
        errorOut
    )
    .post('/addToGroupForce',
        cookieParser(),
        express.json(),
        permission(['admin', 'superAdmin']),
        addToGroupForse,
        errorOut
    )
    .post('/delFromGroup',
        cookieParser(),
        express.json(),
        permission(['user', 'admin', 'superAdmin']),
        delFromGroup,
        errorOut
    )
    .post('/delFromGroupForce',
        cookieParser(),
        express.json(),
        permission(['admin', 'superAdmin']),
        delFromGroupForce,
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
        permission(['user', 'admin', 'superAdmin']),
        getMessage,
        errorOut
    )
    .get('/chat/:id',
        cookieParser(),
        express.json(),
        permission(['user', 'admin', 'superAdmin']),
        chatAcces(),
        getChat,
        errorOut
    )
    .get('/Group/:id',
        cookieParser(),
        express.json(),
        permission(['user', 'admin', 'superAdmin']),
        getGroup,
        errorOut
    )



server
    .listen(3000, () => {
        console.log('launched', 'http://localhost:3000/home');
    })
