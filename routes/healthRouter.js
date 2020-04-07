const express = require('express');
const logger = require('../config/winston');

const router = express.Router();

router.use(express.json());

router.route('/').get((req, res, next) => {
    logger.info('Routing health');
    res.send('Everything ok here!');
});

module.exports = router;
  
  