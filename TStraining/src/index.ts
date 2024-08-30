import express from "express";

const server = express();


server
    .get('/get', (_, res):void => {
        res.end('localhost is up')
    })
    .listen(3000, () => {
        console.log('launched', 'http://localhost:3000/');
    })
