// require helper, User, Group
var helper = require('../config/helpers.js');
var User = require('../users/userModel.js');
var Group = require('./groupModel.js');

// export function
module.exports = {

  // TODO:
  // Coordinate with front end on what data
  // should be sent and received.

  // addGroup method
  addGroup: function(req, res){
    var newGroupObj = req.body;

    Group.create(newGroupObj, function(err, group){
      if (err) { // notifies if error is thrown
        console.log("mongo create group err: ", err);
        helper.sendError(err, req, res);
      } else { // group created, sends 201 status
        //res.status(201);
        res.json(group);
      }
    });
  },

   // updateGroup method
  updateGroup: function(req, res){
    var id = req.body.creator_id;
    var due_at = req.body.due_at;
    var name = req.body.name;

    // var conditions = {'creator_id': id, 'due_at': due_at, 'name': name, 'deliverer_id': ''};
    // var update = {'deliverer_id': req.body.deliverer_id};

    // Group.update(conditions, update)

    Group.findOne({'creator_id': id, 'due_at': due_at, 'name': name}, function(err, group){
          if (err) {
            console.log('Group Findone ERROR ****** ');
            console.error(err);
          }
          group.deliverer_id = req.body.deliverer_id;
          group.save();
          res.json(group);
        }
    );

  },

  // deleteGroup method
  deleteGroup: function(req, res){
    var groupid = req.params.id;

    Group.remove({'_id': groupid}, function(err, result){
      if (err) { // notifies if error is thrown
        console.log("mongo deleteOne group err: ", err);
        helper.sendError(err, req, res);
      } else { // delete successful, sends result of operation
        res.json(result);
      }
    });
  },

  // getOneGroup method
  getOneGroup: function(req, res){
    var groupid = req.params.id;

    Group.findOne({'_id': groupid}, function(err, group){
      if (err) { // notifies if error is thrown
        console.log("mongo findOne group err: ", err);
        helper.sendError(err, req, res);
      } else {
        if (!group) { // notifies if group is not found
          helper.sendError("Group not found", req, res);
        } else { // group found, returns group
          res.json(group);
        }
      }
    });
  },

  // getGroups method
  getGroups: function(req, res){
    // var userid = req.body.userid;

    // temporarily passing through url
    var userid = req.params.id

    Group.find({'creator_id': userid})
      .then(function(groups){
        res.json(groups);
      });
  },

  // getAllGroups method
  getAllGroups: function(req, res){
    Group.find({})
      .then(function(groups){ // returns array of groups
        res.json(groups);
      });
  },


  // updateStatus method
  updateStatus: function(req, res){
    var groupid = req.body.groupid;
    var userid = req.body.userid;

    Group.findOne({'_id': groupid}, function(err, group){
      if (err) { // notifies if error is thrown
        console.log("mongo findOne group err: ", err);
      } else {
        if (!group) { // notifies if group is not found
          helper.sendError("Group not found", req, res);
        } else {
          Group.update({'_id': groupid}, {'deliverer_id': userid}, function(err, result){
            if (err) { // notifies if error is thrown
              console.log("mongo update err: ", err);
            } else { // update successful, returns result
              res.json(result);
            }
          });
        }
      }
    });
  }

};