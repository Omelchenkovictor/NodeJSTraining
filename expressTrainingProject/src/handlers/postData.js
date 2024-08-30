const { addUser, addArticle, addComment } = require('../InnerDataOnSQL/addData');
const express = require('express');

module.exports = async (req, res, next) => {
    let data = req.body;
    try {
        switch (req.params.type) {
            case 'user':
                console.log(data.username, data.email, data.password, data.aboutMe)
                await addUser(data.username, data.email, data.password, data.aboutMe);
                break;
            case 'article':
                await addArticle(data.username, data.title, data.text);
                break;
            case 'comment':
                await addComment(data.username, data.text, data.articleId);
                break;
            default:
                next(404)
                break;
        }
        res.end('done');
    } catch (err) {
        console.error(err);
        next(err);
    }
}