"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionId = sessionId;
const node_crypto_1 = require("node:crypto");
async function sessionId(req, res, next) {
    try {
        req.cookies.sessionId;
        res.write('done');
    }
    catch (error) {
        res.cookie('sessionId', (0, node_crypto_1.randomUUID)());
    }
    next();
}
