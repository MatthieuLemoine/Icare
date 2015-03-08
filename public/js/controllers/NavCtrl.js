myApp.controller('NavCtrl', ['$scope','$http', function ($scope,$http) {
	$scope.nombreUsers=0;
	$scope.nombreBornes=0;
	$http.get('/nombreUsers')
		.success(function (data, status, headers, config) {
			$scope.nombreUsers=data;
		})
		.error(function (data, status, headers, config) {
		});
	$http.get('/nombreBornes')
		.success(function (data, status, headers, config) {
			$scope.nombreBornes=data;
		})
		.error(function (data, status, headers, config) {
		});
}]);