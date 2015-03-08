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

}]);;myApp.controller('AdminCtrl', ['$rootScope','$scope','$http','$window', function ($rootScope,$scope,$http,$window ) {
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
}]);;myApp.controller('InfoCtrl', ['$scope', function ($scope) {

}]);;myApp.controller('LoginCtrl', ['$rootScope','$scope','$http','$window', function ($rootScope,$scope,$http,$window ) {
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
}]);;myApp.controller('MainCtrl', ['$rootScope','$scope','$http','uiGmapGoogleMapApi', function ($rootScope,$scope,$http,uiGmapGoogleMapApi ) {


}]);;myApp.controller('MapCtrl', ['$http', '$scope', function ($http,$scope) {
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
}]);;myApp.controller('MarkerCtrl', ['$scope','$http','$routeParams', function ($scope,$http,$routeParams) {
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
}]);;myApp.controller('NavCtrl', ['$scope','$http', function ($scope,$http) {
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
}]);;myApp.controller('SignupCtrl', ['$rootScope','$scope','$http','$window', function ($rootScope,$scope,$http,$window ) {
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
}]);;myApp.controller('UsersCtrl', ['$rootScope','$scope','$http','$window', function ($rootScope,$scope,$http,$window ) {
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