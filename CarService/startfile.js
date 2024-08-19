const http = require("http");
const url = require('node:url');
const qs = require('querystring');
const { CreateUser, AddPersonalData, WriteArticle, CommentSmt, FindId, returnAllComments, returnUser, returnAllArticles, returnAllUsers } = require('./InnerData/mainV2.js');
const { type } = require("os");
const { ArticleData, AccountData } = require("./InnerData/Data.js");



/* function insertData() {    let article1 = FindId('Anby', "Last Film");

    let article2 = FindId('Bob', "Bed film");

    CommentSmt(AccountData.get("Bob"), "Never!", article1);
    CommentSmt(AccountData.get("Anby"), "Nah, it was good!", article2);

    CommentSmt(AccountData.get("Bob"), "2!", article2);
    CommentSmt(AccountData.get("Anby"), "1!", article1);
    CommentSmt(AccountData.get("Bob"), "1!", article1);
    CommentSmt(AccountData.get("Anby"), "2", article2);
    CommentSmt(AccountData.get("Bob"), "2!", article2);
    CommentSmt(AccountData.get("Anby"), "11!", article1);

    CommentSmt(AccountData.get("Anby"), "1!", article1);
    CommentSmt(AccountData.get("Anby"), "2", article2);
    CommentSmt(AccountData.get("Bob"), "2!", article2);
    CommentSmt(AccountData.get("Bob"), "1!", article1);
}
insertData(); */




const server = http.createServer((req, res) => {

    console.log(req.url)

    const urlParsed = url.parse(req.url);
    const qsParsed = qs.parse(urlParsed.query)

    console.log(urlParsed)

    const urlSplit = (urlParsed.path).split('/')

    console.log(urlSplit)
    console.log(urlSplit[0])

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


    function logUser(username) {
        let user = returnUser(AccountData.get(username));
        res.write('username: ' + JSON.stringify(user.username) + '\n');
        res.write('email: ' + JSON.stringify(user.email) + '\n');
        res.write('About me: ' + JSON.stringify(UserData.get(username).aboutMe) + '\n');
        user.articles.forEach(article => {
            logArticle(article);
        })
    }

    function logArticle(article) {
        res.write('title: ' + JSON.stringify(article.title) + ' written by: ' + JSON.stringify(article.username) + '\n');
        res.write(JSON.stringify(article.text) + '\n');
        article.comments.forEach(comment => {
            res.write('     ' + JSON.stringify(comment.username) + ' : ' + JSON.stringify(comment.text) + '\n');
        })
    }


    function logArticleStep2(id) {
        let article = {
            username: ArticleData.get(id).username,
            text: ArticleData.get(id).text,
            title: ArticleData.get(id).title,
            comments: returnAllComments(id)
        }
        logArticle(article);
        res.end();
    }

    


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
                let article = {
                    username: ArticleData.get(Number(qsParsed.id)).username,
                    text: ArticleData.get(Number(qsParsed.id)).text,
                    title: ArticleData.get(Number(qsParsed.id)).title,
                    comments: returnAllComments((Number(qsParsed.id)))
                }
                logArticle(article);
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

    

    try {
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
    }


})



server.listen(3000, () => {
    console.log('launched', 'http://localhost:3000/');
})
