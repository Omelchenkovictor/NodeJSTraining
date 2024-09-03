import { getUser as get } from "../InnerData/GetData";
async function getUser(req:any, res:any, next:Function) {
    try {
        res.write(JSON.stringify(await get(req.params.username) , null, ' '))
        res.end()
    }
    catch(err){
        next(err)
    }
}
export {getUser}