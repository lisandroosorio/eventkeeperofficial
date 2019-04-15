angular.module("crowdcart.groups", ["angularMoment"])

.controller("GroupsController", function ($scope, Groups, $window, $location, $rootScope, $routeParams, $interval) {

  // storage objs
  $scope.data = {};
  $scope.group = {};
  $scope.group.location_address = {};
  $scope.group.items = [];
  $scope.usertmp = {};

  console.log('HELLLLO1!');


  // store userid/gorupid into local storage (same level as auth token)
  $scope.userid = $window.localStorage.getItem('crowdcartuser');
  $scope.street = $window.localStorage.getItem('crowdcartuserstreet');
  $scope.state = $window.localStorage.getItem('crowdcartuserstate');
  $scope.city = $window.localStorage.getItem('crowdcartusercity');
  $scope.zip = $window.localStorage.getItem('crowdcartuserzip');
  

  console.log("we are currently with user "+ $scope.userid);
  if ($routeParams.groupid) { //this is what sends the group type to the user, tis is what displays the groups
    $scope.currentgroup = $routeParams.groupid;
    $scope.currentname = $routeParams.name;

    $window.localStorage.setItem('currentEvent', $scope.currentgroup);   
    $window.localStorage.setItem('currentNameEvent',$scope.currentname);
    


    Groups.getOneGroup($routeParams.groupid)
      .then(function (group) {
        $scope.displayGroup = group
      })
      console.log($window.localStorage.getItem('currentEvent'));
  }

  Groups.getGroups($scope.userid) //gets all the Groups right away for the user
  .then(function (groups) {
    $scope.data.groups = groups;
  
  })
  .catch(function (error) {
    console.error(error);
  });

  $(document).ready(function(){

    console.log("document loaded");
  
  });
  $(window).on("load",function(){
  
  console.log("window loaded");
  
  });
      
   var initialize = function () {
    

    // is routePararms exists it means directed here via URL
    if ($routeParams.groupid) {
      Groups.getOneGroup($routeParams.groupid)
        .then(function (group) {
          $scope.displayGroup = group
        })
    }
    //displaygroup._id is what holds the value we need to send as the creator id!!
    //Get all groups belong to user
    Groups.getGroups($scope.userid)
      .then(function (groups) {
        $scope.data.groups = groups;
      })
      .catch(function (error) {
        console.error(error);
      });

      Groups.getAllGroups()
      .then(function(allGroups){
        $scope.data.allGroups = allGroups;
          //Only showing the group that has not deliverer, and those that do not belong to user, and not overdue
         
      })
      .catch(function(error){
        console.error(error);
      });
    


  };
$scope.showallZ = function(){
  Groups.getAllGroups()
      .then(function(allGroups){
        $scope.data.groups = allGroups; ///data binded to scope.data.Groups which means this then shows it al if you want it
          //Only showing the Group that has not deliverer, and those that do not belong to user, and not overdue
         
      })
      .catch(function(error){
        console.error(error);
      });

}
$scope.enter = function(groupid) {
  // simple redirect 
  $location.path("/myevents/")

}
$scope.addUser = function(groupid) {  //adds the user needs to be added somewhere else too

  console.log(groupid);

    $scope.usertmp = $scope.userid; // this holds the current user id onto a variable that we will send
    console.log($scope.usertmp);

  // Update DB list with new deliverer_id
  Groups.addUser(groupid,$scope.usertmp)  //this calls the method addUser with these params
    .then(function () {
      //console.log("added user")
      Groups.getGroups($scope.userid)
      .then(function (groups) {
        $scope.data.groups = groups;
      })
      .catch(function (error) {
        console.error(error);
      });
    })
    .catch(function (error) {
      console.log(error); 
    });
}
$scope.removeUser = function(groupid,idx) {  //adds the user needs to be added somewhere else too

  console.log(groupid);

    $scope.usertmp = $scope.userid; // this holds the current user id onto a variable that we will send
    console.log($scope.usertmp);

  // Update DB list with new deliverer_id
  Groups.removeUser(groupid,$scope.usertmp)  //this calls the method addUser with these params
  .then(function () {
    $scope.data.groups.splice(idx, 1)
  })
    .catch(function (error) {
      console.log(error); 
    });
}


  $scope.displayDetail = function(groupid) {
    // simple redirect 
    $location.path("/groupdetail/" + groupid)
  }

  //add new group method, will be attached into createnewgroup.html
  $scope.addGroup = function () {
    console.log("here?");

    $scope.group.creator_id = $scope.userid; //this is how you associate the creator of the db

    // Defaulting deliverer_id to empty string
  

    //If user choose the default address, assign the default address to the group to be added
    console.log("YEET");
    
    Groups.newGroup($scope.group)
      .then(function () {
        $location.path('/mygroups'); //go to mygroups was successfull
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  $scope.deleteGroup = function(groupid, idx) {
    Groups.deleteGroup(groupid)
      .then(function () {
        $scope.data.groups.splice(idx, 1)
      })
  }
 
})


// Date Picker ui-bootstrap controller





