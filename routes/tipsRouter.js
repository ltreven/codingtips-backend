const express = require('express');
const authenticate = require('../authenticate');
const Movies = require('../models/movies');
const logger = require('../config/winston');

const router = express.Router();

router.use(express.json());

router.route('/')
.all((req, res, next) => {
    logger.info('Routing movies/');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    logger.info('Routing GET movies - returns a list of movies');
    
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
            {director: { $regex: new RegExp(req.query.search), $options: 'i' } } 
        ]};
    }
    Movies.find(search)
    .skip(offset)
    .limit(limit)
    .sort(sort)
    .then((movies) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(movies);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    logger.info('Routing POST movies - creates a movie entry');
    Movies.create(req.body)
    .then((movie) => {
        logger.info('Movie created successfully');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(movie);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser, (req, res, next) => {
    logger.info('Routing PUT - not supported.');
    res.statusCode = 403;
    res.end('PUT operation not supported. Please indicade the movieId.');
})
.delete(authenticate.verifyUser, (req, res, next) => {
    logger.info('Routing DELETE - not supported');
    res.statusCode = 403;
    res.end('DELETE operation not supported. Please indicade the movieId.');
});

router.route('/:movieId')
.all((req, res, next) => {
    logger.info('Routing movies/:movieId');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    logger.info('Routing GET movies/:movieId', req.params.movieId);
    if (req.params.movieId.match(/^[0-9a-fA-F]{24}$/)) {
        Movies.findById(req.params.movieId)
        .then((movie) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(movie);
        }, (err) => next(err))
        .catch((err) => next(err));            
    } else {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.json({status: 'FAILED', message: 'This ID is not valid: ' + req.params.movieId});
    }
})
.post((req, res, next) => {
    logger.info('Routing POST movies/:movieId - not supported');
    res.statusCode = 403;
    res.end('POST operation not supported on /movies/'+ req.params.movieId);
})
.put(authenticate.verifyUser, (req, res, next) => {
    logger.info('Routing PUT movies/:movieId', req.params.movieId);
    Movies.findByIdAndUpdate(req.params.movieId, {
        $set: req.body
    }, { new: true })
    .then((movie) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(movie);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser, (req, res, next) => {
    logger.info('Routing DELETE movies/:movieId', req.params.movieId);
    // enhancement needed: do not DELETE physically. Create logical deletion
    Movies.findByIdAndRemove(req.params.movieId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = router;