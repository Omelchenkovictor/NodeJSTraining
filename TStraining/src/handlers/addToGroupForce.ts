import { joinGroup } from "../InnerData/GetData";

async function addToGroupForse(req: any, res: any, next: Function) {
    try {
        const userId = req.body.userId
        const groupId = req.body.groupId
        await joinGroup(userId, groupId)
        res.end('done')
    } catch (err) {
        next(err)
    }
}


export { addToGroupForse }