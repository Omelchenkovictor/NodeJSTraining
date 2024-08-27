const EventEmitter = require('node:events');
const http = require("http");
const url = require('node:url');
const qs = require('querystring');
const { ArticleData, AccountData } = require("./InnerData/Data.js");
const { logUser, logArticle, logArticleStep2 } = require('./functions.js');



const events = new EventEmitter();


// Як варіант можна наслідувати класс, для того щоб додавати свої ф-ї
// class Events extends EventEmitter {}
// const events = new Events()



events.on('user', ([id, responce, request]) => {
    logUser(id, responce);
    responce.end();
});

events.on('article', ([id, responce, request]) => {
    logArticleStep2(Number(id), responce);
    responce.end();
});

events.on('GET', ([URLdata, responce, request]) => {
    const [ notNecessaryHere, type, id ] = URLdata
    events.emit(type, [id, responce, request]);
    responce.end();
});

events.on('POST', ([notNecessaryHere, responce, request]) => {
    let body = [];
    request.on('data', chunk => {
        body.push(chunk);
      }).on('error', err => {
        console.error(err);
      }).on('end', ()=>{
        body = body.map((chunk)=>chunk.toString()).join('');
        responce.end(JSON.stringify(body));
      })    
});


const server = http.createServer((req, res) => {

    console.log(req.method);

    console.log(req.url)

    const urlParsed = url.parse(req.url);

    const urlSplit = (urlParsed.path).split('/')


    try {
        events.emit(req.method, [urlSplit, res, req]);
    } catch (error) { 
        res.end('Error 404 - data not found'); 
    }


})



server.listen(3000, () => {
    console.log('launched', 'http://localhost:3000/');
})
