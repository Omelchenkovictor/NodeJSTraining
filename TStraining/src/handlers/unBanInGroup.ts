import { unBanInGroup as ban } from "../InnerData/GetData"
import { accessSession } from "../InnerData/sessionControl"

async function unBanInGroup(req: any, res: any, next: Function) {
    let session = accessSession(req.cookies.sessionId)
    const userId = req.body.userId
    const groupId = req.body.groupId

    if (session.role != 'superAdmin' && !session.groups.find((element: any) => element.groupId == groupId && element.isAdmin == true)) {
        next('403')

    }
    else
        try {
            await ban(userId, groupId)
            res.end('done')
        } catch (err) {
            next(err)
        }
}


export { unBanInGroup }