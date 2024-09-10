import { getMessage as get, /* getMessageGroupId, */ isChatBanned } from "../InnerData/GetData";
import { accessSession } from "../InnerData/sessionControl";
async function getMessage(req: any, res: any, next: Function) {
    try {
        const message = await get(req.params.id)
        const session = await accessSession(req.cookies.sessionId)
        //var groupId = await getMessageGroupId(message.chatId)
        let banned = await isChatBanned(session.id, message.chatId)
        console.log(banned)
        // I can change code here to get 1 less DB operation ( like what i am doing in post method for message )


        if (session.role != 'superAdmin'
            && (session.groups.find((element: any) =>
                element.group.chats.find((element1: any) =>
                    element1.id == message.chatId)) == undefined
                || (banned != null && banned.isBanned))) {


            next('403')

        }
        else {
            res.write(JSON.stringify(message), null, ' ')
            res.end()
        }
    }

    catch (error) {
        next(error)
    }



}
export { getMessage }