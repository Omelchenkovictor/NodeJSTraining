"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server = (0, express_1.default)();
var name = 'Adam';
console.log(name);
server
    .get('/get', (_, res) => {
    res.end('localhost is up');
})
    .listen(3000, () => {
    console.log('launched', 'http://localhost:3000/');
});
