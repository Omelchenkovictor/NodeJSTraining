const { changeArticle } = require('..//InnerDataOnSQL/GetData.js');
const express = require('express');

module.exports = (req, res, next) => {
    let text = req.body.text
    try {
        changeArticle(req.params.id, text)
        res.end('done')
    } catch (err) {
        next(err)
    }
}