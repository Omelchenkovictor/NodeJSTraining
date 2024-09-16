import cookieParser from "cookie-parser";
import express from "express";
import { accessMessage, errorOut, permission } from "../middleware/index";
import { getMessage, postMessage } from "../handlers/index";

const router = express.Router()

router.post('/',
    cookieParser(),
    express.json(),
    permission(['user', 'admin', 'superAdmin']),
    accessMessage,
    postMessage,
    errorOut)

router.get('/:id',
    cookieParser(),
    express.json(),
    permission(['user', 'admin', 'superAdmin']),
    getMessage,
    errorOut)

export { router }