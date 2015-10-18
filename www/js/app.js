// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'uiGmapgoogle-maps', 'starter.controllers', 'starter.services', 'nvd3', 'ionic.contrib.ui.cards'])

.run(function ($ionicPlatform) {
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
  });
})

.filter('inSlicesOf', ['$rootScope',
		function ($rootScope) {
		    makeSlices = function (stores, count) {
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
		}]
	)


.config(function ($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html',
            controller: 'HomeCtrl'
        })

    .state('questions', {
        url: '/questions',
        templateUrl: 'templates/questions.html',
        controller: 'QnsCtrl'
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

    .state('tab.recommendation', {
        url: '/diary/recommendation',
        views: {
            'tab-diary': {
                templateUrl: 'templates/diary/recommendation.html',
                controller: 'RecommendationCtrl'
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
        url: '/addfood',
        views: {
            'tab-addfood': {
                templateUrl: 'templates/addfood/tab-addfood.html',
                controller: 'AddFoodCtrl'
            }
        }
    })

    .state('tab.barcode-scanner', {
        url: '/addfood/barcode-scanner',
        views: {
            'tab-addfood': {
                templateUrl: 'templates/addfood/barcode-scanner.html',
                controller: 'AddFoodCtrl'
            }
        }
    })

    .state('tab.food-detail', {
        url: '/addfood/:foodId',
        views: {
            'tab-addfood': {
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

    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');
  uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyBz9ZF8pmU91ekUiRmemTbvCzRXap9QsbY',
      v: '3.20', //defaults to latest 3.X anyhow
      libraries: 'weather,geometry,visualization'
  });
});
