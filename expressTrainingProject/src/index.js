const express = require('express');
const { json } = require('express');
const { connectionCheck, headersSet, dataAvailibility } = require('./serviceMiddleware/index')
const { checkUser, getUser, errorHandler, checkArticle, getArticle, postData, patchArticle, deleteUser, deleteArticle, deleteComment } = require('./handlers/index')



    /* fetch('/post/user', {
        headers: { 'Content-Type': 'application/json'},
        method: 'POST',
        body:'{"username": "Hannover", "email": "HandGrober@666.com", "password": "666", "aboutMe": "Warship"}'
    }).then(response=>response.text()).then(console.log) */



const server = express();

server

    .get('/user/:id',
        connectionCheck,
        headersSet,
        checkUser,
        dataAvailibility,
        getUser,
        errorHandler
    )
    .get('/article/:id',
        connectionCheck,
        headersSet,
        checkArticle,
        dataAvailibility,
        getArticle,
        errorHandler
    )
    .post('/post/:type',
        connectionCheck,
        express.json(),
        postData,
        errorHandler
    )
    .patch('/patch/:id',
        connectionCheck,
        express.json(),
        patchArticle,
        errorHandler
    )
    .delete('/delete/user/:id', 
        connectionCheck,
        deleteUser,
        errorHandler
    )
    .delete('/delete/article/:name', 
        connectionCheck,
        deleteArticle,
        errorHandler
    )
    .delete('/delete/comment/:name', 
        connectionCheck,
        deleteComment,
        errorHandler
    )
    .listen(3000, () => {
        console.log('launched', 'http://localhost:3000/');
    })


