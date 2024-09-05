"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMessage = postMessage;
const GetData_1 = require("../InnerData/GetData");
const sessionControl_1 = require("../InnerData/sessionControl");
async function postMessage(req, res, next) {
    let session = await (0, sessionControl_1.accessSession)(req.cookies.sessionId);
    let groupId = await (0, GetData_1.getMessageGroupId)(req.body.chatId);
    //console.log(groupId)
    if (session.role != 'superAdmin' && !session.groups.find((element) => element.groupId == groupId)) {
        next('403');
    }
    else
        try {
            const message = req.body;
            await (0, GetData_1.createMessage)(message);
            res.end('done');
        }
        catch (err) {
            next(err);
        }
}
