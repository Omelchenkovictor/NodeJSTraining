"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessMessage = void 0;
const GetData_1 = require("../InnerData/GetData");
const sessionControl_1 = require("../InnerData/sessionControl");
const accessMessage = () => {
    return async (req, _, next) => {
        try {
            const session = await (0, sessionControl_1.accessSession)(req.cookies.sessionId);
            let banned = await (0, GetData_1.isChatBanned)(session.id, req.params.id);
            // It was worth to do this as middleware
            if (session.role == 'superAdmin'
                || await session.groups.find((element) => element.group.chats.find((element1) => element1.id == req.body.chatId)
                    && element.isAdmin) != undefined
                || (await session.groups.find((element) => element.group.chats.find((element1) => element1.id == req.body.chatId)) != undefined
                    && (banned == null || !banned.isBanned))) {
                next();
            }
            else {
                next(403);
            }
        }
        catch (err) {
            next(err);
        }
    };
};
exports.accessMessage = accessMessage;
