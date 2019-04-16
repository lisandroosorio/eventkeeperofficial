angular.module('crowdcart.auth', [])// make an auth module

.controller('AuthController', function ($scope, $window, $location, Auth) {

  // $scope.user = {};
  // $scope.user.address = {};
  // $scope.user.name = {};
 $scope.tempemail;
 
  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (data) {
        console.log(data.address.street);
        //Save token, user_id and address to local storage
        $window.localStorage.setItem('crowdcarttoken', data.token);
        //this is the token that is used by the user 
        $window.localStorage.setItem('crowdcartuser', data.userid);
        $window.localStorage.setItem('crowdcartuserstreet', data.address.street);
        $window.localStorage.setItem('crowdcartusercity', data.address.city);
        $window.localStorage.setItem('crowdcartuserstate', data.address.state);
        $window.localStorage.setItem('crowdcartuserzip', data.address.zip_code);
        document.getElementById("closeit").click();
        $location.path('/mygroups');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (data) {
        $window.localStorage.setItem('crowdcarttoken', data.token);
        // saving username to localstorage
        $window.localStorage.setItem('crowdcartuser', data.userid);
        document.getElementById("closeit2").click();
        $location.path('/mygroups');
     
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});

// make and auth controller
// signin - delegate to services to call server
// signup - delegate to services to call server