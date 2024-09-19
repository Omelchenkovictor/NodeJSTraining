"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMessage = postMessage;
const GetData_1 = require("../InnerData/GetData");
const sessionControl_1 = require("../InnerData/sessionControl");
async function postMessage(req, res, next) {
    try {
        let session = await (0, sessionControl_1.accessSession)(req.cookies.sessionId);
        /* if (session.role == 'superAdmin'
            || await session.groups.find((element: any) =>
                element.group.chats.find((element1: any) =>
                    element1.id == req.body.chatId)
                && element.isAdmin) != undefined
            || (await session.groups.find((element: any) =>
                element.group.chats.find((element1: any) =>
                    element1.id == req.body.chatId)) != undefined
                && (banned == null || !banned.isBanned))) {
            const message = req.body
            message.userId = session.id
            await createMessage(message)
            res.end('done')
        }
        else {
            next(403)
        } */
        const message = req.body;
        message.userId = session.id;
        await (0, GetData_1.createMessage)(message);
        res.end('done');
    }
    catch (err) {
        next(err);
    }
}
