"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroup = getGroup;
const GetData_1 = require("../InnerData/GetData");
async function getGroup(req, res, next) {
    try {
        res.write(JSON.stringify(await (0, GetData_1.getGroup)(req.params.id), null, ' '));
        res.end();
    }
    catch (err) {
        next(err);
    }
}
