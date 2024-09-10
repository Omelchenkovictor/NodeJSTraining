import express from "express";
import { getUser, postUser, logIn, postMessage, getMessage, getChat, getGroup, postChat, postGroup, setAdmin, deleteAdmin, banInGroup, unBanInGroup, addToGroup, banInChat, unBanInChat, delFromGroup } from "./handlers/index";
//import { sessionId } from "./middleware/sessionId";
import cookieParser from "cookie-parser"
import { checkAdminPermission, checkCurrentUser, checkSuperAdminPermission, checkUserPermission, errorOut, permission } from "./middleware";
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
        permission(['user','admin','superAdmin']),
        checkCurrentUser,
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
        permission(['admin','superAdmin']),
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
        permission(['admin','superAdmin']),
        banInGroup,
        errorOut
    )
    .post('/banInChat',
        cookieParser(),
        express.json(),
        permission(['admin','superAdmin']),
        banInChat,
        errorOut
    )
    .post('/ubBanInChat',
        cookieParser(),
        express.json(),
        permission(['admin','superAdmin']),
        unBanInChat,
        errorOut
    )
    .post('/unban',
        cookieParser(),
        express.json(),
        permission(['admin','superAdmin']),
        unBanInGroup,
        errorOut
    )
    .post('/addToGroup',
        cookieParser(),
        express.json(),
        permission(['user','admin','superAdmin']),
        checkCurrentUser,
        addToGroup,
        errorOut
    )
    .post('/delFromGroup',
        cookieParser(),
        express.json(),
        permission(['user','admin','superAdmin']),
        checkCurrentUser,
        delFromGroup,
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
        permission(['user','admin','superAdmin']),
        getMessage,
        errorOut
    )
    .get('/chat/:id',
    cookieParser(),
    express.json(),
    permission(['user','admin','superAdmin']),
    getChat,
    errorOut
)
    .get('/Group/:id',
    cookieParser(),
    express.json(),
    permission(['user','admin','superAdmin']),
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
