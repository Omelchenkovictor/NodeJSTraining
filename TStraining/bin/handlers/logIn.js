"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIn = logIn;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const GetData_1 = require("../InnerData/GetData");
const sessionControl_1 = require("../InnerData/sessionControl");
const node_crypto_1 = require("node:crypto");
const { getUser } = require("../InnerData/GetData");
async function logIn(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    try {
        const user = await getUser(username);
        if (await bcryptjs_1.default.compare(password, user.password)) {
            // change user access to user admin.lvl
            let date = new Date;
            let UUID = (0, node_crypto_1.randomUUID)();
            res.cookie('sessionId', UUID);
            await (0, GetData_1.createSession)(UUID, user, date);
            res
                .cookie('user', username)
                .cookie('role', user.role)
                .cookie('date', date);
            await (0, GetData_1.renewSession)(UUID, username);
            console.log(UUID);
            console.log('first', (0, sessionControl_1.accessSession)(UUID).groups[0].group);
        }
        res.end('done');
    }
    catch (err) {
        next(err);
    }
}
