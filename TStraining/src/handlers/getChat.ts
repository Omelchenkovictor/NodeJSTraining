import { getChat as get, isChatBanned } from "../InnerData/GetData";
import { accessSession } from "../InnerData/sessionControl";
async function getChat(req: any, res: any, next: Function) {
    try {
        const session = await accessSession(req.cookies.sessionId)
        let banned = await isChatBanned(session.id, req.params.id)
        // It was worth to do this as middleware
        
        
        if (session.role != 'superAdmin'
        && (session.groups.find((element: any) =>  
            element.group.chats.find((element1: any) => 
                element1.id == req.params.id) && element.isAdmin == false) != undefined
         && (banned != null && banned.isBanned))) {


            next('403')

        }
        else {
            res.write(JSON.stringify(await get(req.params.id), null, ' '))
            res.end()
        }
    }
    catch (err) {
        next(err)
    }
}

export { getChat }