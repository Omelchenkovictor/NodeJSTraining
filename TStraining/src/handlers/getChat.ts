import { getChat as get } from "../InnerData/GetData";
import { accessSession } from "../InnerData/sessionControl";
async function getChat(req: any, res: any, next: Function) {

    const session = await accessSession(req.cookies.sessionId)
    //console.log('second', session)
    if (session.role != 'superAdmin' && !session.groups.find((element: any) => element.group.chats.find((element1: any) => element1.id == req.params.id))) {

        next('403')

    }
    else
        try {
            res.write(JSON.stringify(await get(req.params.id), null, ' '))
            res.end()
        }
        catch (err) {
            next(err)
        }
}
export { getChat }