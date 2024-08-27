const express = require('express');
const {json} = require('express');
const { ArticleData, AccountData } = require("./InnerData/Data.js");
const { logUser, logArticle, logArticleStep2, } = require('./functions.js');
const { logData } = require('./functions.js');


const server = express();

/* fetch('/post', {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: '{"firststring":"hello", "secondstring":"my dear friend"}'
    }).then(response=>response.text()).then(console.log) */

server

    .get('/user/:id', (req, res) => {
        console.log(req.params.id)
        logUser(req.params.id, res);
        res.end();
    })
    .get('/article/:id', (req, res) => {
        console.log(req.params.id)
        logArticleStep2(Number(req.params.id), res);
        res.end();
    })
    .post('/post', express.json(), (req, res) => {
        // let body = [];
            console.log(req.body);
            res.end('done');
        // req.on('data', chunk => {
        //     body.push(chunk);
        // }).on('error', err => {
        //     console.error(err);
        // }).on('end', () => {
        //     body = body.map((chunk) => chunk.toString()).join('');
        //     res.end(body);
        // });
    })
    .listen(3000, () => {
        console.log('launched', 'http://localhost:3000/');
    })