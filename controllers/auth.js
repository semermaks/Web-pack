const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async function(req, res){
    //console.log('call login...');
    const userDb = await User.findOne({email: req.body.email});
    if (userDb){
        const isRulePassw = bcrypt.compareSync(req.body.password, userDb.password);
        if (isRulePassw){
            const token = jwt.sign({
                email: userDb.email,
                userId: userDb._id
            }, keys.jwt, { expiresIn: 60 * 60 });
            res.status(200).json({
                token: `Bearer ${token}`
            });
        } else {
            errorHandler(res, 401, { message: "Пароли не совпадают"   });
        
           /*  res.status(401).json({
                message: 'Пароли не совпадают'
            }); */
        }

    } else {
        errorHandler(res, 404, { message: "Пользователя нет в системе"   });
        
        /* res.status(404).json({
            message: 'Пользователя нет в системе'
        }); */
    }
}

module.exports.register = async function(req, res){
    const userDb = await User.findOne({email: req.body.email});
    if (userDb) {
        errorHandler(res, 409, { message: "Такой e-mail уже существует!!!"   });
    }
    else {
        const salt =  bcrypt.genSaltSync(keys.salt);
        const passw =  bcrypt.hashSync(req.body.password, salt);
        const user = new User({
            email: req.body.email,
            password: passw//req.body.password
        });
        try {
            await user.save();
            res.status(201).json(user);
        }
        catch(e){

            errorHandler(res, 500, e);
            /* 
            res.status(500).json({
                message: e.message ? e.message : 'error....'
            }); */
        }
        
    }
   /*  res.status(200).json({
        message: 'call command register',
        login: {
            email: req.body.email,
            password: req.body.password
        }
    }); */
}