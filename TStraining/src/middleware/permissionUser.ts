import { Request, Response } from "express";

function checkUserPermission(req:Request, _: Response, next: Function) {
    if (req.cookies.role == 'user' || req.cookies.role == 'admin' || req.cookies.role == 'superAdmin') {
        next()
    } else {
        next('403')
    }
}

export {checkUserPermission}