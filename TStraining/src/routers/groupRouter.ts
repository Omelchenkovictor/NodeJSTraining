import cookieParser from "cookie-parser";
import express from "express";
import { errorOut, permission } from "../middleware/index";
import { addToGroup, addToGroupForse, banInGroup, delFromGroup, delFromGroupForce, getGroup, postGroup, unBanInGroup } from "../handlers/index";


const router = express.Router()

router
    .post('/',
        cookieParser(),
        express.json(),
        permission(['superAdmin']),
        postGroup,
        errorOut
    )
    .get('/:id',
        cookieParser(),
        express.json(),
        permission(['user', 'admin', 'superAdmin']),
        getGroup,
        errorOut
    )
    .post('/add',
        cookieParser(),
        express.json(),
        permission(['user', 'admin', 'superAdmin']),
        addToGroup,
        errorOut
    )
    .post('/add/Force',
        cookieParser(),
        express.json(),
        permission(['admin', 'superAdmin']),
        addToGroupForse,
        errorOut
    )
    .post('/del',
        cookieParser(),
        express.json(),
        permission(['user', 'admin', 'superAdmin']),
        delFromGroup,
        errorOut
    )
    .post('/del/Force',
        cookieParser(),
        express.json(),
        permission(['admin', 'superAdmin']),
        delFromGroupForce,
        errorOut
    )
    .post('/ban',
        cookieParser(),
        express.json(),
        permission(['admin', 'superAdmin']),
        banInGroup,
        errorOut
    )
    .post('/unBan',
        cookieParser(),
        express.json(),
        permission(['admin', 'superAdmin']),
        unBanInGroup,
        errorOut
    )

export { router }