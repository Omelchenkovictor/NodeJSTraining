"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delFromGroup = delFromGroup;
const GetData_1 = require("../InnerData/GetData");
const sessionControl_1 = require("../InnerData/sessionControl");
async function delFromGroup(req, res, next) {
    try {
        const session = (0, sessionControl_1.accessSession)(req.cookies.sessionId);
        const userId = session.id;
        const groupId = req.body.groupId;
        await (0, GetData_1.leaveGroup)(userId, groupId);
        res.end('done');
    }
    catch (err) {
        next(err);
    }
}
