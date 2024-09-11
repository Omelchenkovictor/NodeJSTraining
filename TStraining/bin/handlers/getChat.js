"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChat = getChat;
const GetData_1 = require("../InnerData/GetData");
/* import { accessSession } from "../InnerData/sessionControl"; */
async function getChat(req, res, next) {
    try {
        /* const session = await accessSession(req.cookies.sessionId)
        let banned = await isChatBanned(session.id, req.params.id)
        // It was worth to do this as middleware
        

        if (session.role == 'superAdmin'
            ||  await session.groups.find((element: any) =>
            element.group.chats.find((element1: any) =>
                element1.id == req.params.id) && element.isAdmin) != undefined
            || ( await session.groups.find((element: any) =>
                element.group.chats.find((element1: any) =>
                    element1.id == req.params.id)) != undefined
                && (banned == null || !banned.isBanned)))
        {
            res.write(JSON.stringify(await get(req.params.id), null, ' '))
            res.end()
        }
        else {
            next(403)
        } */
        res.write(JSON.stringify(await (0, GetData_1.getChat)(req.params.id), null, ' '));
        res.end();
    }
    catch (err) {
        next(err);
    }
}
