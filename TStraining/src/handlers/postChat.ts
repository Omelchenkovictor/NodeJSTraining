import { createChat } from "../InnerData/GetData";

async function postChat(req:any, res:any, next:Function) {
    try {
        const chat = req.body
        await createChat(chat)
        res.end('done')
    } catch (err) {
        next(err)
    }
}


export {postChat}