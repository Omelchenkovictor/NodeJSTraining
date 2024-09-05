import { getGroup as get } from "../InnerData/GetData";
import { accessSession } from "../InnerData/sessionControl";

async function getGroup(req:any, res:any, next:Function) {
    //console.log('second', req.cookies.sessionId)
    const session = await accessSession(req.cookies.sessionId)
    //console.log('second', session)
    if (session.role != 'superAdmin' &&!session.groups.find((element: any) => element.groupId == req.params.id)) {
        next('403')

    }
    try {
        
        res.write(JSON.stringify(await get(req.params.id), null, ' '))
        res.end()
    }
    catch(err){
        next(err)
    }
}
export {getGroup}