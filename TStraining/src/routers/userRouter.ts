import cookieParser from "cookie-parser";
import express from "express";
import { getUser, postUser } from "../handlers/index";
import { errorOut } from "../middleware/index";


const router = express.Router()



router.post('/post',
    cookieParser(),
    express.json(),
    postUser,
    errorOut
)

router.get('/get/:username',
    cookieParser(),
    express.json(),
    getUser,
    errorOut
)


export { router }