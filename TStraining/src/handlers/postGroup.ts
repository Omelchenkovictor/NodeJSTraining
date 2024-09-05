import { createGroup } from "../InnerData/GetData";

async function postGroup(req: any, res: any, next: Function) {
    try {
        const group = req.body
        await createGroup(group)
        res.end('done')
    } catch (err) {
        next(err)
    }
}


export { postGroup }