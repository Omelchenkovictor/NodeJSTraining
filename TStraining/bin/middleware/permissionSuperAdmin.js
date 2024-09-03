"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSuperAdminPermission = checkSuperAdminPermission;
function checkSuperAdminPermission(req, _, next) {
    if (req.cookies.role == 'superAdmin') {
        next();
    }
    else {
        next('403');
    }
}
