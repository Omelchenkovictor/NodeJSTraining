"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const index_1 = require("../handlers/index");
const index_2 = require("../middleware/index");
const router = express_1.default.Router();
exports.router = router;
router.post('/', (0, cookie_parser_1.default)(), express_1.default.json(), index_1.postUser, index_2.errorOut);
router.get('/:username', (0, cookie_parser_1.default)(), express_1.default.json(), index_1.getUser, index_2.errorOut)
    .post('/setAdmin', (0, cookie_parser_1.default)(), express_1.default.json(), (0, index_2.permission)(['superAdmin']), index_1.setAdmin, index_2.errorOut)
    .post('/delAdmin', (0, cookie_parser_1.default)(), express_1.default.json(), (0, index_2.permission)(['superAdmin']), index_1.deleteAdmin, index_2.errorOut);
