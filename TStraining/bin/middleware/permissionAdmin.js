"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdminPermission = checkAdminPermission;
const sessionControl_1 = require("../InnerData/sessionControl");
function checkAdminPermission(req, _, next) {
    var session = (0, sessionControl_1.accessSession)(req.cookies.sessionId);
    if (session.role == 'admin' || session.role == 'superAdmin') {
        next();
    }
    else {
        next('403');
    }
}
