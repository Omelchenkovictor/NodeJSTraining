const eventDispather = require("./eventDispatcher.js");
const http = require("http");
const url = require('node:url');
const qs = require('querystring');
const { CreateUser, AddPersonalData, WriteArticle, CommentSmt, FindId, returnAllComments, returnUser, returnAllArticles, returnAllUsers } = require('./InnerData/mainV2.js');
const { type } = require("os");
const { ArticleData, AccountData } = require("./InnerData/Data.js");
const { logUser, logArticle, logArticleStep2 } = require('./functions.js');



const events = new eventDispather();


events.addListener('user', ([id, responce, request]) => {
    logUser(id, responce);
    responce.end();
});

events.addListener('article', ([id, responce, request]) => {
    logArticleStep2(Number(id), responce);
    responce.end();
});

events.addListener('GET', ([URLdata, responce, request]) => {
    events.dispatch(URLdata[1], [URLdata[2], responce, request]);
    responce.end();
});

events.addListener('POST', ([notNecessaryHere, responce, request]) => {
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
        events.dispatch(req.method, [urlSplit, res, req]);
    } catch (error) { 
        res.end('Error 404 - data not found'); 
    }


    
    /* fetch('', {
        method: 'POST',
        body:'hello' + ' my dear friend'
    }).then(response=>response.text()).then(console.log) */

    /*     switch (req.url) {
            case '/Bob':
                res.end(JSON.stringify(returnUser(AccountData.get("Bob"))));
                break;
            case '/Anby':
                res.write(JSON.stringify(returnUser(AccountData.get("Anby"))));
                res.end()
                break;
            default:
                res.end('I have no Idea!');
                break;
        } */

    /* res.write(JSON.stringify(qsParsed));
    res.write('\n');

    try {
        switch (qsParsed.type) {
            case 'user':
                //res.write(JSON.stringify(AccountData.get(qsParsed.id)));
                logUser(qsParsed.id);
                res.end();
                break;

            case 'article':
                //res.write(JSON.stringify(ArticleData.get(Number(qsParsed.id))));
                logArticleStep2(Number(qsParsed.id));
                res.end();
                break;

            default:
                res.end('No request done.');
                break;
        }
    }
    catch (error) {
        res.end('404 - data not found.');
    } */

    /*     try {
            switch (urlSplit[1]) {
                case 'user':
                    //res.write(JSON.stringify(AccountData.get(qsParsed.id)));
                    logUser(urlSplit[2]);
                    res.end();
                    break;
    
                case 'article':
                    //res.write(JSON.stringify(ArticleData.get(Number(qsParsed.id))));
                    logArticleStep2(Number(urlSplit[2]));
                    res.end();
                    break;
    
                default:
                    res.end('No request done.');
                    break;
            }
        }
        catch (error) {
            res.end('404 - data not found.');
        } */

})



server.listen(3000, () => {
    console.log('launched', 'http://localhost:3000/');
})
