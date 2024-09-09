import { getMessage as get, getMessageGroupId, isChatBanned } from "../InnerData/GetData";
import { accessSession } from "../InnerData/sessionControl";
async function getMessage(req: any, res: any, next: Function) {
    try {
        var session = await accessSession(req.cookies.sessionId)
        const message = await get(req.params.id)
        // I can change code here to get 1 less DB operation ( like what i am doing in post method for message )
        var group = await getMessageGroupId(message.chatId)
        //console.log(group)
        if (session.role != 'superAdmin' && !session.groups.find((element: any) => element.groupId == group)) {
            next('403')
        }
        else
            try {
                let banned = await isChatBanned(session.id, message.chatId)
                if (banned != null && banned.isBanned) {

                    next('403')

                }
                else {
                    res.write(JSON.stringify(message), null, ' ')
                    res.end()
                }
            }
            catch (err) {
                next(err)
            }
    } catch (error) {
        next(error)
    }



}
export { getMessage }