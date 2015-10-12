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

    $scope.stores = FoodAndStores.stores();
    $scope.foods = FoodAndStores.foods();
    $scope.store_name = function (storeId) {
        return FoodAndStores.get_store(storeId).name;
    };
    
    var doSearch = function (query) {
        $scope.results = FoodAndStores.search(query);
    };
    $scope.query = "";
    $scope.search = function () {
        if ($scope.query.length > 3) {
            doSearch($scope.query);
        }
    };
    $scope.results = [];
    /*$scope.remove = function(chat) {
        Chats.remove(chat);
    };*/
})

.controller('FoodDetailCtrl', function ($scope, $stateParams, FoodAndStores) {
    $scope.food = FoodAndStores.get_food($stateParams.foodId);
})

.controller('FindFoodCtrl', function ($scope, FoodAndStores) {
    $scope.stores = FoodAndStores.stores();
    $scope.settings = {
        enableFriends: true
    };
});
