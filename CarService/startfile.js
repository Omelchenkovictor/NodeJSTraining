const eventDispather = require("./eventDispatcher.js");
const http = require("http");
const url = require('node:url');
const qs = require('querystring');
const { CreateUser, AddPersonalData, WriteArticle, CommentSmt, FindId, returnAllComments, returnUser, returnAllArticles, returnAllUsers } = require('./InnerData/mainV2.js');
const { type } = require("os");
const { ArticleData, AccountData } = require("./InnerData/Data.js");
const { logUser, logArticle, logArticleStep2 } = require('./functions.js');



const events = new eventDispather();


events.addListener('user', (data) => {
    logUser(data[0], data[1]);
    data[1].end();
});

events.addListener('article', (data) => {
    logArticleStep2(Number(data[0]), data[1]);
    data[1].end();
});

const server = http.createServer((req, res) => {

    console.log(req.method);

    console.log(req.url)

    const urlParsed = url.parse(req.url);
    //const qsParsed = qs.parse(urlParsed.query)

    //console.log(urlParsed.path)

    const urlSplit = (urlParsed.path).split('/')

    console.log(urlSplit)



    try {
        events.dispatch(urlSplit[1], [urlSplit[2], res]);
    } catch (error) { 
        res.end('Error 404 - data not found'); 
    }

    /* fetch('/user/Anby', {
        method: 'POST',
        text:'hello'
    }).then(res=>res.text()).then(console.log) */





    /*     events.addListener('comment', (data) => { 
            console.log('calm ' + data) 
        }); */




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
