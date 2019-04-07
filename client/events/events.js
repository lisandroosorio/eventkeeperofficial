angular.module("crowdcart.events", ["angularMoment"])

.controller("EventsController", function ($scope, Events, $window, $location, $rootScope, $routeParams, $interval) {

  // storage objs
  $scope.data = {};
  $scope.event = {}; //self made vars
 
  $scope.event.items = [];

  $scope.groupid = $window.localStorage.getItem('currentEvent');

 

  console.log("thifs screen ");
   console.log($scope.groupid);


  Events.getEvents($scope.groupid) //gets all the groups right away for the user
  .then(function (events) {
    $scope.data.events = events;
  
  })
  .catch(function (error) {
    console.error(error);
  });


  $scope.showallEvents= function(){
    Events.getAllEvents()
        .then(function(allEvents){
          $scope.data.events = allEvents; ///data binded to scope.data.groups which means this then shows it al if you want it
            //Only showing the group that has not deliverer, and those that do not belong to user, and not overdue
           //changes the scope variable data.events to point to the return if we want this to be the all eventes module and have it linked to a differnet html we can 
        })
        .catch(function(error){
          console.error(error);
        });
  
  }
  $scope.addEvent = function () {
    console.log("here?");

    $scope.event.group_id = $scope.groupid; //this is how you associate the creator of the db

    // Defaulting deliverer_id to empty string
  

    //If user choose the default address, assign the default address to the group to be added
    console.log("YEET");
    
    Events.newEvent($scope.event)
      .then(function () {
        $location.path('/myevents'); //go to mygroups was successfull
      })
      .catch(function (error) {
        console.log(error);
      });
    




  };
  $scope.deleteEvent = function(eventid, idx) {
    Events.deleteEvent(eventid)
      .then(function () {
        $scope.data.events.splice(idx, 1)
      })
  }








})


// Date Picker ui-bootstrap controller





