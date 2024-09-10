import { createMessage, isChatBanned } from "../InnerData/GetData";
import { accessSession } from "../InnerData/sessionControl";

async function postMessage(req: any, res: any, next: Function) {

    try {
        let session = await accessSession(req.cookies.sessionId)
        let banned = await isChatBanned(session.id, req.body.chatId)
        console.log(banned)
        // I can change code here to get 1 less DB operation ( like what i am doing in post method for message )


        if (session.role != 'superAdmin'
            && (session.groups.find((element: any) =>
                element.group.chats.find((element1: any) =>
                    element1.id == req.body.chatId)) == undefined
                || (banned != null && banned.isBanned))) {


            next('403')

        }

        else {
            const message = req.body
            await createMessage(message)
            res.end('done')
        }
    } catch (error) {
        next(error)
    }
}



export { postMessage }