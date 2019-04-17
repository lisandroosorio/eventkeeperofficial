angular.module("crowdcart.groups", ["angularMoment"])

.controller("GroupsController", function ($scope, Groups, $window, $location, $rootScope, $timeout,$routeParams, $interval) {

  // storage objs
  $scope.data = {};
  $scope.group = {};
  $scope.group.location_address = {};
  $scope.fav = {};
  $scope.usertmp = {};
  $scope.tmpdata = {};
  $scope.events = {};
  $scope.eventFilter;
 $scope.tmpHolder=[];


  // store userid/gorupid into local storage (same level as auth token)
  $scope.userid = $window.localStorage.getItem('crowdcartuser');
  $scope.street = $window.localStorage.getItem('crowdcartuserstreet');
  $scope.state = $window.localStorage.getItem('crowdcartuserstate');
  $scope.city = $window.localStorage.getItem('crowdcartusercity');
  $scope.zip = $window.localStorage.getItem('crowdcartuserzip');
  

  
  if ($routeParams.groupid) { //this is what sends the group type to the user, tis is what displays the groups
    $scope.currentgroup = $routeParams.groupid;
    $scope.currentname = $routeParams.name;

    $window.localStorage.setItem('currentEvent', $scope.currentgroup);   
    $window.localStorage.setItem('currentNameEvent',$scope.currentname);
    


    Groups.getOneGroup($routeParams.groupid)
      .then(function (group) {
        $scope.displayGroup = group
      })
    
  }

  Groups.getGroups($scope.userid) //gets all the Groups right away for the user
  .then(function (groups) {
    $scope.data.groups = groups;

    $scope.data.groups.forEach(function(value,i)
    {
     
      Groups.getEvents($scope.data.groups[i]._id)
      .then(function (event) {
        $scope.events[i] = event;
   
     
      })

    });
  
  })
  .catch(function (error) {
    console.error(error);
  });

  Groups.getAllGroups()
      .then(function(allGroups){
        $scope.data.bGroups = allGroups; ///data binded to scope.data.Groups which means this then shows it al if you want it
          //Only showing the Group that has not deliverer, and those that do not belong to user, and not overdue
         
      })
      .catch(function(error){
        console.error(error);
      });


  Groups.getOwnedGroups($scope.userid) //gets all the Groups right away for the user
  .then(function (groups) {
    $scope.data.ownedGroups = groups;

  
  })
  .catch(function (error) {
    console.error(error);
  });
  Groups.getFavGroups($scope.userid) //gets all the favorite Groups right away for the user
  .then(function (groups) {
    $scope.data.favGroups = groups;
 
    $scope.data.favGroups.forEach(function(value,i)
    {
      
      Groups.getEvents($scope.data.favGroups[i]._id)
      .then(function (event) {
        $scope.tmpdata[i] = event;
       
      })

    });
  
  
  })
  .catch(function (error) {
    console.error(error);
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

$scope.init = function(groupid){

  $scope.getEvents(groupid);
  

}
  $scope.showEvent = function(id){
  Groups.getEvents(id)
      .then(function(events){
        $scope.tmpHolder = events; ///data binded to scope.data.Groups which means this then shows it al if you want it
          //Only showing the Group that has not deliverer, and those that do not belong to user, and not overdue
         
      })
      .catch(function(error){
        console.error(error);
      });

}
$scope.getEvents = function(groupid){

//knows our current group id from array [0] is gonna keep incrementing we want to return all events
var mydata = Groups.getEvents(groupid);
 mydata.then(function (result) {
  $scope.tmpdata= result;
 console.log(result);
});
 //gets all the groups right away for the user
  
  
}
$scope.deleteEvent = function(eventid, idx) {
  Events.deleteEvent(eventid)
    .then(function () {
      $scope.data.events.splice(idx, 1)
    })
}

$scope.getArray=function(index)
{
  
  return $scope.tmpdata[index];
}

$scope.enter = function(groupid) {
  // simple redirect 
  $location.path("/myevents/")

}
  $scope.filterFn = function(event)
{
    var today = new Date();
    var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
    console.log(date);
    if(event.date >= date)
    {
        return true; // this will be listed in the results
    }

    return false; // otherwise it won't be within the results
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
$scope.favUser = function(groupid) {  //adds the user needs to be added somewhere else too

  console.log(groupid);

    $scope.usertmp = $scope.userid; // this holds the current user id onto a variable that we will send
    console.log($scope.usertmp);

  // Update DB list with new deliverer_id
  Groups.favUser(groupid,$scope.usertmp)  //this calls the method addUser with these params
    .then(function () {
      //console.log("added user")
      Groups.getGroups($scope.userid)
      .then(function (groups) {
        $scope.data.favGroups = groups;
      })
      .catch(function (error) {
        console.error(error);
      });
    })
    .catch(function (error) {
      console.log(error); 
    });
}
$scope.removeFavUser = function(groupid,idx) {  //adds the user needs to be added somewhere else too

  console.log(groupid);

    $scope.usertmp = $scope.userid; // this holds the current user id onto a variable that we will send
    console.log($scope.usertmp);

  // Update DB list with new deliverer_id
  Groups.removeFavUser(groupid,$scope.usertmp)  //this calls the method addUser with these params
  .then(function () {
    $scope.data.favGroups.splice(idx, 1)
  })
    .catch(function (error) {
      console.log(error); 
    });
}
$scope.favEvent = function(groupid) {  //adds the user needs to be added somewhere else too

  console.log(groupid);

    $scope.usertmp = $scope.userid; // this holds the current user id onto a variable that we will send
    console.log($scope.usertmp);

  // Update DB list with new deliverer_id
  Groups.favEvent(groupid,$scope.usertmp)  //this calls the method addUser with these params
    .then(function () {
      //console.log("added user")
      Groups.getGroups($scope.userid)
      .then(function (events) {
        $scope.data.favEvent = events;
      })
      .catch(function (error) {
        console.error(error);
      });
    })
    .catch(function (error) {
      console.log(error); 
    });
}
$scope.removeFavUserEvent = function(groupid,idx) {  //adds the user needs to be added somewhere else too

  console.log(groupid);

    $scope.usertmp = $scope.userid; // this holds the current user id onto a variable that we will send
    console.log($scope.usertmp);

  // Update DB list with new deliverer_id
  Groups.removeFavUserEvent(groupid,$scope.usertmp)  //this calls the method addUser with these params
  .then(function () {
    $scope.data.favEvent.splice(idx, 1)
  })
    .catch(function (error) {
      console.log(error); 
    });
}
$scope.updateGroup = function(group,idx) {
    // simple redirect 
    Groups.updateGroup(group)
    .then(function(returngroup){

      $scope.data.ownedGroups[idx] = returngroup.data;
   
    })
    .catch(function(error){
      console.log(error);
    });

    document.getElementById("closeit"+idx).click();
  }
  $scope.displayDetail = function(groupid) {
    // simple redirect 
    $location.path("/groupdetail/" + groupid)
  }

  $scope.oneAtATime = true;

  $scope.groups = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];

  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };

  $scope.status = {
    isCustomHeaderOpen: false,
    isFirstOpen: true,
    isFirstDisabled: false
  };
$scope.parse=function(name)
{
  return name.street + " "+name.city+" "+name.state;
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
        $scope.data.ownedGroups.splice(idx, 1)
      })
  }

  $scope.selectEvent = function(groupid){
    $scope.eventFilter[0] = groupid;
  }
  
 
})

// Accordian Controller
  angular.module('ui.bootstrap').controller('AccordionDemoCtrl', function ($scope) {
    $scope.oneAtATime = true;

    $scope.status = {
      isCustomHeaderOpen: false,
      isFirstOpen: true,
      isFirstDisabled: false
    };
  });
// Date Picker ui-bootstrap controller




//pre load all events after loading in the event by doing some sort of function 


