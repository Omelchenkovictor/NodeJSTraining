import express from "express";

const server = express();

var name: string = 'Adam';

console.log(name)

server
    .get('/get', (_, res):void => {
        res.end('localhost is up')
    })
    .listen(3000, () => {
        console.log('launched', 'http://localhost:3000/');
    })
