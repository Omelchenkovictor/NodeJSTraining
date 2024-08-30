const checkArticle = require('./checkArticle');
const checkUser = require('./checkUser');
const getUser = require('./getUser');
const getArticle = require('./getArticle');
const errorHandler = require('./errorHandler');
const postData = require('./postData')
const patchArticle = require('./patchArticle')
const deleteUser = require('./deleteUser')
const deleteArticle = require('./deleteArticle')
const deleteComment = require('./deleteComment')

module.exports = { 
    checkArticle,
    checkUser, 
    getArticle, 
    getUser, 
    errorHandler, 
    postData, 
    patchArticle, 
    deleteUser, 
    deleteArticle, 
    deleteComment };