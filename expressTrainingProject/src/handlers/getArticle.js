const express = require('express');

module.exports = async (req, res) => {
    res.write(JSON.stringify(res.output, null, ' '));
    res.end();
}