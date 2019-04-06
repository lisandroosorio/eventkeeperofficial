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

    


  };
$scope.showall = function(){
  console.log("testing we got to showall function call ");
  Lists.getAllList()
      .then(function(allLists){
        $scope.data.allLists = allLists;
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


  //Add a job, update the deliverer id to user's id
  $scope.addJob = function(list) {

    // Prefix 786 for all new jobs
    // Note: Prior to this method.. deliverer_id = userid
    // causing issues where every list was being displayed
    // in My Jobs
    list.deliverer_id = '786' + $scope.userid;

    // Update DB list with new deliverer_id
    Lists.updateList(list)
      .then(function () {
        console.log("add job", list)
        $location.path('/myjobs');
      })
      .catch(function (error) {
        console.log(error);
      });
  }


 
})


// Date Picker ui-bootstrap controller
.controller('DatepickerPopupDemoCtrl', function ($scope) {
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.toggleMin = function() {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }
});



