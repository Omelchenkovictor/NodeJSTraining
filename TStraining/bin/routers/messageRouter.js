"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const index_1 = require("../middleware/index");
const index_2 = require("../handlers/index");
const router = express_1.default.Router();
exports.router = router;
router.post('/', (0, cookie_parser_1.default)(), express_1.default.json(), (0, index_1.permission)(['user', 'admin', 'superAdmin']), index_1.accessMessage, index_2.postMessage, index_1.errorOut);
router.get('/:id', (0, cookie_parser_1.default)(), express_1.default.json(), (0, index_1.permission)(['user', 'admin', 'superAdmin']), index_2.getMessage, index_1.errorOut);
