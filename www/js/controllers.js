angular.module('starter.controllers', [])

.controller('DiaryCtrl', function ($scope) {
    $scope.userProfile = function () {

    };
})

.controller('RecommendationCtrl', function ($scope) {
    $scope.preference = {
        'price': 10,
        'proximity': 3
    };
})

.controller('ProfileCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
})

.controller('AddFoodCtrl', function ($scope, FoodAndStores) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $scope.searchText = {results:[]};
    $scope.stores = FoodAndStores.stores();
    $scope.foods = FoodAndStores.foods();
    $scope.store_name = function (storeId) {
        return FoodAndStores.get_store(storeId).name;
    };
    

    var doSearch = function () {
        var result = [];
        var foods = $scope.foods;
        for (var i = 0; i < foods.length; i++) {
            var food_name = foods[i].name.toLowerCase();
            var query = $scope.searchText.query.toLowerCase();
            if (food_name.indexOf(query) > -1) {
                result.push(foods[i]);
            }
        }
        $scope.searchText.results = result;
    };

    $scope.search = function () {
        if ($scope.searchText.query.length > 2) {
            doSearch($scope.searchText.query);
        }
    };
    
    /*$scope.remove = function(chat) {
        Chats.remove(chat);
    };*/
})

.controller('FoodDetailCtrl', function ($scope, $stateParams, FoodAndStores) {
    $scope.food = FoodAndStores.get_food($stateParams.foodId);
})

.controller('FindFoodCtrl', function ($scope, FoodAndStores, uiGmapGoogleMapApi) {
    $scope.stores = FoodAndStores.stores();
    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    uiGmapGoogleMapApi.then(function (maps) {

    });
    /*
    function initialize() {
        var myLatlng = new google.maps.LatLng(43.07493, -89.381388);

        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);

        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
            content: compiled[0]
        });

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Uluru (Ayers Rock)'
        });

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });

        $scope.map = map;
    }
    google.maps.event.addDomListener(window, 'load', initialize);

    $scope.centerOnMe = function () {
        if (!$scope.map) {
            return;
        }

        $scope.loading = $ionicLoading.show({
            content: 'Getting current location...',
            showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function (pos) {
            $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            $scope.loading.hide();
        }, function (error) {
            alert('Unable to get location: ' + error.message);
        });
    };

    $scope.clickTest = function () {
        alert('Example of infowindow with ng-click')
    };
    
    */

})

;
