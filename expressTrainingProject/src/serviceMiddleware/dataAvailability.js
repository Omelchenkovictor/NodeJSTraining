const express = require('express');

module.exports = (req, res, next) => {
    console.log(res.output)
    if (res.output.alive != "no"){
        next()
    }
    else {
        console.error(404);
        next('404');
    }
}