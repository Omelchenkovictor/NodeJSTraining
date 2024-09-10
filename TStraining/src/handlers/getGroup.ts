import { getGroup as get } from "../InnerData/GetData";
import { accessSession } from "../InnerData/sessionControl";

async function getGroup(req: any, res: any, next: Function) {
    try {
        const session = await accessSession(req.cookies.sessionId)
        if (session.role != 'superAdmin' &&
            !session.groups.find((element: any) => element.groupId == req.params.id)) {
            next('403')

        }
        else {

            res.write(JSON.stringify(await get(req.params.id), null, ' '))
            res.end()
        }

    } catch (error) {
        next(error)
    }
}
export { getGroup }