import { setAdmin as set } from "../InnerData/GetData"

async function setAdmin(req: any, res: any, next: Function) {
    try {
        const userId = req.body.userId
        const groupId = req.body.groupId
        await set(userId, groupId)
        res.end('done')
    } catch (err) {
        next(err)
    }
}


export { setAdmin }