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

.controller('AddFoodCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

    $scope.chats = Chats.all();
    /*
    var doSearch = ionic.debounce(function (query) {
        Flickr.search(query).then(function (resp) {
            $scope.photos = resp;
        });
    }, 500);
    */
    $scope.search = function () {
        //doSearch($scope.query);
    };

    $scope.remove = function(chat) {
        Chats.remove(chat);
    };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FindFoodCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
