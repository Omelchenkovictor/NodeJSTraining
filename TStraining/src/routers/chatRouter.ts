import cookieParser from "cookie-parser";
import express from "express";
import { chatAccess, errorOut, permission } from "../middleware/index";
import { getChat, postChat } from "../handlers/index";


const router = express.Router()

router.post('/post',
    cookieParser(),
    express.json(),
    permission(['admin', 'superAdmin']),
    postChat,
    errorOut)

router.get('/get/:id',
    cookieParser(),
    express.json(),
    permission(['user', 'admin', 'superAdmin']),
    chatAccess(),
    getChat,
    errorOut
)

export { router }