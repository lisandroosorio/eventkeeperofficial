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

   // add user to group
  addUser: function(req, res){ // here we wil do something that group 
    
    var id = req.params.id; //this is the value passed by the function by the parameters the url has

    Group.findOne({'_id': id   }, function(err, group)
        {
          if (err) {
            console.log('Group Findone ERROR ****** ');
            console.error(err);
          }
          Group.update({ "_id": req.params.id  },
          { $addToSet: { "isFollowedBy": req.body.user } }, function (err, d) { //finds this groupid and then goes into it and puts the tag into the array
              if (!d.nModified) {
                 // same value entered won't add to the array
              } else {
                  // new value entered and will add to the array
              }
      });
          res.json(group);
        }
    );

  },
  favUser: function(req, res){ // here we wil do something that group 
    
    var id = req.params.id; //this is the value passed by the function by the parameters the url has

    Group.findOne({'_id': id   }, function(err, group)
        {
          if (err) {
            console.log('Group Findone ERROR ****** ');
            console.error(err);
          }
          Group.update({ "_id": req.params.id  },
          { $addToSet: { "isFavBy": req.body.user } }, function (err, d) { //finds this groupid and then goes into it and puts the tag into the array
              if (!d.nModified) {
                 // same value entered won't add to the array
              } else {
                  // new value entered and will add to the array
              }
      });
          res.json(group);
        }
    );

  },
  removeFavUser: function(req,res){

    var id = req.params.id;
  
    Group.findOne({'_id': id   }, function(err, group)
    {
      if (err) {
        console.log('Group Findone ERROR ****** ');  //checks if this group even exists
        console.error(err);
      }
      Group.update({'_id': id}, 
      { $pull: {  "isFavBy": req.body.user } }, function (err, result){
        if(err) {
            console.log("error removing user from group. err: ", err);
          //  helper.sendError(err, req, res);
        } else {
            console.log("Successfully removed user");
           res.json(group);
        }
       });
     
    }
  );
  
   },
removeUser: function(req,res){

  var id = req.params.id;

  Group.findOne({'_id': id   }, function(err, group)
  {
    if (err) {
      console.log('Group Findone ERROR ****** ');  //checks if this group even exists
      console.error(err);
    }
    Group.update({'_id': id}, 
    { $pull: {  "isFollowedBy": req.body.user } }, function (err, result){
      if(err) {
          console.log("error removing user from group. err: ", err);
        //  helper.sendError(err, req, res);
      } else {
          console.log("Successfully removed user");
         res.json(group);
      }
     });
   
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

  // getGroups that you are an owner of  method
  getOwnedGroups: function(req, res){
    // var userid = req.body.userid;

    // temporarily passing through url
    var userid = req.params.id // we need this as this is the user id that will be used


    Group.find({'creator_id': userid})
      .then(function(groups){
        res.json(groups);
      });
  },
  getFavGroups: function(req, res){
    // var userid = req.body.userid;

    // temporarily passing through url
    var userid = req.params.id // we need this as this is the user id that will be used


    Group.find({'isFavBy': userid})
      .then(function(groups){
        res.json(groups);
      });
  },
  getGroups: function(req, res){ //get groups you follow
    // var userid = req.body.userid;

    // temporarily passing through url
    var userid = req.params.id // we need this as this is the user id that will be used


    Group.find({'isFollowedBy': userid})
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
  //updates the groups information if the user is in fact the owner of the group

  updateGroup: function(req, res){
    var id = req.body.creator_id;
  
    var groupId = req.body._id;
    


    Group.findOne({'creator_id': id,  '_id': groupId}, function(err, group){
          if (err) {
            console.log('Group Findone ERROR ****** ');
            console.error(err);
          }
          if(req.body.school != null)
          {
            group.school = req.body.school;
          }
          if(req.body.description != null)
          {
            group.description = req.body.description; //new
          } 
         if(req.body.name != null)
          {
            group.name = req.body.name;
          } 
          if(req.body.private != null)
          {
            group.private = req.body.private;
          } 
          if(req.body.location_address != null)
          {
            group.location_address = req.body.location_address;
          } 
          
 
          group.save();
          res.json(group);
        }
    );

  },
  // updateStatus method
  updateStatus: function(req, res){
    var groupid = req.params.groupid;
    var userid = req.params.userid;
    console.log(groupid);
    console.log(userid);


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