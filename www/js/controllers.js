angular.module('starter.controllers', [])

.controller('DiaryCtrl', function($scope) {
  $scope.userProfile = function() {

  };
  $scope.preference = {
    'price': 10,
    'proximity': 3
  };
})

.controller('ActivityCtrl', function($scope) {


  $scope.changeItem = function(item) {
    console.log("Selected Serverside, text:", item.text, "value:", item.value);
  };

  $scope.goalList = [{
    text: "Lose 0.2 Kilograms per week!",
    value: "bb"
  }, {
    text: "Lose 0.5 Kilograms per week",
    value: "ng"
  }, {
    text: "Lose 0.8 Kilograms per week",
    value: "em"
  }, {
    text: "Lose 1 Kilograms per week",
    value: "ko"
  }];



})


.controller('ProfileCtrl', function($scope, Camera) {
  $scope.settings = {
    enableFriends: true
  };
  var options = {
    quality: 75,
    targetWidth: 320,
    targetHeight: 320,
    saveToPhotoAlbum: false
  };

  $scope.getPhoto = function() {
    Camera.getPicture(options).then(function(imageURI) {
      $scope.barcode = {
        scanned: true,
        lastPhoto: imageURI
      };
    }, function(err) {
      console.err(err);
    });
  };

  $scope.activityList = [{
    header: "Sedentary",
    text: "Spend most of the day sitting down",
    value: "bb"
  }, {
    header: "Lightly Active",
    text: "Spend a good part of the day of the day on your feet",
    value: "ng"
  }, {
    header: "Moderately Active",
    text: "Spend a good part of the day doing moderate physical activity",
    value: "em"
  }, {
    header: "Very Active",
    text: "Spend most of the day doing heavy physical activity",
    value: "ko"
  }];
})

.controller('AddFoodCtrl', function($scope, FoodAndStores) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.searchText = {
    results: []
  };
  $scope.stores = FoodAndStores.stores();
  $scope.foods = FoodAndStores.foods();
  $scope.store_name = function(storeId) {
    return FoodAndStores.get_store(storeId).name;
  };


  var doSearch = function() {
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

  $scope.search = function() {
    if ($scope.searchText.query.length > 2) {
      doSearch($scope.searchText.query);
    }
  };

  /*$scope.remove = function(chat) {
      Chats.remove(chat);
  };*/
})

.controller('FoodDetailCtrl', function($scope, $stateParams, FoodAndStores) {
  $scope.food = FoodAndStores.get_food($stateParams.foodId);
})



.controller('FindFoodCtrl', function($scope, FoodAndStores, uiGmapGoogleMapApi) {
  $scope.stores = FoodAndStores.stores();
  $scope.map = {
    center: {
      latitude: 45,
      longitude: -73
    },
    zoom: 8
  };
  uiGmapGoogleMapApi.then(function(maps) {

  });

})

;
