// var connection = require('../dbConnection');
const conn = require('../dbConnection');
var expressValidator = require('express-validator');
var bcrypt = require('bcrypt');
const saltRounds = 10;
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017";

module.exports = {

    registerUser: function (name, surname, u_class, email, mobile_number, pwd) {
        return new Promise(function (resolve, reject) {
            const password = bcrypt.hashSync(pwd, saltRounds);
            // console.log("Before");
            // console.log(password);
            const obj = {
                name: name,
                surname: surname,
                u_class: u_class,
                email: email,
                mobile_number: mobile_number,
                password: password
            };
            conn.collection('test').insertOne(obj, function (err, result) {
                if (err) {
                    // throw err;
                    reject(-1);
                }
                // console.log(result);
                resolve('New User Created');
            });
        });
    },

    loginUser: function (email, pwd) {
        return new Promise(function (resolve, reject) {
            console.log(email);
            const password = bcrypt.hashSync(pwd, saltRounds);
            
            const obj = {
                email: email
                // password: password
            };
            conn.collection('test').find(obj).toArray(function (err, result) {
                if (err) {
                    reject(-1);
                }
                else{
                    if(result.length == 0) {
                        // console.log(result);
                        resolve('Invalid Email');
                    }
                    else{
                        if(bcrypt.compareSync(pwd,result[0].password.toString())) {
                            resolve('Successful Login');
                        }
                        else{
                            resolve('Incorrect Password');
                        }
                    }
                }
            });
        });
    }
};