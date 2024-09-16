import { Request, Response } from "express"
import { checkSession } from "../InnerData/GetData"

const sessionChecker = (req:Request, res: Response, next: Function) => {
    if (checkSession(req) !== null) {
        next()
        res.end('done')
    } else {
        let err = '403'
        next(err)
    }
}

export {sessionChecker}