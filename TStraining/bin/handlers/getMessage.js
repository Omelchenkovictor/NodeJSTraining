"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessage = getMessage;
const GetData_1 = require("../InnerData/GetData");
const sessionControl_1 = require("../InnerData/sessionControl");
async function getMessage(req, res, next) {
    let session = await (0, sessionControl_1.accessSession)(req.cookies.sessionId);
    const message = await (0, GetData_1.getMessage)(req.params.id);
    // I can change code here to get 1 less DB operation ( like what i am doing in post method for message )
    let group = await (0, GetData_1.getMessageGroupId)(message.chatId);
    //console.log(group)
    if (session.role != 'superAdmin' && !session.groups.find((element) => element.groupId == group)) {
        next('403');
    }
    else
        try {
            let banned = await (0, GetData_1.isChatBanned)(session.id, message.chatId);
            if (!banned && banned.isBanned) {
                next('403');
            }
            res.write(JSON.stringify(message), null, ' ');
            res.end();
        }
        catch (err) {
            next(err);
        }
}
