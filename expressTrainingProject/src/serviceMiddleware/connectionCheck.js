const { logArticle, logUser } = require('..//InnerDataOnSQL/GetData.js');
const express = require('express');

module.exports = async (req, res, next) => {
    try {
        await logUser();
        next()
    }
    catch (err) {
        console.log(err);
        next('500');
    }
}