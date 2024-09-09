import { createMessage, getMessageGroupId } from "../InnerData/GetData";
import { accessSession } from "../InnerData/sessionControl";

async function postMessage(req: any, res: any, next: Function) {

    let session = await accessSession(req.cookies.sessionId)
    let groupId = await getMessageGroupId(req.body.chatId)
    //console.log(groupId)

    if (session.role != 'superAdmin' && !session.groups.find((element: any) => element.groupId == groupId)) {
        next('403')

    }
    else
        try {
            const message = req.body
            await createMessage(message)
            res.end('done')
        } catch (err) {
            next(err)
        }
}



export { postMessage }