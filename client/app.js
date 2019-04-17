// create the crowdcart app
angular.module("crowdcart", [
    "crowdcart.auth",
    "crowdcart.events",
    "crowdcart.groups",
    "crowdcart.services",
    "ngRoute",
    "ui.bootstrap",
    "angularMoment"
  ])
  
  //config/routing
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/signin', {
        templateUrl: 'auth/signin.html',
        controller: 'AuthController'
      })
      .when('/signup', {
        templateUrl: 'auth/signup.html',
        controller: 'AuthController'
      })
      .when('/logout', {
        templateUrl: 'auth/signin.html',
        controller: 'AuthController'
      })
      .when('/mygroups', {
        templateUrl: 'groups/mygroups.html',
        controller: 'GroupsController',
        authenticate: true
      })
       .when('/createnewgroup', {
        templateUrl: 'groups/createnewgroup.html',
        controller: 'GroupsController',
        authenticate: true
      })
      .when('/allgroups', {
        templateUrl: 'groups/allgroups.html',
        controller: 'GroupsController',
        authenticate: true
      })
      .when('/viewgroups', {
        templateUrl: 'groups/viewgroups.html',
        controller: 'GroupsController',
        authenticate: true
      })
      
      .when('/groupdetail/:groupid', {
        templateUrl: 'groups/groupdetail.html',
        controller: 'GroupsController'
        // // authentication removed to be sharable link
        // authenticate: true
      })
      // .when('/findjobs', {
      //   templateUrl: 'jobs/findjobs.html',
      //   //controller: '',
      //   authenticate: true
      // })
      .when('/myevents', {
        templateUrl: 'events/myevents.html',
        controller: 'EventsController',
        authenticate: true
      })
       .when('/createnewevent', {
        templateUrl: 'events/createnewevent.html',
        controller: 'EventsController',
        authenticate: true
      })
     
      
      .when('/eventdetail/:eventid', {
        templateUrl: 'events/eventdetail.html',
        controller: 'EventsController'
      
      })
      .when('/search', {
        templateUrl: 'groups/search.html',
        controller: 'GroupsController',
        authenticate: true
      })

      .otherwise({
        redirectTo: "/mygroups"
      });
  
      $httpProvider.interceptors.push('AttachTokens');
  
  })
  
  // main app controller, not inside a ng-view, hanldes signout
  .controller('AppController', function ($scope, Auth, $rootScope) {
    $rootScope.hasSession = Auth.isAuthenticated();
    $scope.signout = function(){
      Auth.signout();
    }
  })
  
  .factory('AttachTokens', function ($window) {
    // this is an $httpInterceptor
    // its job is to stop all out going request
    // then look in local storage and find the user's token
    // then add it to the header so the server can validate the request
    var attach = {
      request: function (object) {
        var jwt = $window.localStorage.getItem('crowdcarttoken');
        if (jwt) {
          object.headers['x-access-token'] = jwt;
        }
        object.headers['Allow-Control-Allow-Origin'] = '*';
        return object;
      }
    };
    return attach;
  })
  
  // run directive
  .run(function($rootScope, $location, Auth){
    $rootScope.$on('$routeChangeStart', function(event, next, current){
      // console.log("NEXT: ", next);
      if (next.$$route && next.$$route.authenticate && !Auth.isAuthenticated()) {
        $location.path('/signin');
       
      }
      $rootScope.hasSession = Auth.isAuthenticated();
    });
  });
  