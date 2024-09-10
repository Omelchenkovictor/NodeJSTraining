import { Request, Response } from "express";
import { accessSession } from "../InnerData/sessionControl";

var permission = (targetRole: Array<string>) => {
    return  async (req: Request, _: Response, next: Function) => {
        try {
            var session = await accessSession(req.cookies.sessionId)
            if (targetRole.find((element) => element == session.role) == undefined) {
                next('403')
            } else {
                next()
            }
        } catch (error) {
            next('403')
        }
    }
}

export { permission }