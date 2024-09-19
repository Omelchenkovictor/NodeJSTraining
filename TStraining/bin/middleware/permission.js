"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permission = void 0;
const sessionControl_1 = require("../InnerData/sessionControl");
var permission = (targetRole) => {
    return async (req, _, next) => {
        try {
            var session = await (0, sessionControl_1.accessSession)(req.cookies.sessionId);
            if (!targetRole.includes(session.role) /* .find((element) => element == session.role) == undefined */) {
                next('403');
            }
            else {
                next();
            }
        }
        catch (error) {
            next('403');
        }
    };
};
exports.permission = permission;
