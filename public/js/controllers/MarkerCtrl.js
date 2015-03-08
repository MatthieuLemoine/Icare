myApp.controller('MarkerCtrl', ['$scope','$http','$routeParams', function ($scope,$http,$routeParams) {
	$scope.marker = {"id" : $routeParams.markerId};
	$scope.isAuthenticated=false;
	var load = function(){
		$http.get('/marker/'+$routeParams.markerId)
			.success(function (data, status, headers, config) {
				if(data.latitude!=null && data.latitude!=''){
					$scope.marker=data;
					$scope.isAuthenticated=true;
				}
			})
			.error(function (data, status, headers, config) {
				$scope.isAuthenticated=false;
			});
	}
	setTimeout(load, 100);
}]);