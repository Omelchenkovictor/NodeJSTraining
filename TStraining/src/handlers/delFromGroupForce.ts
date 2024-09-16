import { leaveGroup } from "../InnerData/GetData";

async function delFromGroupForce(req: any, res: any, next: Function) {

    try {
        const userId = req.body.userId
        const groupId = req.body.groupId
        await leaveGroup(userId, groupId)
        res.end('done')
    } catch (err) {
        next(err)
    }
}


export { delFromGroupForce }