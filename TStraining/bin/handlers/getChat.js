"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChat = getChat;
const GetData_1 = require("../InnerData/GetData");
async function getChat(req, res, next) {
    try {
        res.write(JSON.stringify(await (0, GetData_1.getChat)(req.params.id), null, ' '));
        res.end();
    }
    catch (err) {
        next(err);
    }
}
