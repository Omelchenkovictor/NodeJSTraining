import { createMessage, isChatBanned } from "../InnerData/GetData";
import { accessSession } from "../InnerData/sessionControl";

async function postMessage(req: any, res: any, next: Function) {

    try {
        let session = await accessSession(req.cookies.sessionId)
        let banned = await isChatBanned(session.id, req.body.chatId)
        
        if (session.role == 'superAdmin' 
            ||  await session.groups.find((element: any) =>
            element.group.chats.find((element1: any) =>
                element1.id == req.body.chatId) && element.isAdmin) != undefined
            || ( await session.groups.find((element: any) =>
                element.group.chats.find((element1: any) =>
                    element1.id == req.body.chatId)) != undefined
                && (banned == null || !banned.isBanned)))
        {
            const message = req.body
            message.userId = session.id
            await createMessage(message)
            res.end('done')
        }
        else {
            next(403)
        }


    }
    catch (err) {
        next(err)
    }

}



export { postMessage }