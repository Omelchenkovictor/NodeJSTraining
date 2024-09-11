import { isChatBanned } from "../InnerData/GetData";
import { accessSession } from "../InnerData/sessionControl";
const chatAcces =  () => {

return async (req: any, _: any, next: Function) => {


    try {
        const session = await accessSession(req.cookies.sessionId)
        let banned = await isChatBanned(session.id, req.params.id)
        // It was worth to do this as middleware
        

        if (session.role == 'superAdmin' 
            ||  await session.groups.find((element: any) =>
            element.group.chats.find((element1: any) =>
                element1.id == req.params.id) && element.isAdmin) != undefined
            || ( await session.groups.find((element: any) =>
                element.group.chats.find((element1: any) =>
                    element1.id == req.params.id)) != undefined
                && (banned == null || !banned.isBanned)))
        {
            next()
        }
        else {
            next(403)
        }


    }
    catch (err) {
        next(err)
    }
}}

export { chatAcces }