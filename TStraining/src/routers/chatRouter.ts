import cookieParser from "cookie-parser";
import express from "express";
import { chatAccess, errorOut, permission } from "../middleware/index";
import { banInChat, getChat, postChat, unBanInChat } from "../handlers/index";


const router = express.Router()

router.post('/',
    cookieParser(),
    express.json(),
    permission(['admin', 'superAdmin']),
    postChat,
    errorOut)

router.get('/:id',
    cookieParser(),
    express.json(),
    permission(['user', 'admin', 'superAdmin']),
    chatAccess(),
    getChat,
    errorOut
)
.post('/ban',
    cookieParser(),
    express.json(),
    permission(['admin', 'superAdmin']),
    banInChat,
    errorOut
)
.post('/ubBan',
    cookieParser(),
    express.json(),
    permission(['admin', 'superAdmin']),
    unBanInChat,
    errorOut
)

export { router }