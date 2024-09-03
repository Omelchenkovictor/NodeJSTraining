"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToGroup = addToGroup;
const GetData_1 = require("../InnerData/GetData");
async function addToGroup(req, res, next) {
    try {
        const userId = req.body.userId;
        const groupId = req.body.groupId;
        await (0, GetData_1.joinGroup)(userId, groupId);
        res.end('done');
    }
    catch (err) {
        next(err);
    }
}
