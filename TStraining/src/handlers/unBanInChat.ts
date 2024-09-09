import { unBanInChat as ban } from "../InnerData/GetData"
import { accessSession } from "../InnerData/sessionControl"

async function unBanInChat(req: any, res: any, next: Function) {
    let session = accessSession(req.cookies.sessionId);
    const userId = Number(req.body.userId);
    const groupId = Number(req.body.groupId);
    const chatId = Number(req.body.chatId);

    if (session.role != 'superAdmin' && !session.groups.find((element: any) => element.groupId == groupId && element.isAdmin == true)) {
        next('403')

    }
    else
        try {

            await ban(userId, chatId)
            res.end('done')
        } catch (err) {
            next(err)
        }
}


export { unBanInChat }