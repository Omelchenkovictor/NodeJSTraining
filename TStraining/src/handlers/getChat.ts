import { getChat as get } from "../InnerData/GetData";
async function getChat(req:any, res:any, next:Function) {
    try {
        res.write(JSON.stringify(await get(req.params.id), null, ' '))
        res.end()
    }
    catch(err){
        next(err)
    }
}
export {getChat}