"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserPermission = checkUserPermission;
function checkUserPermission(req, _, next) {
    if (req.cookies.role == 'user' || req.cookies.role == 'admin' || req.cookies.role == 'superAdmin') {
        next();
    }
    else {
        next('403');
    }
}
