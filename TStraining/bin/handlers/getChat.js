"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChat = getChat;
const GetData_1 = require("../InnerData/GetData");
const sessionControl_1 = require("../InnerData/sessionControl");
async function getChat(req, res, next) {
    try {
        const session = await (0, sessionControl_1.accessSession)(req.cookies.sessionId);
        let banned = await (0, GetData_1.isChatBanned)(session.id, req.params.id);
        // It was worth to do this as middleware
        if (session.role != 'superAdmin'
            && (session.groups.find((element) => element.group.chats.find((element1) => element1.id == req.params.id)) == undefined
                || (banned != null && banned.isBanned))) {
            next('403');
        }
        else {
            res.write(JSON.stringify(await (0, GetData_1.getChat)(req.params.id), null, ' '));
            res.end();
        }
    }
    catch (err) {
        next(err);
    }
}
