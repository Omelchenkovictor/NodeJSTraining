"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alternateCookieParser2 = exports.alternateCookieParser = void 0;
const alternateCookieParser = async (req, _, next) => {
    req.cookies = alternateCookieParser2(req.rawHeaders[req.rawHeaders.indexOf('Cookie') + 1]);
    next();
};
exports.alternateCookieParser = alternateCookieParser;
const alternateCookieParser2 = (data) => {
    let reader = data.split('; ');
    let map = {};
    reader.forEach((element) => {
        let data = element.split('=');
        map[data[0]] = data[1];
    });
    return map;
};
exports.alternateCookieParser2 = alternateCookieParser2;
