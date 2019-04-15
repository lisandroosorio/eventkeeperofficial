// require jwt, helper, User, group
var jwt = require('jwt-simple');
var helper = require('../config/helpers.js');
var User = require('./userModel.js');

// export function
module.exports = {

  // TODO:
  // Coordinate with front end on what data
  // should be sent and received.

  // signin method
  signin: function(req, res){
    var email = req.body.email;
    var password = req.body.password;

    // This uses a comparePasswords method of the user model.
    User.findOne({'email': email}, function(err, user){
      if (err) { // notifies if error is thrown
        console.log("mongo findOne signin err: ", err);
        helper.sendError(err, req, res);
      } else {
        if (!user) { // notifies if user is not found
          helper.sendError("No user found", req, res);
        } else {
          user.comparePasswords(password, function(err, match){
            if (!match) { // notifies if password is invalid
              helper.sendError("Password invalid", req, res);
            } else { // signin success, assigns jwt session token
              var token = jwt.encode(user, 'secret');
              res.json({
                token: token, //session token will be set on client side
                // userid also returned.  This should be assigned to a cookie also so that it is available for future server requests and db queries.
                userid: user['_id'],
                address: user['address']
                // anything else to send back on success?
              });
            }
          });
        }
      }
    });
  },
  updateUser: function(req, res){ //currenly only works for user 1 
    
    var id = req.params.id;  //gets userid 
   

    User.findOne({'user_id': id}, function(err, user){
          if (err) {
            console.log('user Findone ERROR ****** ');
            console.error(err);
          }

          //here is where we get json string thing

          user.save();
          res.json(user);
        }
    );

  },
  
  // signup method
  signup: function(req, res){
    var email = req.body.email;
    var newUserObj = req.body

    User.findOne({'email': email}, function(err, user){
      if (err) { // notifies if error is thrown
        console.log("mongo findOne signup err: ", err);
        helper.sendError(err, req, res);
      } else {
        if (user) { // notifies if email is already taken
          helper.sendError("Email already taken", req, res);
        } else {
          User.create(newUserObj, function(err, user){
            if (err) { // notifies if error is thrown
              console.log("mongo create user err: ", err);
              helper.sendError(err, req, res);
            } else { // signup success, assigns jwt session token
              var token = jwt.encode(user, 'secret');
              res.json({
                token: token, //session token will be set on client side
                // userid also returned.  This should be assigned to a cookie also so that it is available for future server requests and db queries.
                userid: user['id']
                // anything else to send back on success?
              });
            }
          });
        }
      }
    });
  }

};