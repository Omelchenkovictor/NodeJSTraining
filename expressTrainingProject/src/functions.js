const { CreateUser, AddPersonalData, WriteArticle, CommentSmt, FindId, returnAllComments, returnUser, returnAllArticles, returnAllUsers } = require('./InnerData/mainV2.js');
const { ArticleData, AccountData } = require("./InnerData/Data.js");



function logUser(username, res) {
    let user = returnUser(AccountData.get(username));
    res.write('username: ' + JSON.stringify(user.username) + '\n');
    res.write('email: ' + JSON.stringify(user.email) + '\n');
    res.write('About me: ' + JSON.stringify(UserData.get(username).aboutMe) + '\n');
    user.articles.forEach(article => {
        logArticle(article, res);
    })
}

function logArticle(article, res) {
    res.write('title: ' + JSON.stringify(article.title) + ' written by: ' + JSON.stringify(article.username) + '\n');
    res.write(JSON.stringify(article.text) + '\n');
    article.comments.forEach(comment => {
        res.write('     ' + JSON.stringify(comment.username) + ' : ' + JSON.stringify(comment.text) + '\n');
    })
}

function logArticleStep2(id, res) {
    let article = {
        username: ArticleData.get(id).username,
        text: ArticleData.get(id).text,
        title: ArticleData.get(id).title,
        comments: returnAllComments(id)
    }
    logArticle(article, res);
    res.end();
}

module.exports = { logUser, logArticle, logArticleStep2}