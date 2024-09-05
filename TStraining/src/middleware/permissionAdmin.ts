import { Request, Response } from "express";
import { accessSession } from "../InnerData/sessionControl";

function checkAdminPermission(req:Request, _: Response, next: Function) {
    var session = accessSession(req.cookies.sessionId)
    if (session.role == 'admin' || session.role == 'superAdmin') {
        next()
    } else {
        next('403')
    }
}

export {checkAdminPermission}