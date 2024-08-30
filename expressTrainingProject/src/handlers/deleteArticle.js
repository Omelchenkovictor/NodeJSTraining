const { deleteElement } = require('../InnerDataOnSQL/GetData.js');
const express = require('express');

module.exports = (req, res, next) => {
    try {
        deleteElement('article', req.params,id)
        res.end('done')
    } catch(err) {
        next(err)
    }
}