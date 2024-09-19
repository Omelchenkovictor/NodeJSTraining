"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unBanInGroup = unBanInGroup;
const GetData_1 = require("../InnerData/GetData");
const sessionControl_1 = require("../InnerData/sessionControl");
async function unBanInGroup(req, res, next) {
    try {
        let session = (0, sessionControl_1.accessSession)(req.cookies.sessionId);
        const userId = req.body.userId;
        const groupId = req.body.groupId;
        if (session.role != 'superAdmin'
            && !session.groups.find((element) => element.groupId == groupId && element.isAdmin == true)) {
            next('403');
        }
        else {
            await (0, GetData_1.unBanInGroup)(userId, groupId);
            res.end('done');
        }
    }
    catch (error) {
        next(error);
    }
}
