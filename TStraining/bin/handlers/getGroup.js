"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroup = getGroup;
const GetData_1 = require("../InnerData/GetData");
const sessionControl_1 = require("../InnerData/sessionControl");
async function getGroup(req, res, next) {
    //console.log('second', req.cookies.sessionId)
    const session = await (0, sessionControl_1.accessSession)(req.cookies.sessionId);
    //console.log('second', session)
    if (session.role != 'superAdmin' && !session.groups.find((element) => element.groupId == req.params.id)) {
        next('403');
    }
    else
        try {
            res.write(JSON.stringify(await (0, GetData_1.getGroup)(req.params.id), null, ' '));
            res.end();
        }
        catch (err) {
            next(err);
        }
}
