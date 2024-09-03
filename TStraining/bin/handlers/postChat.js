"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postChat = postChat;
const GetData_1 = require("../InnerData/GetData");
async function postChat(req, res, next) {
    try {
        const chat = req.body;
        await (0, GetData_1.createChat)(chat);
        res.end('done');
    }
    catch (err) {
        next(err);
    }
}
