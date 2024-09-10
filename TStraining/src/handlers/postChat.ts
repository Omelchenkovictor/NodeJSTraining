import { createChat } from "../InnerData/GetData";
import { accessSession } from "../InnerData/sessionControl";

async function postChat(req: any, res: any, next: Function) {

    let session = await accessSession(req.cookies.sessionId)
    const groupId = req.body.groupId

    try {
        if (session.role != 'superAdmin' 
        && !session.groups.find((element: any) => 
            element.groupId == groupId && element.isAdmin == true)) {
            next('403')

        }
        else {
            const chat = req.body
            await createChat(chat)
            res.end('done')
        }
    } catch (error) {
        next(error)
    }

}


export { postChat }