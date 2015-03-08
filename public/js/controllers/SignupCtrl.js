myApp.controller('SignupCtrl', ['$rootScope','$scope','$http','$window', function ($rootScope,$scope,$http,$window ) {
	$scope.user='';
	$scope.confirmPassword='';
	$scope.rejoindre = function(user) {
		if(user.username!=null && user.username!="" && user.password!=null && user.password!="" && user.nom!=null && user.nom!="" && user.prenom!=null && user.prenom!=""&& $scope.confirmPassword!=null && $scope.confirmPassword!="" && user.password==$scope.confirmPassword){
			$http.post('/signup',user)
				.success(function (data, status, headers, config) {
					$window.location.href='#/users';
				})
				.error(function (data, status, headers, config) {
				});
		}
	};
}]);