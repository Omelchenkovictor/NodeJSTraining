import { deleteAdmin as del } from "../InnerData/GetData"

async function deleteAdmin(req: any, res: any, next: Function) {
    try {
        const userId = req.body.userId
        const groupId = req.body.groupId
        await del(userId, groupId)
        res.end('done')
    } catch (err) {
        next(err)
    }
}


export { deleteAdmin }