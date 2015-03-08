myApp.controller('AdminCtrl', ['$rootScope','$scope','$http','$window', function ($rootScope,$scope,$http,$window ) {
	$rootScope.isShownProgressBar=false;
	$rootScope.isShownFacebook=false;
	$scope.connexion = function(user) {
		if(user.username!=null && user.username!="" && user.password!=null && user.password!=""){
			$http.post('/admin',user)
				.success(function (data, status, headers, config) {
					$window.location.href='admin/board';
				})
				.error(function (data, status, headers, config) {
				});
		}
	};
}]);