const express = require('express');
const logger = require('../config/winston');
const Tips = require('../models/tips');
const showdown   = require('showdown');
const fs = require('fs');
const path = require('path');

const router = express.Router();
router.use(express.json());

converter = new showdown.Converter();

router.route('/:tipId')
.get((req, res, next) => {
    logger.info(`Routing GET tip ${req.params.tipId} content`);

    // find tip
    if (req.params.tipId.match(/^[0-9a-fA-F]{24}$/)) {
        Tips.findById(req.params.tipId)
        .then((tip) => {
            logger.info("Found tip! Rendering tip.title " + tip.title);

            let content;
            const filePath = path.join(__dirname, '../public/md/' + tip.mdFile);
            fs.readFile(filePath, "utf8",
                function (error, pgResp) {
                    if (error) {
                        next(error);
                    } else {
                        logger.info("Found file!  ");
                        content = pgResp;
                        res.render('tip', {title: tip.title, 
                            content: converter.makeHtml(content),
                            condition: false});  
        
                    }                 
                }
            );

        }, (err) => next(err))
        .catch((err) => next(err));            
    } else {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.json({status: 'FAILED', message: 'This ID is not valid: ' + req.params.tipId});
    }

});

module.exports = router;
  
  