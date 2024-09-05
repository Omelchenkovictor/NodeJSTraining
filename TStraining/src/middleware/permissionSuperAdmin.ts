import { Request, Response } from "express";
import { accessSession } from "../InnerData/sessionControl";

function checkSuperAdminPermission(req:Request, _: Response, next: Function) {
    var session = accessSession(req.cookies.sessionId)
    if (session.role == 'superAdmin') {
        next()
    } else {
        next('403')
    }
}

export {checkSuperAdminPermission}