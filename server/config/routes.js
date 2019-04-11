// require userHandler, groupHandler
var userHandler = require('../users/userHandler.js');
var groupHandler = require('../groups/groupHandler.js');
var eventHandler = require('../events/eventHandler.js');
// export function
module.exports = function(app, express){




  // TODO:  Coordinate with frontend on
  //        the request url names ('/api/...')

  // POST - signin

 app.get('/test', function(req, res){
        res.json('Testing')
        });



        app.post('/api/signin', userHandler.signin);
        // POST - signup
        app.post('/api/signup', userHandler.signup);
        //will need to craete an api call for update user which will be called whenever the array gets increasde
        //api call for updating user 
        

        app.put('/api/addtoGroup/:id', groupHandler.addUser);

        // POST - addgroup
        app.post('/api/groups', groupHandler.addGroup);
        // GET - getGroup (single Group)
        app.get('/api/group/:id', groupHandler.getOneGroup);
        // GET - getGroups (users groups)
        app.get('/api/groups/:id', groupHandler.getGroups);
        // PUT - for updating group
       
        // DELETE - deletes a single group
        app.delete('/api/groups/:id', groupHandler.deleteGroup);
        // GET - getAllGroups
        app.get('/api/crowd', groupHandler.getAllGroups);
        
         // POST - addEvent
         app.post('/api/events', eventHandler.addEvent);
         // GET - getEvent (single Event)
         app.get('/api/event/:id', eventHandler.getOneEvent);
         // GET - getevents (users events)
         app.get('/api/events/:id', eventHandler.getEvents);
         // PUT - for updating event
         app.put('/api/events', eventHandler.updateEvent);
         // DELETE - deletes a single event
         app.delete('/api/events/:id', eventHandler.deleteEvent);
         // GET - getAllevents
         app.get('/api/party', eventHandler.getAllEvents);
        
        app.post('/api/status', groupHandler.updateStatus);
//function is for testing

  // POST - signup

  
  // Will probably need more routes over time

};

