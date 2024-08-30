const { logArticle, logUser } = require('..//InnerDataOnSQL/GetData.js');
const express = require('express');

module.exports = async (req, res, next) => {
    console.log(req.params.id)
    res.output = await logArticle(Number(req.params.id));
    if (res.output.comments.length == 0) {
        delete res.output.comments;
    }
    next()
}