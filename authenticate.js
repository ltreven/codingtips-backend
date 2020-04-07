const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const FacebookTokenStrategy = require('passport-facebook-token');
const jwt = require('jsonwebtoken');
const logger = require('./config/winston');
const User = require('./models/users');
const config = require('./config/config');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

exports.getToken = function(user) {
    const token = jwt.sign(user, config.security.secretKey, { expiresIn: 3600});
    logger.info('getToken: ', token);
    return token;
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.security.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    logger.info("JWT_PAYLOAD: ", jwt_payload);
    User.findOne({ _id: jwt_payload._id }, (err, user) => {
        if (err) {
            return done(err, false);
        } else if (user) {
            return done(null, user);
        } else {
            return done (null, false);
        }
    })
}));

exports.verifyUser = passport.authenticate('jwt', {session: false});

exports.facebookPassport = passport.use(new FacebookTokenStrategy({
    clientID: config.security.facebook.clientId,
    clientSecret: config.security.facebook.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        logger.info('find user');
        User.findOne({ facebookId: profile.id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (!err & user !== null) {
                return done(null, user);
            } else {
                // user does not exit
                logger.info('creating user! id: ' + profile.id + 
                            ', GivenName: ' + profile.name.givenName + 
                            ', Family: ' + profile.name.familyName + 
                            ', DisplayName: ' + profile.displayName +
                            ', Email[0]: ' + profile.emails[0].value + 
                            ', username: '+ profile.username + 
                            ', photos[0]: '+ profile.photos[0].value );
                var newuser = new User({ username: profile.displayName});
                newuser.facebookId = profile.id;
                newuser.username = profile.emails[0].value;
                newuser.fullName = profile.displayName;
                newuser.save((err, user) => {
                    if (err) {
                        return done(err, false);
                    } else {
                        return done (null, user);
                    }
                })
            }
        });
    }));
