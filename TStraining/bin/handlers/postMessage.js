"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMessage = postMessage;
const GetData_1 = require("../InnerData/GetData");
async function postMessage(req, res, next) {
    try {
        const message = req.body;
        await (0, GetData_1.createMessage)(message);
        res.end('done');
    }
    catch (err) {
        next(err);
    }
}
