import bcryptjs from "bcryptjs";
import { createSession } from "../InnerData/GetData";
import { Request, Response } from "express";
const { getUser } = require ("../InnerData/GetData");


async function logIn(req:Request, res:Response, next:Function):Promise<any> {
    let username:string = req.body.username
    let password:string = req.body.password
    try {
        const user = await getUser(username)
        if (await bcryptjs.compare(password, user.password)) {
            // change user access to user admin.lvl
            res
            .clearCookie('user')
            .clearCookie('role')
            .clearCookie('date')
            let date = new Date
            await createSession(req.cookies.sessionId, user, date)
            res
            .cookie('user', username)
            .cookie('role', user.role)
            .cookie('date', date)
        }
        res.end('done')
    } catch (err) {
        next(err)
    }
}


export {logIn}