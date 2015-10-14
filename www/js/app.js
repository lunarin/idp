// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'uiGmapgoogle-maps', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
    $stateProvider
      
    // setup an abstract state for the tabs directive
      .state('tab', {
          url: '/tab',
          abstract: true,
          templateUrl: 'templates/tabs.html'
      })

    // Each tab has its own nav history stack:

    .state('tab.diary', {
        url: '/diary',   
        views: {
            'tab-diary': {
                templateUrl: 'templates/diary/tab-diary.html',
                controller: 'DiaryCtrl'
            }
        }
    })

    .state('tab.recommendation', {
        url: '/diary/recommendation',
        views: {
            'tab-diary': {
                templateUrl: 'templates/diary/recommendation.html',
                controller: 'DiaryCtrl'
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
    
    .state('tab.account', {
        url: '/profile/account',
        views: {
            'tab-profile': {
                templateUrl: 'templates/profile/account.html',
                controller: 'ProfileCtrl'
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
    });
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/diary');
  uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyAbIhAJ3oaElm0APMBFRXpoutS6aqPfsps',
      v: '3.20', //defaults to latest 3.X anyhow
      libraries: 'weather,geometry,visualization'
  });
});
