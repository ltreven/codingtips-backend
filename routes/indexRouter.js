const express = require('express');
const logger = require('../config/winston');

const router = express.Router();

router.use(express.json());

router.route('/').get((req, res, next) => {
    logger.info('Routing GET homepage');
    res.render('index', {title: 'Coding Tips API', condition: false});    
});

module.exports = router;
  
  