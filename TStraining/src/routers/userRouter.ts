import cookieParser from "cookie-parser";
import express from "express";
import { deleteAdmin, getUser, postUser, setAdmin } from "../handlers/index";
import { errorOut, permission } from "../middleware/index";


const router = express.Router()



router.post('/',
    cookieParser(),
    express.json(),
    postUser,
    errorOut
)

router.get('/:username',
    cookieParser(),
    express.json(),
    getUser,
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


export { router }