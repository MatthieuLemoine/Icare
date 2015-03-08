myApp.controller('LoginCtrl', ['$rootScope','$scope','$http','$window', function ($rootScope,$scope,$http,$window ) {
	$scope.showErreurLogin=false;
	$scope.connexion = function(user) {
		if(user.username!=null && user.username!="" && user.password!=null && user.password!=""){
			$http.post('/login',user)
				.success(function (data, status, headers, config) {
					$scope.showErreurLogin=false;
					$window.location.href='/#/users';
				})
				.error(function (data, status, headers, config) {
					console.log("Erreur login");
					$scope.showErreurLogin=true;
				});
		}
	};
}]);