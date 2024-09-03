import { createMessage } from "../InnerData/GetData";

async function postMessage(req:any, res:any, next:Function) {
    try {
        const message = req.body
        await createMessage(message)
        res.end('done')
    } catch (err) {
        next(err)
    }
}


export {postMessage}