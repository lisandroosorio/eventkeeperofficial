angular.module("crowdcart.lists", ["angularMoment"])

.controller("ListsController", function ($scope, Lists, $window, $location, $rootScope, $routeParams, $interval) {

  // storage objs
  $scope.data = {};
  $scope.list = {};
  $scope.list.delivery_address = {};
  $scope.list.items = [];

  console.log('HELLLLO1!');


  // store userid into local storage (same level as auth token)
  $scope.userid = $window.localStorage.getItem('crowdcartuser');
  $scope.street = $window.localStorage.getItem('crowdcartuserstreet');
  $scope.state = $window.localStorage.getItem('crowdcartuserstate');
  $scope.city = $window.localStorage.getItem('crowdcartusercity');
  $scope.zip = $window.localStorage.getItem('crowdcartuserzip');


  console.log("we are currently with user "+ $scope.userid);

  Lists.getLists($scope.userid) //gets all the lists right away for the user
  .then(function (lists) {
    $scope.data.lists = lists;
  })
  .catch(function (error) {
    console.error(error);
  });


      
   var initialize = function () {
     console.log('userId: ',$scope.userid);
     console.log($rootScope);
     console.log('user', $scope.city);

    // is routePararms exists it means directed here via URL
    if ($routeParams.listid) {
      Lists.getOneList($routeParams.listid)
        .then(function (list) {
          $scope.displayList = list
        })
    }

    //Get all lists belong to user
    Lists.getLists($scope.userid)
      .then(function (lists) {
        $scope.data.lists = lists;
      })
      .catch(function (error) {
        console.error(error);
      });

      Lists.getAllLists()
      .then(function(allLists){
        $scope.data.allLists = allLists;
          //Only showing the list that has not deliverer, and those that do not belong to user, and not overdue
         
      })
      .catch(function(error){
        console.error(error);
      });
    


  };
$scope.showallZ = function(){
  Lists.getAllLists()
      .then(function(allLists){
        $scope.data.lists = allLists; ///data binded to scope.data.lists which means this then shows it al if you want it
          //Only showing the list that has not deliverer, and those that do not belong to user, and not overdue
         
      })
      .catch(function(error){
        console.error(error);
      });

}
  $scope.displayDetail = function(listid) {
    // simple redirect 
    $location.path("/listdetail/" + listid)
  }

  //add new list method, will be attached into createnewlist.html
  $scope.addList = function () {
    console.log("here?");

    $scope.list.creator_id = $scope.userid; //this is how you associate the creator of the db

    // Defaulting deliverer_id to empty string
  

    //If user choose the default address, assign the default address to the list to be added
    console.log("YEET");
    
    Lists.newList($scope.list)
      .then(function () {
        $location.path('/mylists'); //go to mylists was successfull
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  $scope.deleteList = function(listid, idx) {
    Lists.deleteList(listid)
      .then(function () {
        $scope.data.lists.splice(idx, 1)
      })
  }
 
})


// Date Picker ui-bootstrap controller





