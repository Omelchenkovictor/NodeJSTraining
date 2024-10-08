import { joinGroup } from "../InnerData/GetData";
import { accessSession } from "../InnerData/sessionControl";

async function addToGroup(req: any, res: any, next: Function) {
    try {
        const session = accessSession(req.cookies.sessionId)
        const userId = session.id
        const groupId = req.body.groupId
        await joinGroup(userId, groupId)
        res.end('done')
    } catch (err) {
        next(err)
    }
}


export { addToGroup }