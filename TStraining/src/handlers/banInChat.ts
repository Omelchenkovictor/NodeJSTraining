import { banInChat as ban } from "../InnerData/GetData"
import { accessSession } from "../InnerData/sessionControl"

async function banInChat(req: any, res: any, next: Function) {
    try {
        let session = accessSession(req.cookies.sessionId);
        const userId = Number(req.body.userId);
        const chatId = Number(req.body.chatId);

        if (session.role != 'superAdmin'
            && !session.groups.find((element: any) =>
                element.group.chats.find((element1: any) =>
                    element1.id == req.chatId) && element.isAdmin)) {
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