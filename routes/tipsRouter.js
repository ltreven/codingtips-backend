const express = require('express');
const authenticate = require('../authenticate');
const Tips = require('../models/tips');
const logger = require('../config/winston');

const router = express.Router();

router.use(express.json());

router.route('/')
.all((req, res, next) => {
    logger.info('Routing tips/');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    logger.info('Routing GET tips - returns a list of tips');
    
    // (BONUS) Pagination (and sorting):
    let limit = 20;
    let offset = 0;
    let sort = {};
    let search = {};

    if (req.query.limit && !isNaN(req.query.limit)) {
        limit = parseInt(req.query.limit);
    }
    if (req.query.offset && !isNaN(req.query.offset)) {
        offset = parseInt(req.query.offset);
    }
    if (req.query.sort) {
        sort = req.query.sort;
    }
    if (req.query.search) {
        search = {$or: [
            {title: { $regex: new RegExp(req.query.search), $options: 'i' } }, 
            {summary: { $regex: new RegExp(req.query.search), $options: 'i' } } 
        ]};
    }
    Tips.find(search)
    .skip(offset)
    .limit(limit)
    .sort(sort)
    .then((tips) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(tips);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    logger.info('Routing POST tips - creates a tip entry');
    Tips.create(req.body)
    .then((tip) => {
        logger.info('Tip created successfully');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(tip);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser, (req, res, next) => {
    logger.info('Routing PUT - not supported.');
    res.statusCode = 403;
    res.end('PUT operation not supported. Please indicade the tipId.');
})
.delete(authenticate.verifyUser, (req, res, next) => {
    logger.info('Routing DELETE - not supported');
    res.statusCode = 403;
    res.end('DELETE operation not supported. Please indicade the tipId.');
});

router.route('/:tipId')
.all((req, res, next) => {
    logger.info('Routing tips/:tipId');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    logger.info('Routing GET tips/:tipId', req.params.tipId);
    if (req.params.tipId.match(/^[0-9a-fA-F]{24}$/)) {
        Tips.findById(req.params.tipId)
        .then((tip) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(tip);
        }, (err) => next(err))
        .catch((err) => next(err));            
    } else {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.json({status: 'FAILED', message: 'This ID is not valid: ' + req.params.tipId});
    }
})
.post((req, res, next) => {
    logger.info('Routing POST tips/:tipId - not supported');
    res.statusCode = 403;
    res.end('POST operation not supported on /tips/'+ req.params.tipId);
})
.put(authenticate.verifyUser, (req, res, next) => {
    logger.info('Routing PUT tips/:tipId', req.params.tipId);
    Tips.findByIdAndUpdate(req.params.tipId, {
        $set: req.body
    }, { new: true })
    .then((tip) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(tip);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser, (req, res, next) => {
    logger.info('Routing DELETE tips/:tipId', req.params.tipId);
    // enhancement needed: do not DELETE physically. Create logical deletion
    Tips.findByIdAndRemove(req.params.tipId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = router;