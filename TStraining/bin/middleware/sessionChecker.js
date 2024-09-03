"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionChecker = void 0;
const GetData_1 = require("../InnerData/GetData");
const sessionChecker = (req, res, next) => {
    if ((0, GetData_1.checkSession)(req) != null) {
        next();
        res.end('done');
    }
    else {
        let err = '403';
        next(err);
    }
};
exports.sessionChecker = sessionChecker;
