"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postChat = postChat;
const GetData_1 = require("../InnerData/GetData");
const sessionControl_1 = require("../InnerData/sessionControl");
async function postChat(req, res, next) {
    let session = await (0, sessionControl_1.accessSession)(req.cookies.sessionId);
    const groupId = req.body.groupId;
    if (session.role != 'superAdmin' && !session.groups.find((element) => element.groupId == groupId && element.isAdmin == true)) {
        next('403');
    }
    else
        try {
            const chat = req.body;
            await (0, GetData_1.createChat)(chat);
            res.end('done');
        }
        catch (err) {
            next(err);
        }
}
