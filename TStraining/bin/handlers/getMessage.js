"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessage = getMessage;
const GetData_1 = require("../InnerData/GetData");
const sessionControl_1 = require("../InnerData/sessionControl");
async function getMessage(req, res, next) {
    try {
        const message = await (0, GetData_1.getMessage)(req.params.id);
        const session = await (0, sessionControl_1.accessSession)(req.cookies.sessionId);
        //var groupId = await getMessageGroupId(message.chatId)
        let banned = await (0, GetData_1.isChatBanned)(session.id, message.chatId);
        //console.log(banned)
        // I can change code here to get 1 less DB operation ( like what i am doing in post method for message )
        if (session.role != 'superAdmin'
            && (session.groups.find((element) => element.group.chats.find((element1) => element1.id == message.chatId) && element.isAdmin == false) != undefined
                && (banned != null && banned.isBanned))) {
            next('403');
        }
        else {
            res.write(JSON.stringify(message), null, ' ');
            res.end();
        }
    }
    catch (error) {
        next(error);
    }
}
