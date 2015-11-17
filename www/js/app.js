// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic.service.core', 'uiGmapgoogle-maps', 'starter.controllers', 'starter.services', 'nvd3', 'ionic.contrib.ui.cards', 'firebase', 'timer'])

.run(function($ionicPlatform, $rootScope, userdata) {
  $ionicPlatform.ready(function() {


    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
      StatusBar.hide();
    }

    $rootScope.timerRunning = true;
    $rootScope.userdata = userdata;
    $rootScope.startTimer = function() {
      $rootScope.$broadcast('timer-start');
      $rootScope.timerRunning = true;
    };

    $rootScope.stopTimer = function() {
      $rootScope.$broadcast('timer-stop');
      $rootScope.timerRunning = false;
    };

    $rootScope.resumeTimer = function() {
      $rootScope.$broadcast('timer-resume');
      $rootScope.timerRunning = true;
    };


    $rootScope.$on('timer-stopped', function(event, data) {
      var allArray = $rootScope.userdata.all

      var currentUser = allArray.$getRecord($rootScope.user_id);
      if ($rootScope.task) {
        if ($rootScope.task == 1) {
          currentUser.task1 = data
        } else if ($rootScope.task == 2) {
          currentUser.task2 = data
        } else {
          currentUser.task3 = data
        }
      }
      allArray.$save(currentUser);
    });
  });
})

.factory("userdata", function($firebaseArray, $q) {
  var dataref = new Firebase("https://foodwithbenefits.firebaseio.com/userdata");
  var userdataArr = $firebaseArray(dataref);
  return {
    get: function(i) {
      // console.log(i);
      return userdataArr.$getRecord(userdataArr.$keyAt(i - 1));
    },
    all: userdataArr,
    findOrCreateUser: function(name) {
      var deferred = $q.defer();
      var foundUser = null;
      var maxId = 0;
      userdataArr.$loaded(function(arr) {
        arr.forEach(function(user) {
          if (user.name == name) {
            foundUser = user;
          }
          // if(name == undefined){
          //   deferred.resolve('blank');
          // }
          if (user.id > maxId)
            maxId = user.id;
        });
        if (foundUser) {
          deferred.resolve(foundUser);
        } else {
          // console.log(foundUser);
          // console.log("Creating new user", name);
          // var newUser = {
          //   id: maxId + 1,
          //   name: name,
          //   version: 'a'
          // };
          // userdataArr.$add(newUser).then(function(dataref) {
          //   deferred.resolve(userdataArr.$getRecord(dataref.key()));
          // });
          deferred.resolve(null);
        }
      });
      return deferred.promise;

    }
  }
})

.filter('inSlicesOf', ['$rootScope',
  function($rootScope) {
    makeSlices = function(stores, count) {
      if (!count)
        count = 3;

      if (!angular.isArray(stores) && !angular.isString(stores)) return stores;

      var array = [];
      for (var i = 0; i < stores.length; i++) {
        var chunkIndex = parseInt(i / count, 10);
        var isFirst = (i % count === 0);
        if (isFirst)
          array[chunkIndex] = [];
        array[chunkIndex].push(stores[i]);
      }
      if (angular.equals($rootScope.arrayinSliceOf, array))
        return $rootScope.arrayinSliceOf;
      else
        $rootScope.arrayinSliceOf = array;
      return array;
    };
    return makeSlices;
  }
])


.config(function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      controller: 'HomeCtrl'
    })

  .state('name', {
    url: '/name',
    templateUrl: 'templates/name.html',
    controller: 'NameCtrl'
  })

  .state('questions', {
    url: '/questions',
    templateUrl: 'templates/questions.html',
    controller: 'QnsCtrl'
  })

  .state('tutorial', {
      url: '/tutorial',
      templateUrl: 'templates/tutorial.html',
      controller: 'TutorialCtrl'
    })
    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

  .state('tab.diary', {
    url: '/diary',
    views: {
      'tab-diary': {
        templateUrl: 'templates/diary/tab-diary.html',
        controller: 'DiaryCtrl'
      }
    }
  })

  .state('tab.diaryfood', {
    url: '/diary/foodinfo',
    views: {
      'tab-diary': {
        templateUrl: 'templates/diary/edit-food.html',
        controller: 'EditDiaryCtrl'
      }
    }
  })

  .state('tab.recommend', {
    url: '/diary/recommend',
    views: {
      'tab-diary': {
        templateUrl: 'templates/diary/recommend.html',
        controller: 'RecommendCtrl'
      }
    }
  })

  .state('tab.recommendsetting', {
      url: '/diary/recommendfilter',
      views: {
        'tab-diary': {
          templateUrl: 'templates/diary/recommend-setting.html',
          controller: 'FilterCtrl'
        }
      }
    })
    .state('tab.profile', {
      url: '/profile',
      views: {
        'tab-profile': {
          templateUrl: 'templates/profile/tab-profile.html',
          controller: 'ProfileCtrl'
        }
      }
    })

  .state('tab.editprofile', {
    url: '/profile/editprofile',
    views: {
      'tab-profile': {
        templateUrl: 'templates/profile/editprofile.html',
        controller: 'editprofile'
      }
    }
  })

  .state('tab.account', {
    url: '/profile/account',
    views: {
      'tab-profile': {
        templateUrl: 'templates/profile/account.html',
        controller: 'ProfileCtrl'
      }
    }
  })

  .state('tab.explorer', {
    url: '/explorer',
    views: {
      'tab-explorer': {
        templateUrl: 'templates/explorer/tab-explorer.html',
        controller: 'ExplorerCtrl'
      }
    }
  })

  .state('tab.explorer-history', {
      url: '/explorer/preference',
      views: {
        'tab-explorer': {
          templateUrl: 'templates/explorer/preference-history.html',
          controller: 'ExplorerHistoryCtrl'
        }
      }
    })
    .state('tab.addfood', {
      url: '/diary/addfood',
      views: {
          'tab-diary': {
          templateUrl: 'templates/addfood/tab-addfood.html',
          controller: 'AddFoodCtrl'
        }
      }
    })

  .state('tab.barcode-scanner', {
    url: '/diary/addfood/barcode-scanner',
    views: {
        'tab-diary': {
        templateUrl: 'templates/addfood/barcode-scanner.html',
        controller: 'AddFoodCtrl'
      }
    }
  })

  .state('tab.food-detail', {
    url: '/diary/addfood/:foodId',
    views: {
        'tab-diary': {
        templateUrl: 'templates/addfood/food-detail.html',
        controller: 'FoodDetailCtrl'
      }
    }
  })

  .state('tab.findfood', {
    url: '/findfood',
    views: {
      'tab-findfood': {
        templateUrl: 'templates/findfood/tab-findfood.html',
        controller: 'FindFoodCtrl'
      }
    }
  })

  .state('tab.store-detail', {
    url: '/findfood/:storeId',
    views: {
      'tab-findfood': {
        templateUrl: 'templates/findfood/store-detail.html',
        controller: 'StoreDetailCtrl'
      }
    }
  })

  .state('tab.store-food-detail', {
    url: '/findfood/:storeId/:foodId',
    views: {
      'tab-findfood': {
        templateUrl: 'templates/findfood/store-food-detail.html',
        controller: 'StoreFoodDetailCtrl'
      }
    }
  })

  .state('tab.dashboard', {
    url: '/dashboard',
    views: {
      'tab-dashboard': {
        templateUrl: 'templates/dashboard/dashboard.html',
        controller: 'DashboardCtrl'
      }
    }
  })

  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyBz9ZF8pmU91ekUiRmemTbvCzRXap9QsbY',
    v: '3.20', //defaults to latest 3.X anyhow
    libraries: 'weather,geometry,visualization'
  });
});
