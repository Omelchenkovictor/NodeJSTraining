"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postGroup = exports.postMessage = exports.postUser = exports.postChat = exports.delFromGroup = exports.addToGroup = exports.logIn = exports.getGroup = exports.getChat = exports.getMessage = exports.getUser = void 0;
const getUser_1 = require("./getUser");
Object.defineProperty(exports, "getUser", { enumerable: true, get: function () { return getUser_1.getUser; } });
const logIn_1 = require("./logIn");
Object.defineProperty(exports, "logIn", { enumerable: true, get: function () { return logIn_1.logIn; } });
const addToGroup_1 = require("./addToGroup");
Object.defineProperty(exports, "addToGroup", { enumerable: true, get: function () { return addToGroup_1.addToGroup; } });
const delFromGroup_1 = require("./delFromGroup");
Object.defineProperty(exports, "delFromGroup", { enumerable: true, get: function () { return delFromGroup_1.delFromGroup; } });
const postChat_1 = require("./postChat");
Object.defineProperty(exports, "postChat", { enumerable: true, get: function () { return postChat_1.postChat; } });
const postUser_1 = require("./postUser");
Object.defineProperty(exports, "postUser", { enumerable: true, get: function () { return postUser_1.postUser; } });
const postMessage_1 = require("./postMessage");
Object.defineProperty(exports, "postMessage", { enumerable: true, get: function () { return postMessage_1.postMessage; } });
const postGroup_1 = require("./postGroup");
Object.defineProperty(exports, "postGroup", { enumerable: true, get: function () { return postGroup_1.postGroup; } });
const getMessage_1 = require("./getMessage");
Object.defineProperty(exports, "getMessage", { enumerable: true, get: function () { return getMessage_1.getMessage; } });
const getChat_1 = require("./getChat");
Object.defineProperty(exports, "getChat", { enumerable: true, get: function () { return getChat_1.getChat; } });
const getGroup_1 = require("./getGroup");
Object.defineProperty(exports, "getGroup", { enumerable: true, get: function () { return getGroup_1.getGroup; } });
