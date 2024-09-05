"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewSession = addNewSession;
exports.accessSession = accessSession;
var sessionMap = new Map();
function addNewSession(UUID, data) {
    sessionMap.delete(UUID);
    sessionMap.set(UUID, data);
}
function accessSession(UUID) {
    //console.log(sessionMap)
    return sessionMap.get(UUID);
}
