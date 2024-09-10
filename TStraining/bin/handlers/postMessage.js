"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMessage = postMessage;
const GetData_1 = require("../InnerData/GetData");
const sessionControl_1 = require("../InnerData/sessionControl");
async function postMessage(req, res, next) {
    try {
        let session = await (0, sessionControl_1.accessSession)(req.cookies.sessionId);
        let banned = await (0, GetData_1.isChatBanned)(session.id, req.body.chatId);
        console.log(banned);
        // I can change code here to get 1 less DB operation ( like what i am doing in post method for message )
        if (session.role != 'superAdmin'
            && (session.groups.find((element) => element.group.chats.find((element1) => element1.id == req.body.chatId)) == undefined
                || (banned != null && banned.isBanned))) {
            next('403');
        }
        else {
            const message = req.body;
            await (0, GetData_1.createMessage)(message);
            res.end('done');
        }
    }
    catch (error) {
        next(error);
    }
}
