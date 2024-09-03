import { createUser } from "../InnerData/GetData";

async function postUser(req:any, res:any, next:Function) {
    try {
        const user = req.body
        await createUser(user)
        res.end('done')
    } catch (err) {
        next(err)
    }
}


export {postUser}