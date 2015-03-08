myApp.controller('MapCtrl', ['$http', '$scope', function ($http,$scope) {
	$scope.centreMap = {
		id : "centre",
		coords : {
			latitude : 46.71109,
			longitude : 1.7191036
		}
	};
	$scope.bornes=[];
	$scope.map = {
		center: {
			latitude: $scope.centreMap.coords.latitude,
			longitude: $scope.centreMap.coords.longitude
		},
		zoom: 5,
		markers: [],
		control: {},
		options: {
			scrollwheel: true
		}
	};
	var createMarker = function (i, marker) {
		idKey = "id";
		var ret = {
			_id : marker._id,
			latitude: marker.latitude,
			longitude: marker.longitude,
			prenom : marker.prenom,
			nom : marker.nom,
			nombreBornes : marker.nombreBornes,
			adresse : marker.adresse,
			show: false
		};
		ret.onClick = function() {
			ret.show = !ret.show;
			$scope.selected = ret;
		};
		ret[idKey] = i;
		return ret;
	};
	var refresh = function(){
		$http.get('/markers')
			.success(function (data, status, headers, config) {
				data.forEach(function(marker,i){
					var newMarker=createMarker(i,marker);
					$scope.bornes.push(newMarker);
				})
			})
			.error(function (data, status, headers, config) {
			});
	};
	setTimeout(refresh, 100);
}]);