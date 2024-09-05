import bcryptjs from "bcryptjs";
import { createSession, renewSession } from "../InnerData/GetData";
import { Request, Response } from "express";
import { accessSession } from "../InnerData/sessionControl";
import { randomUUID } from "node:crypto";
const { getUser } = require("../InnerData/GetData");


async function logIn(req: Request, res: Response, next: Function): Promise<any> {
    let username: string = req.body.username
    let password: string = req.body.password
    try {
        const user = await getUser(username)
        if (await bcryptjs.compare(password, user.password)) {
            // change user access to user admin.lvl
            let date = new Date
            let UUID = randomUUID()
            res.cookie('sessionId', UUID);
            await createSession(UUID, user, date)
            res
                .cookie('user', username)
                .cookie('role', user.role)
                .cookie('date', date)
            await renewSession(UUID, username)
            console.log(UUID)
            console.log('first', accessSession(UUID)/* .groups[0].group */)
        }
        res.end('done')
    } catch (err) {
        next(err)
    }
}


export { logIn }