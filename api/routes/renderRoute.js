const express = require('express');
const { renderController } = require('../controllers/renderController');

const route = express.Router();

route.get('/:index', renderController);


module.exports = route;
