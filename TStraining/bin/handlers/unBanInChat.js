"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unBanInChat = unBanInChat;
const GetData_1 = require("../InnerData/GetData");
const sessionControl_1 = require("../InnerData/sessionControl");
async function unBanInChat(req, res, next) {
    let session = (0, sessionControl_1.accessSession)(req.cookies.sessionId);
    const userId = Number(req.body.userId);
    const groupId = Number(req.body.groupId);
    const chatId = Number(req.body.chatId);
    if (session.role != 'superAdmin' && !session.groups.find((element) => element.groupId == groupId && element.isAdmin == true)) {
        next('403');
    }
    else
        try {
            await (0, GetData_1.unBanInChat)(userId, chatId);
            res.end('done');
        }
        catch (err) {
            next(err);
        }
}
