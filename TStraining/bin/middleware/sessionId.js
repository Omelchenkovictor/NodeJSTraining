"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionId = sessionId;
const node_crypto_1 = require("node:crypto");
async function sessionId(_, res, next) {
    /* try {
        if (req.cookies.sessionId && req.cookies.user && req.cookies.role && req.cookies.date)
        //res.write('done');
        { next() }
    } catch (error) {
        res.cookie('sessionId', randomUUID());
        next()
    } */
    await res.cookie('sessionId', (0, node_crypto_1.randomUUID)());
    next();
}
