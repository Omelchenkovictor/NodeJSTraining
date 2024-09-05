"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChat = getChat;
const GetData_1 = require("../InnerData/GetData");
const sessionControl_1 = require("../InnerData/sessionControl");
async function getChat(req, res, next) {
    const session = await (0, sessionControl_1.accessSession)(req.cookies.sessionId);
    //console.log('second', session)
    if (session.role != 'superAdmin' && !session.groups.find((element) => element.group.chats.find((element1) => element1.id == req.params.id))) {
        next('403');
    }
    else
        try {
            res.write(JSON.stringify(await (0, GetData_1.getChat)(req.params.id), null, ' '));
            res.end();
        }
        catch (err) {
            next(err);
        }
}
