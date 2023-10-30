const passport = require('passport');
const keys = require('../config/keys');
const User = require('../models/User');
const mongoose = require('mongoose');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (jwt_payload, done) => {

            try {            
                const user = (await User.findById(jwt_payload.userId)).isSelected('email, id');
                if (user){
                    done(null, user);
                }
                else
                {
                    done(null, false);
                }
            }
            catch(e){
                console.log(e);
            }
        })
    )
}