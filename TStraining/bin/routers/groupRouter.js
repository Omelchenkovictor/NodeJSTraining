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
router
    .post('/', (0, cookie_parser_1.default)(), express_1.default.json(), (0, index_1.permission)(['superAdmin']), index_2.postGroup, index_1.errorOut)
    .get('/:id', (0, cookie_parser_1.default)(), express_1.default.json(), (0, index_1.permission)(['user', 'admin', 'superAdmin']), index_2.getGroup, index_1.errorOut)
    .post('/add', (0, cookie_parser_1.default)(), express_1.default.json(), (0, index_1.permission)(['user', 'admin', 'superAdmin']), index_2.addToGroup, index_1.errorOut)
    .post('/add/Force', (0, cookie_parser_1.default)(), express_1.default.json(), (0, index_1.permission)(['admin', 'superAdmin']), index_2.addToGroupForse, index_1.errorOut)
    .post('/del', (0, cookie_parser_1.default)(), express_1.default.json(), (0, index_1.permission)(['user', 'admin', 'superAdmin']), index_2.delFromGroup, index_1.errorOut)
    .post('/del/Force', (0, cookie_parser_1.default)(), express_1.default.json(), (0, index_1.permission)(['admin', 'superAdmin']), index_2.delFromGroupForce, index_1.errorOut)
    .post('/ban', (0, cookie_parser_1.default)(), express_1.default.json(), (0, index_1.permission)(['admin', 'superAdmin']), index_2.banInGroup, index_1.errorOut)
    .post('/unBan', (0, cookie_parser_1.default)(), express_1.default.json(), (0, index_1.permission)(['admin', 'superAdmin']), index_2.unBanInGroup, index_1.errorOut);
