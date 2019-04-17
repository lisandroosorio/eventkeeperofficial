// require helper, User, Event
var helper = require('../config/helpers.js');
var User = require('../users/userModel.js');

var Event = require('./eventModel.js');

// export function
module.exports = {

  // TODO:
  // Coordinate with front end on what data
  // should be sent and received.

  // addEvent method
  addEvent: function(req, res){
    var newEventObj = req.body;

    Event.create(newEventObj, function(err, Event){
      if (err) { // notifies if error is thrown
        console.log("mongo create Event err: ", err);
        helper.sendError(err, req, res);
      } else { // Event created, sends 201 status
        //res.status(201);
        res.json(Event);
      }
    });
  },
 

  // deleteEvent method
  deleteEvent: function(req, res){
    var Eventid = req.params.id;

    Event.remove({'_id': Eventid}, function(err, result){
      if (err) { // notifies if error is thrown
        console.log("mongo deleteOne Event err: ", err);
        helper.sendError(err, req, res);
      } else { // delete successful, sends result of operation
        res.json(result);
      }
    });
  },
  updateEvent: function(req, res){
    var id = req.body.group_id;
    
    var eventId = req.body._id;
    


    Event.findOne({'group_id': id,  '_id': eventId}, function(err, event){
          if (err) {
            console.log('event Findone ERROR ****** ');
            console.error(err);
          }
          if(req.body.type != null)
          {
            event.type = req.body.type;
          }
          if(req.body.description != null)
          {
            event.description = req.body.description; //new
          } 
         if(req.body.name != null)
          {
            event.name = req.body.name;
          } 
          if(req.body.private != null)
          {
            event.private = req.body.private;
          } 
          if(req.body.event_address != null)
          {
            event.event_address = req.body.event_address;
          } 
          
 
          event.save();
          res.json(event);
        }
    );

  },
  // getOneEvent method
  getOneEvent: function(req, res){
    var Eventid = req.params.id;

    Event.findOne({'_id': Eventid}, function(err, Event){
      if (err) { // notifies if error is thrown
        console.log("mongo findOne Event err: ", err);
        helper.sendError(err, req, res);
      } else {
        if (!Event) { // notifies if Event is not found
          helper.sendError("Event not found", req, res);
        } else { // Event found, returns Event
          res.json(Event);
        }
      }
    });
  },
  favEvent: function(req, res){ // here we wil do something that group 
    
    var id = req.params.id; //this is the value passed by the function by the parameters the url has

    Event.findOne({'_id': id   }, function(err, event)
        {
          if (err) {
            console.log('Group Findone ERROR ****** ');
            console.error(err);
          }
          Event.update({ "_id": req.params.id  },
          { $addToSet: { "isFavBy": req.body.user } }, function (err, d) { //finds this groupid and then goes into it and puts the tag into the array
              if (!d.nModified) {
                 // same value entered won't add to the array
              } else {
                  // new value entered and will add to the array
              }
      });
          res.json(event);
        }
    );

  },
  removeFavUserEvent: function(req,res){

    var id = req.params.id;
  
    Event.findOne({'_id': id   }, function(err, event)
    {
      if (err) {
        console.log('Group Findone ERROR ****** ');  //checks if this group even exists
        console.error(err);
      }
      Event.update({'_id': id}, 
      { $pull: {  "isFavBy": req.body.user } }, function (err, result){
        if(err) {
            console.log("error removing user from group. err: ", err);
          //  helper.sendError(err, req, res);
        } else {
            console.log("Successfully removed user");
           res.json(event);
        }
       });
     
    }
  );
  
   },
  // getEvents method
  getEvents: function(req, res){
    // var userid = req.body.userid;

    // temporarily passing through url
    var userid = req.params.id

    Event.find({'group_id': userid})
      .then(function(Events){
        

        res.json(Events);
      });
  },

  // getAllEvents method
  getAllEvents: function(req, res){
    Event.find({})
      .then(function(Events){ // returns array of Events
        res.json(Events);
      });
  },


 

};