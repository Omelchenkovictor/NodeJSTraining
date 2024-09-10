"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCurrentUser = checkCurrentUser;
const sessionControl_1 = require("../InnerData/sessionControl");
function checkCurrentUser(req, _, next) {
    var session = (0, sessionControl_1.accessSession)(req.cookies.sessionId);
    if (session.id == req.body.userId
        || session.role == 'superAdmin'
        || session.role == 'admin') {
        next();
    }
    else {
        next('403');
    }
}
