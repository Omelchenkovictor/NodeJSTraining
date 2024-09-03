"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIn = logIn;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const GetData_1 = require("../InnerData/GetData");
const { getUser } = require("../InnerData/GetData");
async function logIn(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    try {
        const user = await getUser(username);
        if (await bcryptjs_1.default.compare(password, user.password)) {
            // change user access to user admin.lvl
            res
                .clearCookie('user')
                .clearCookie('role')
                .clearCookie('date');
            let date = new Date;
            await (0, GetData_1.createSession)(req.cookies.sessionId, user, date);
            res
                .cookie('user', username)
                .cookie('role', user.role)
                .cookie('date', date);
        }
        res.end('done');
    }
    catch (err) {
        next(err);
    }
}
