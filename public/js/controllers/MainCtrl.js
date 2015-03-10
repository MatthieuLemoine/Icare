myApp.controller('MainCtrl', ['$rootScope','$scope','$http','$timeout', function ($rootScope,$scope,$http,$timeout ) {
	$scope.animation_un=false;
	$scope.animation_deux=false;
	$scope.animation_trois=false;
	$scope.animation_quatre=false;
	$scope.animation_cinq=false;
	$scope.animation_six=false;
	$scope.animation_sept=false;
	$scope.animation_huit=false;
	$scope.animation_neuf=false;
	$scope.animation_un_animated=false;
	$scope.animation_deux_animated=false;
	$scope.animation_trois_animated=false;
	$scope.animation_quatre_animated=false;
	$scope.animation_cinq_animated=false;
	$scope.animation_six_animated=false;
	$scope.animation_sept_animated=false;
	$scope.animation_huit_animated=false;
	$scope.animation_neuf_animated=false;
	$scope.animation_un_end=false;
	$scope.animation_deux_end=false;
	$scope.animation_trois_end=false;
	$scope.animation_quatre_end=false;
	$scope.animation_cinq_end=false;
	$scope.animation_six_end=false;
	$scope.animation_sept_end=false;
	$scope.animation_huit_end=false;
	$scope.animation_neuf_end=false;
	$scope.showPlay=true;
	$scope.animate=function(){
		console.log("Animate !!");
		$scope.showPlay=false;
		$scope.animation_un=true;
		$scope.animation_un_animated=true;
		$timeout(function(){
			console.log("Fist timeout");
			$scope.animation_un_end=true;
			$scope.animation_deux=true;
			$scope.animation_deux_animated=true;
			$timeout(function(){
				console.log("Second timeout");
				$sope.animation_deux_end=true;
				$scope.animation_trois=true;
				$scope.animation_trois_animated=true;
			},4000);
		},4000);
	}
}]);