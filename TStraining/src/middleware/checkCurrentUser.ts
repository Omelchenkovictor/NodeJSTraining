import { Request, Response } from "express";
import { accessSession } from "../InnerData/sessionControl";

function checkCurrentUser(req:Request, _: Response, next: Function) {
    var session = accessSession(req.cookies.sessionId)
    if (session.id == req.body.userId || session.username == req.body.username || session.id == req.body.id) {
        next()
    } else {
        next('403')
    }
}

export {checkCurrentUser}