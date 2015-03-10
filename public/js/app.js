var myApp = angular.module('myApp',['ngRoute','uiGmapgoogle-maps','validation.match']);
/*
* Config
 */
myApp.config(['$routeProvider','uiGmapGoogleMapApiProvider', function ($routeProvider,uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
  /**
   * $routeProvider
   */
  $routeProvider
  .when('/home', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  })
  .when('/bornes', {
    templateUrl: 'views/bornes.html',
    controller: 'BornesCtrl'
  })
  .when('/info',{
    templateUrl: 'views/info.html',
    controller: 'InfoCtrl'
  })
  .when('/users',{
    templateUrl: 'views/users.html',
    controller: 'UsersCtrl'
  })
  .when('/login',{
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl'
  })
  .when('/signup',{
    templateUrl: 'views/signup.html',
    controller: 'SignupCtrl'
  })
  .when('/marker/:markerId',{
    templateUrl: 'views/marker.html',
    controller: 'MarkerCtrl'
  })
  .otherwise({
    redirectTo: '/home'
  });

}]);