// services go here

angular.module("crowdcart.services",[])

.factory("Auth", function($http, $location, $window) {

  // signin
  var signin = function(user) {
    return $http({
      method: "POST",
      url: "/api/signin",
      // clarify on data format
      data: JSON.stringify(user)
    })
    .then(function(res) {
      return res.data
    })
  }

  // signup
  var signup = function(user) {
    console.log(user)
    return $http({
      method: "POST",
      url: "/api/signup",
      // clarify on data format
      data: JSON.stringify(user)
    })
    .then(function(res) {
      return res.data
    })
  }

  var isAuthenticated = function () {
    // check local to see if token exists
    // going by name crowdcarttoken for time being
    return !!$window.localStorage.getItem("crowdcarttoken")
  }

  var signout = function () {
    $window.localStorage.removeItem("crowdcarttoken");
    $window.localStorage.removeItem("crowdcartuser");
    $window.localStorage.removeItem("crowdcartuserstreet");
    $window.localStorage.removeItem("crowdcartusercity");
    $window.localStorage.removeItem("crowdcartuserstate");
    $window.localStorage.removeItem("crowdcartuserzip");
    $location.path("/signin")
  }

  return {
    signin: signin,
    signup: signup,
    isAuthenticated: isAuthenticated,
    signout: signout
  }


})

.factory("Groups", function($http) {

  // get all groups for specific user; since with routing to decide if that's the right meaning
  var getGroups = function (id) {
    // console.log("getting all Groups for", id)
    var user = {userid: id}
    // console.log(JSON.stringify(user))
    return $http({
      method: "GET",
      url: "/api/groups/" + id
      // data: JSON.stringify(user)
    })
    .then(function(res) {
      // console.log('groups: ', res.data)
      return res.data;
    })
  }
  var getOwnedGroups = function (id) {
    // console.log("getting all Groups for", id)
    var user = {userid: id}
    // console.log(JSON.stringify(user))
    return $http({
      method: "GET",
      url: "/api/ownedGroups/" + id
      // data: JSON.stringify(user)
    })
    .then(function(res) {
      // console.log('groups: ', res.data)
      return res.data;
    })
  }
  var getFavGroups = function (id) {
    // console.log("getting all Groups for", id)
    var user = {userid: id}
    // console.log(JSON.stringify(user))
    return $http({
      method: "GET",
      url: "/api/favGroups/" + id
      // data: JSON.stringify(user)
    })
    .then(function(res) {
      // console.log('groups: ', res.data)
      return res.data;
    })
  }

  // get one group when given groupid
  var getOneGroup = function(groupid) {
    return $http({
      method: "GET",
      url: "/api/group/" + groupid
    })
    .then(function(res) {
      return res.data
    })
  }

  //get all groups in system
  var getAllGroups = function() {
    return $http({
      method: "GET",
      url: "/api/crowd"
    })
    .then(function(res){
      // console.log('ALL GroupS: ', res.data);
      return res.data;
    })
  }

  // posting a new groups
 
  var newGroup = function(group) {  //KEYKEY
    console.log("Are we even getting here?");
    return $http({
      method: "POST",
      url: "/api/groups",
      // clarify on data format
      data: JSON.stringify(group)
    })
    .then(function(res) {
      return res.data
    })
  }
  var deleteGroup = function (groupid) {
    return $http({
      method: "DELETE",
      url: "/api/groups/" + groupid
    })
  }
  var addUser = function (groupid,userid) //here this calls the post for the api/groups
  {
    var str = '{"user":"' + userid + '"}';
    var obj = JSON.parse(str);
    return $http({
      method: "PUT",
      url: "/api/addtoGroup/" + groupid,
      // need to decide on format for this call
      data: obj
    })
  }
  var removeUser = function (groupid,userid) //here this calls the post for the api/groups
  {
    var str = '{"user":"' + userid + '"}';
    var obj = JSON.parse(str);
    return $http({
      method: "PUT",
      url: "/api/removefromGroup/" + groupid,
      // need to decide on format for this call
      data: obj
    })
  }
  var favUser = function (groupid,userid) //here this calls the post for the api/groups
  {
    var str = '{"user":"' + userid + '"}';
    var obj = JSON.parse(str);
    return $http({
      method: "PUT",
      url: "/api/addfavtoGroup/" + groupid,
      // need to decide on format for this call
      data: obj
    })
  }
  var removeFavUser = function (groupid,userid) //here this calls the post for the api/groups
  {
    var str = '{"user":"' + userid + '"}';
    var obj = JSON.parse(str);
    return $http({
      method: "PUT",
      url: "/api/removefavfromGroup/" + groupid,
      // need to decide on format for this call
      data: obj
    })
  }
  var favEvent = function (groupid,userid) //here this calls the post for the api/groups
  {
    var str = '{"user":"' + userid + '"}';
    var obj = JSON.parse(str);
    return $http({
      method: "PUT",
      url: "/api/addfavtoEvent/" + groupid,
      // need to decide on format for this call
      data: obj
    })
  }
  var removeFavUserEvent = function (groupid,userid) //here this calls the post for the api/groups
  {
    var str = '{"user":"' + userid + '"}';
    var obj = JSON.parse(str);
    return $http({
      method: "PUT",
      url: "/api/removefavfromEvent/" + groupid,
      // need to decide on format for this call
      data: obj
    })
  }

  // added because server route looks to handle, not sure if we will need it
  var updateStatus = function (groupId, status) {
    return $http({
      method: "POST",
      url: "api/status",
      // need to decide on format for this call
      data: groupId, status
    })
  }

  // Used when Updating Job Deliverer_id
  var updateGroup = function (group) {
    return $http({
      method: "PUT",
      url: "/api/groups",
      data: group
    })
  }
  var getEvents = function (id) {
    
   return $http({
     method: "GET",
     url: "/api/events/" + id
     // data: JSON.stringify(user)
   })
   .then(function(res) {

     return res.data;
   })
 }
 var deleteEvent = function (id) {

  return $http({
    method: "DELETE",
    url: "/api/events/" + id
    // data: JSON.stringify(user)
  })
  .then(function(res) {

    return res.data;
  })
}


  return {
    removeFavUserEvent : removeFavUserEvent,
    favEvent: favEvent,
    getEvents:getEvents,
    getFavGroups:getFavGroups,
    favUser:favUser,
    removeFavUser:removeFavUser,
    addUser :addUser,
    removeUser: removeUser,
    getGroups: getGroups,
    getAllGroups: getAllGroups,
    getOneGroup: getOneGroup,
    newGroup: newGroup,
    updateStatus: updateStatus,
    newGroup: newGroup,
    updateGroup: updateGroup,
    getOwnedGroups : getOwnedGroups,
    deleteGroup: deleteGroup,
    deleteEvent: deleteEvent

  }

})


.factory("Events", function($http) {
  //get all events for a specific group
  // get all events for specific user; since with routing to decide if that's the right meaning
  var getEvents = function (id) {
     console.log("getting all events for this group id ", id);
    var user = {userid: id}
    // console.log(JSON.stringify(user))
    return $http({
      method: "GET",
      url: "/api/events/" + id
      // data: JSON.stringify(user)
    })
    .then(function(res) {
      // console.log('groups: ', res.data)
      return res.data;
    })
  }

  // get one group when given eventid
  var getOneEvent = function(eventid) {
    return $http({
      method: "GET",
      url: "/api/event/" + eventid
    })
    .then(function(res) {
      return res.data
    })
  }

  //get all events in system
  var getAllEvents = function() {
    return $http({
      method: "GET",
      url: "/api/party"
    })
    .then(function(res){
      // console.log('ALL eventS: ', res.data);
      return res.data;
    })
  }

  // posting a new events
 
  var newEvent = function(event) {  //KEYKEY
    console.log("Are we even getting here event?");
    return $http({
      method: "POST",
      url: "/api/events",
      // clarify on data format
      data: JSON.stringify(event)
    })
    .then(function(res) {
      return res.data
    })
  }
  var deleteEvent = function (eventid) {
    return $http({
      method: "DELETE",
      url: "/api/events/" + eventid
    })
  }

  // added because server route looks to handle, not sure if we will need it
 
  // Used when Updating Job Deliverer_id
  var updateEvent = function (event) {
    return $http({
      method: "PUT",
      url: "/api/events",
      data: event
    })
  }

  return {
    getEvents: getEvents,
    getAllEvents: getAllEvents,
    getOneEvent: getOneEvent,
    newEvent: newEvent,
    
    newEvent: newEvent,
    updateEvent: updateEvent,
    deleteEvent: deleteEvent
  }

})


