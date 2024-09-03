"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postGroup = postGroup;
const GetData_1 = require("../InnerData/GetData");
async function postGroup(req, res, next) {
    try {
        const group = req.body;
        await (0, GetData_1.createGroup)(group);
        res.end('done');
    }
    catch (err) {
        next(err);
    }
}
