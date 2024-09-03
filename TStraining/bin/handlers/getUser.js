"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = getUser;
const GetData_1 = require("../InnerData/GetData");
async function getUser(req, res, next) {
    try {
        res.write(JSON.stringify(await (0, GetData_1.getUser)(req.params.username), null, ' '));
        res.end();
    }
    catch (err) {
        next(err);
    }
}
