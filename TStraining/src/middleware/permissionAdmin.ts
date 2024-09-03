import { Request, Response } from "express";

function checkAdminPermission(req:Request, _: Response, next: Function) {
    if (req.cookies.role == 'admin' || req.cookies.role == 'superAdmin') {
        next()
    } else {
        next('403')
    }
}

export {checkAdminPermission}