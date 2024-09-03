"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessage = getMessage;
const GetData_1 = require("../InnerData/GetData");
async function getMessage(req, res, next) {
    try {
        res.write(JSON.stringify(await (0, GetData_1.getMessage)(req.params.id), null, ' '));
        res.end();
    }
    catch (err) {
        next(err);
    }
}
