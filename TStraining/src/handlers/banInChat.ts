import { banInChat as ban } from "../InnerData/GetData"
import { accessSession } from "../InnerData/sessionControl"

async function banInChat(req: any, res: any, next: Function) {
    try {
        let session = accessSession(req.cookies.sessionId);
        const userId = Number(req.body.userId);
        const groupId = Number(req.body.groupId);
        const chatId = Number(req.body.chatId);

        if (session.role != 'superAdmin' && !session.groups.find((element: any) => element.groupId == groupId && element.isAdmin == true)) {
            next('403')

        }
        else {

            await ban(userId, chatId)
            res.end('done')
        }
    }
    catch (err) {
        next(err)
    }
}


export { banInChat }