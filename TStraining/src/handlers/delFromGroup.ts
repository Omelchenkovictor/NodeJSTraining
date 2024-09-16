import { leaveGroup } from "../InnerData/GetData";
import { accessSession } from "../InnerData/sessionControl";

async function delFromGroup(req: any, res: any, next: Function) {
    try {
        const session = accessSession(req.cookies.sessionId)
        const userId = session.id
        const groupId = req.body.groupId
        await leaveGroup(userId, groupId)
        res.end('done')
    } catch (err) {
        next(err)
    }
}


export { delFromGroup }