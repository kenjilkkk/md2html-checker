const express = require('express');
const { checkController } = require('../controllers/checkController');

const route = express.Router();

route.get('/:index', checkController);

module.exports = route;
