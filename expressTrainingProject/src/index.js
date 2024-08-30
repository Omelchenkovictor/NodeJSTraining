const express = require('express');
const { json } = require('express');
//const { ArticleData, AccountData } = require("./InnerData/Data.js");
//const { logUser, logArticle, logArticleStep2, } = require('./functions.js');
const { logData } = require('./functions.js');
const { logArticle, logUser } = require('./InnerDataOnSQL/GetData.js');

function defaultHeaders(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    next();
}


function errorHandler(err, req, res, next) {
    console.error(err.stack)
    switch (err) {
        case '404':
            res.status(404).send({ ErrorMassage: "ERR_404_DATA_NOT_FOUND!!!111!!1!"})
            break;
        case '500':
            res.status(500).send({ ErrorMassage: "ERR_500_ALL_DEAD!!!111!!1!"})
        break;
    
        default:
            res.status(666).send({ ErrorMassage: "UNEXPECTED_ERROR!!!111!!1!"});
    }
    

    res.status(500).send({ ErrorMassage: "ERR_500_ALL_DEAD!!!111!!1!"})
}

userResearch = async (req, res, next) => {
    console.log(req.params.id)
    res.output = await logUser(req.params.id);
    if (res.output.articles.length == 0) {
        delete res.output.articles;
    }
    if (res.output.comments.length == 0) {
        delete res.output.comments;
    }
    next()
}

articleResearch = async (req, res, next) => {
    console.log(req.params.id)
    res.output = await logArticle(Number(req.params.id));
    if (res.output.comments.length == 0) {
        delete res.output.comments;
    }
    next()
}

async function databaseConnectionTracker(req, res, next) {
    try {
        await logUser();
        next()
    }
    catch (err) {
        console.log(err);
        next('500');
    }
}

function dataAvailabilityTracker(req, res, next) {
    console.log(res.output)
    if (res.output.alive != "no"){
        next()
    }
    else {
        console.error(404);
        next('404');
    }
}


const server = express();

 

server

    .get('/user/:id',
        databaseConnectionTracker,
        defaultHeaders,
        userResearch,
        dataAvailabilityTracker,
        async (req, res, next) => {
            res.write(JSON.stringify(res.output, null, ' '));
            res.end();
        },
        errorHandler
    )
    .get('/article/:id',
        databaseConnectionTracker,
        defaultHeaders,
        articleResearch,
        dataAvailabilityTracker,
        async (req, res) => {
            console.log(req.params.id)
            res.write(JSON.stringify(res.output, null, ' '));
            res.end();
        },
        errorHandler
    )
    .post('/post', express.json(), (req, res) => {
        console.log(req.body);
        res.end('done');
    })
    .listen(3000, () => {
        console.log('launched', 'http://localhost:3000/');
    })

