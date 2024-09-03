"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdminPermission = checkAdminPermission;
function checkAdminPermission(req, _, next) {
    if (req.cookies.role == 'admin' || req.cookies.role == 'superAdmin') {
        next();
    }
    else {
        next('403');
    }
}
