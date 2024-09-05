"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserPermission = checkUserPermission;
const sessionControl_1 = require("../InnerData/sessionControl");
function checkUserPermission(req, _, next) {
    var session = (0, sessionControl_1.accessSession)(req.cookies.sessionId);
    if (session.role == 'user' || session.role == 'admin' || session.role == 'superAdmin') {
        next();
    }
    else {
        next('403');
    }
}
