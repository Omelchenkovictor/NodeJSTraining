"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUser = postUser;
const GetData_1 = require("../InnerData/GetData");
async function postUser(req, res, next) {
    try {
        const user = req.body;
        await (0, GetData_1.createUser)(user);
        res.end('done');
    }
    catch (err) {
        next(err);
    }
}
