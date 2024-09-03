import { Request, Response } from "express";

function checkSuperAdminPermission(req:Request, _: Response, next: Function) {
    if (req.cookies.role == 'superAdmin') {
        next()
    } else {
        next('403')
    }
}

export {checkSuperAdminPermission}