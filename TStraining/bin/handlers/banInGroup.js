"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.banInGroup = banInGroup;
const GetData_1 = require("../InnerData/GetData");
const sessionControl_1 = require("../InnerData/sessionControl");
async function banInGroup(req, res, next) {
    let session = (0, sessionControl_1.accessSession)(req.cookie.sessionId);
    const userId = req.body.userId;
    const groupId = req.body.groupId;
    if (session.role != 'superAdmin' && !session.groups.find((element) => element.groupId == groupId && element.isAdmin == true)) {
        next('403');
    }
    else
        try {
            await (0, GetData_1.banInGroup)(userId, groupId);
            res.end('done');
        }
        catch (err) {
            next(err);
        }
}
