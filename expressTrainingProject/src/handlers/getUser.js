const express = require('express');
module.exports = async (req, res) => {
    res.output.user.password = Buffer.from(res.output.user.password).toString('base64');
    //delete res.output.user.password
    res.write(JSON.stringify(res.output, null, ' '));
    res.end();
}