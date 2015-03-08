myApp.controller('UsersCtrl', ['$rootScope','$scope','$http','$window', function ($rootScope,$scope,$http,$window ) {
	// Accessible sans connexion !!!
	$scope.informations='';
	$scope.isAuthenticated=false;
	$scope.markers='';
	$rootScope.isAuthenticated=false;
	$rootScope.prenom='';
	$scope.showFormulaireNouvelleBorne=false;
	$scope.showFormulaireModifierBorne=false;
	$scope.showSuccessAjouterBorne=false;
	$scope.showSuccessModifierBorne=false;
	$scope.showSuccessSupprimerBorne=false;
	$scope.showFailVerifierAdresse=false;
	$scope.showSuccessVerifierAdresse=false;
	$scope.showAjouterBouton=false;
	$scope.showErreurNombreBornes=false;
	$scope.markerAdresse={};
	$scope.centreMap = {
		id : "centre",
		coords : {
			latitude : 46.71109,
			longitude : 1.7191036
		}
	};
	$scope.nombreBornes=1;
	$scope.adresse="";
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
	var reload = function(){
		$scope.bornes=[];
		$http.get('/myInfo')
			.success(function (data, status, headers, config) {
				if(data!=null && data!='' && data.username!=null && data.username!=null){
					$scope.informations=data;
					$rootScope.prenom=data.prenom;
					$rootScope.isAuthenticated=true;
					$scope.isAuthenticated=true;
				}
				else{
					$scope.isAuthenticated=false;
				}

			})
			.error(function (data, status, headers, config) {
				$scope.isAuthenticated=false;
			});
		$http.get('/myMarkers')
			.success(function (data, status, headers, config) {
				if(Array.isArray(data)){
					data.forEach(function(marker,i){
						var newMarker=createMarker(i,marker);
						$scope.bornes.push(newMarker);
					});
				}
			})
			.error(function (data, status, headers, config) {
				$scope.isAuthenticated=false;
			});
	}
	$scope.ajouterBorne=function(newMarker){
		console.log("ajouterBorne");
		if($scope.nombreBornes<1 || $scope.nombreBornes=="" || $scope.nombreBornes==null){
			$scope.showErreurNombreBornes=true;
		}
		else{
			$scope.showErreurNombreBornes=false;
			$scope.markerAdresse.nombreBornes=$scope.nombreBornes;
			$http.post('/ajouterBorne',$scope.markerAdresse)
				.success(function (data, status, headers, config) {
					$scope.showFormulaireNouvelleBorne=false;
					$scope.showSuccessAjouterBorne=true;
					$scope.showAjouterBouton=false;
					$scope.nombreBornes=1;
					$scope.markerAdresse={};
					reload();
				})
				.error(function (data, status, headers, config) {
				});
		}
	};
	$scope.supprimerBorne=function(marker){
		console.log("marker "+marker);
		$http.post('/supprimerMarker',marker)
			.success(function (data, status, headers, config) {
				$scope.showSuccessSupprimerBorne=true;
				reload();
			})
			.error(function (data, status, headers, config) {
			});
	};
	$scope.modifierBorne=function(marker){
		$http.put('/modifierMarker',marker)
			.success(function (data, status, headers, config) {
				$scope.showFormulaireModifierBorne=false;
				$scope.showSuccessModifierBorne=true;
				reload();
			})
			.error(function (data, status, headers, config) {
			});
	};
	$scope.verifierAdresse=function(){
		var adresse = $scope.adresse;
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({'address' : adresse}, function (results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				$scope.showFailVerifierAdresse=false;
				$scope.showSuccessVerifierAdresse=true;
				var firstAddress = results[0];
				var latitude = firstAddress.geometry.location.lat();
				var longitude = firstAddress.geometry.location.lng();
				$scope.markerAdresse.latitude=latitude;
				$scope.markerAdresse.longitude=longitude;
				$scope.markerAdresse.nombreBornes=1;
				$scope.markerAdresse.adresse=$scope.adresse;
				$scope.bornes.push(createMarker($scope.bornes.length,$scope.markerAdresse));
				$scope.showAjouterBouton=true;
				$scope.$apply();
			} 
			else {
				$scope.markerAdresse={};
				$scope.showAjouterBouton=false;
				$scope.showSuccessVerifierAdresse=false;
				$scope.showFailVerifierAdresse=true;
				$scope.$apply();
			}
		});
	};
	setTimeout(reload, 100);
}]);