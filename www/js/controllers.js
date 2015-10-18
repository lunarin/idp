angular.module('starter.controllers', ['nvd3', 'uiGmapgoogle-maps','ngCordova','ionic.contrib.ui.cards','ionic'])

.controller('DiaryCtrl', function ($rootScope, $scope, Users,$window) {

    if (!$rootScope.user) {
        $rootScope.user = Users.get_user('0');
    }
    if (!$rootScope.filter) {
        $rootScope.filter = {
            'price': 12,
            'proximity': 8
        };
    }
    $scope.calendar = {
        date_textray: ['16 Oct', '17 Oct', 'Today', '19 Oct', '20 Oct'],
        startIndex: 2
    }
    $scope.indexUp = function () {
        $scope.calendar.startIndex = $scope.calendar.startIndex - 1;
    }
    $scope.indexDown = function () {
        $scope.calendar.startIndex = $scope.calendar.startIndex + 1;
    }
    $scope.edit_breakfast = function (breakdex) {
        var meal_food = {
            meal: 'breakfast',
            food: $rootScope.user.today_meal.breakfast[breakdex],
            foodex: breakdex
        };
        $rootScope.editFood = meal_food;
        $window.location.replace('#/tab/diary/foodinfo');
    };
    $scope.edit_lunch = function (lunchdex) {
        var meal_food = {
            meal: 'lunch',
            food: $rootScope.user.today_meal.lunch[lunchdex],
            foodex: lunchdex
        };
        $rootScope.editFood = meal_food;
        $window.location.replace('#/tab/diary/foodinfo');
    };
    $scope.edit_dinner = function (dinnerdex) {
        var meal_food = {
            meal: 'dinner',
            food: $rootScope.user.today_meal.dinner[dinnerdex],
            foodex: dinnerdex
        };
        $rootScope.editFood = meal_food;
        $window.location.replace('#/tab/diary/foodinfo');
    };
    $scope.edit_snack = function (snackdex) {
        var meal_food = {
            meal: 'snack',
            food: $rootScope.user.today_meal.snack[snackdex],
            foodex: snackdex
        };
        $rootScope.editFood = meal_food;
        $window.location.replace('#/tab/diary/foodinfo');
    };
    $scope.remove_breakfast = function (breakfast) {
        $rootScope.user.today_meal.breakfast.splice(breakfast, 1);
    };
    $scope.remove_lunch = function (lunch) {
        $rootScope.user.today_meal.lunch.splice(lunch, 1);
    };
    $scope.remove_dinner = function (dinner) {
        $rootScope.user.today_meal.dinner.splice(dinner, 1);
    };
    $scope.remove_snack = function (snack) {
        $rootScope.user.today_meal.snack.splice(snack, 1);
    };


    $scope.options = {
        chart: {
            type: 'pieChart',
            height: 100,
            width: 80,
            x: function (d) {
                return d.key;
            },
            y: function (d) {
                return d.y;
            },
            showLabels: false,
            showLegend: false,
            transitionDuration: 500,
            donutRatio: 0.70,
            donut: true,
            title: "81g",
            growOnHover: false
        }
    };
    $scope.options1 = {
        chart: {
            type: 'pieChart',
            height: 100,
            width: 80,
            x: function (d) {
                return d.key;
            },
            y: function (d) {
                return d.y;
            },
            showLabels: false,
            showLegend: false,
            transitionDuration: 500,
            donutRatio: 0.70,
            donut: true,
            title: "81g",
            growOnHover: false
        }
    };
    $scope.options2 = {
        chart: {
            type: 'pieChart',
            height: 100,
            width: 80,
            x: function (d) {
                return d.key;
            },
            y: function (d) {
                return d.y;
            },
            showLabels: false,
            showLegend: false,
            transitionDuration: 500,
            donutRatio: 0.70,
            donut: true,
            title: "21g",
            growOnHover: false

        }
    };
    $scope.options3 = {
        chart: {
            type: 'pieChart',
            height: 100,
            width: 80,
            x: function (d) {
                return d.key;
            },
            y: function (d) {
                return d.y;
            },
            showLabels: false,
            showLegend: false,
            transitionDuration: 500,
            donutRatio: 0.70,
            donut: true,
            title: "1200kcal",
            growOnHover: false
        }
    };

    $scope.data = [{
        key: "One",
        y: Math.random() * 100,
        color: "#1f77b4"
    }, {
        key: "Two",
        y: Math.random() * 100,
        color: "#aec7e8"
    }];
    $scope.data1 = [{
        key: "One",
        y: Math.random() * 100,
        color: "#FC3030"
    }, {
        key: "Two",
        y: Math.random() * 100,
        color: "#FF9E9E"
    }];
    $scope.data2 = [{
        key: "One",
        y: Math.random() * 100,
        color: "#FCFCB6"
    }, {
        key: "Two",
        y: Math.random() * 100,
        color: "#E4E600"
    }];
    $scope.data3 = [{
        key: "One",
        y: Math.random() * 100,
        color: "#B6DECA"
    }, {
        key: "Two",
        y: Math.random() * 100,
        color: "#00BD5F"
    }];
  //
  //   var width = 250;
  //   var height = 250;
  //   var svg = d3.select(".nvd3")
  // console.log()
  // .append("text")
  //   .attr("x", 200)
  //   .attr("y", 100)
  //   .attr("text-anchor", "middle")
  //   .text("Sample Charts");

})

.controller('EditDiaryCtrl', function ($scope, $rootScope,$window) {
    $scope.food = $rootScope.editFood.food;
    var previousMeal = $rootScope.editFood.meal.valueOf();
    $scope.added_to = { meal: $rootScope.editFood.meal};

    $scope.save_edit = function () {
        if (previousMeal == 'breakfast') {
            console.log("break");
            $rootScope.user.today_meal.breakfast.splice($rootScope.editFood.foodex, 1);
            var meal_array = $rootScope.user.today_meal[$scope.added_to.meal];
            meal_array.push($scope.food);
        }
        else if (previousMeal == 'lunch') {
            $rootScope.user.today_meal.lunch.splice($rootScope.editFood.foodex, 1);
            console.log("lunch");
            var meal_array = $rootScope.user.today_meal[$scope.added_to.meal];
            meal_array.push($scope.food);
        }
        else if (previousMeal == 'dinner') {
            console.log("dinz");
            $rootScope.user.today_meal.dinner.splice($rootScope.editFood.foodex, 1);
            var meal_array = $rootScope.user.today_meal[$scope.added_to.meal];
            meal_array.push($scope.food);
        } else {
            console.log("snack");
            $rootScope.user.today_meal.snack.splice($rootScope.editFood.foodex, 1);
            var meal_array = $rootScope.user.today_meal[$scope.added_to.meal];
            meal_array.push($scope.food);
        }
        $rootScope.editFood = {};
        $window.location.replace('#/tab/diary');
    };
})

.controller('RecommendationCtrl', function ($scope, $rootScope,FoodAndStores, $window) {

    $scope.disliked_meals = $rootScope.user.preference.dislike;
    $scope.liked_meals = $rootScope.user.preference.like;
    $scope.neutral = [];
    $scope.foods = FoodAndStores.foods();
    $scope.meal_plan_cards = [];

    for (var i = 0; i < $scope.foods.length; i++) {
        var food = $scope.foods[i];
        var inDislike = false;
        var inLike = false;
        for (var d = 0; d < $scope.disliked_meals.length; d++) {
            if ($scope.disliked_meals[d].id == food.id) {
                inDislike = true;
            }
        }
        if (!inDislike) {
            for (var k = 0; k < $scope.liked_meals.length; k++) {
                if ($scope.liked_meals[k].id == food.id) {
                    inLike = true;
                }
            }
            if (!inLike) {
                $scope.neutral.push(food);
            };
        }
    }
    //generate random new meal plan
    $scope.addMealPlan = function () {
        console.log("called");
        var passed = {liked:[],neutral:[]};
        for (var i = 0; i < $scope.liked_meals.length; i++) {
            if ($scope.liked_meals[i].price <= $rootScope.filter.price) {
                passed.liked.push($scope.liked_meals[i]);
            }
        }
        for (var i = 0; i < $scope.neutral.length; i++) {
            if ($scope.neutral[i].price <= $rootScope.filter.price) {
                passed.neutral.push($scope.neutral[i]);
            }
        }
        var randLength = passed.liked.length + passed.neutral.length;
        var randomFoodex = function () {
            var randFoodIndex_plusOne = Math.floor((Math.random() * randLength) + 1);
            if (randFoodIndex_plusOne > passed.liked.length) {
                randFoodIndex_plusOne = Math.floor((Math.random() * randLength) + 1);
            }
            return randFoodIndex_plusOne - 1;
        }
        if (randLength >= 3) {
            var newMeal = {
                'breakfast': {},
                'lunch': {},
                'dinner': {}
            }
            var foodno = randomFoodex();
            if (foodno < passed.liked.length) {
                newMeal.breakfast = passed.liked[foodno];
            } else {
                newMeal.breakfast = passed.neutral[foodno - passed.liked.length];
            }
            foodno = randomFoodex();
            if (foodno < passed.liked.length) {
                newMeal.lunch = passed.liked[foodno];
            } else {
                newMeal.lunch = passed.neutral[foodno - passed.liked.length];
            }
            foodno = randomFoodex();
            if (foodno < passed.liked.length) {
                newMeal.dinner = passed.liked[foodno];
            } else {
                newMeal.dinner = passed.neutral[foodno - passed.liked.length];
            }
            $scope.meal_plan_cards.push(newMeal);
        }
    }
    $scope.cardSwiped = function (index) {
        $scope.meal_plan_cards.splice(index, 1);
        //$scope.addMealPlan();
    };

    if ($scope.meal_plan_cards.length == 0) {
        for (var i = 0; i < 5; i++) {
            $scope.addMealPlan();
        }
    }

    //save meal plan
    $scope.addToDiary = function (meal) {
        var bf = $rootScope.user.today_meal.breakfast;
        bf.push(meal.breakfast);
        var lun = $rootScope.user.today_meal.lunch;
        lun.push(meal.lunch);
        var din = $rootScope.user.today_meal.dinner;
        din.push(meal.dinner);
        $window.location.replace('#/tab/diary');
    };
})

.controller('FilterCtrl', function ($scope,$rootScope, $window) {
    $scope.$on('$ionicView.enter', function (e) {
        $scope.pref = {
            'price': $rootScope.filter.price,
            'proximity': $rootScope.filter.proximity
        }
    })
    $scope.save = function(){
        $rootScope.filter.price = $scope.pref.price;
        $rootScope.filter.proximity = $scope.pref.proximity;
        $window.location='#/tab/diary';
    }
})

.controller('editprofile', function($scope) {
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

.controller('AddFoodCtrl', function($scope, FoodAndStores, $window, $rootScope,$cordovaBarcodeScanner) {
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
  $scope.eat_food = function () {
      var meal_array = $rootScope.user.today_meal[$scope.added_to.meal];
      meal_array.push($scope.food);
      $window.location.replace('#/tab/diary');
  };

  $scope.generateRandom = function () {
      var randFoodId = 5;
      $window.location.replace('#/tab/addfood/'+randFoodId);
  }

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

  var options = {
      quality: 75,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: false
  };

  $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            $scope.generateRandom();
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };
})

.controller('FoodDetailCtrl', function ($scope, $stateParams, FoodAndStores, $rootScope, $window) {
    $scope.food = FoodAndStores.get_food($stateParams.foodId);
    $scope.added_to = {};
    $scope.added_to.meal = 'breakfast';
    $scope.added_to.portion = '1';
    $scope.added_to.date = new Date(2015, 9, 18);
    $scope.eat_food = function () {
        var day = $scope.added_to.date.getDate();
        if (day == 18) {
            var meal_array = $rootScope.user.today_meal[$scope.added_to.meal];
            meal_array.push($scope.food);
            $window.location="#/tab/diary";
        } else if (day < 18) {
            var meal_array = $rootScope.user.yesterday[$scope.added_to.meal];
            meal_array.push($scope.food);
            $window.location = "#/tab/diary";
        } else {
            var meal_array = $rootScope.user.tomorrow[$scope.added_to.meal];
            meal_array.push($scope.food);
            $window.location = "#/tab/diary";
        }
    };
})

.controller('StoreDetailCtrl', function ($scope, $stateParams, FoodAndStores) {
    $scope.store = FoodAndStores.get_store($stateParams.storeId);

})

.controller('StoreFoodDetailCtrl', function ($scope,$window,$rootScope, $stateParams, FoodAndStores){
    $scope.food = FoodAndStores.get_food($stateParams.foodId);
    $scope.added_to = {};
    $scope.added_to.meal = 'breakfast';
    $scope.added_to.portion = '1';
    $scope.added_to.date = new Date(2015, 9, 18);
    $scope.eat_food = function () {
        var meal_array = $rootScope.user.today_meal[$scope.added_to.meal];
        meal_array.push($scope.food);
        $window.location.replace('#/tab/diary');
    };
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

.controller('ExplorerCtrl', function ($scope, FoodAndStores, $rootScope, $ionicSwipeCardDelegate) {
    $scope.foods = [{
        id: 0,
        name: 'Eggs Benedict',
        store_id: 0,
        foodImage: 'http://farm8.staticflickr.com/7105/7237535962_0ae3b02942_c.jpg',
        nutrient_values: {
            calories: 428,
            fat: 33.48,
            carbs: 12.3,
            protein: 18.54
        },
        price:7
    }, {
        id: 1,
        name: 'Eggs Benedict',
        store_id: 1,
        foodImage: 'http://eggrecipesforbreakfast.com/wp-content/uploads/2015/01/1.jpg',
        nutrient_values: {
            calories: 408,
            fat: 30.8,
            carbs: 12.1,
            protein: 24.83
        },
        price: 13
    }, {
        id: 2,
        name: 'Fruit Salad',
        store_id: 5,
        foodImage: 'https://s.yimg.com/ea/img/-/130222/salad130222getty300_18idm81-18idmgc.jpg',
        nutrient_values: {
            calories: 130,
            fat: 1.9,
            carbs: 30.4,
            protein: 2.13
        },
        price: 4
    }, {
        id: 3,
        name: 'Chicken Rice',
        store_id: 5,
        foodImage: 'http://steamykitchen.com/wp-content/uploads/2009/08/hainanese-chicken-83.jpg',
        nutrient_values: {
            calories: 666,
            fat: 44,
            carbs: 55,
            protein: 30
        },
        price: 7
    }, {
        id: 4,
        name: 'Chicken Laksa',
        store_id: 4,
        foodImage: 'http://rasamalaysia.com/uploaded_images/laksa-recipe/laksa5.jpg',
        nutrient_values: {
            calories: 591,
            fat: 32,
            carbs: 58,
            protein: 17
        },
        price: 6
    }, {
        id: 5,
        name: 'Nutella Bar',
        store_id: 3,
        foodImage: 'https://www.medifast1.com/media/common/images/products/meals/bars/crunch/64805-1-zoom.jpg',
        nutrient_values: {
            calories: 271,
            fat: 13,
            carbs: 35,
            protein: 5
        },
        price: 3
    }, {
        id: 6,
        name: 'Cream of Carrot',
        store_id: 2,
        foodImage: 'http://www.vegkitchen.com/wp-content/uploads/2011/11/Carrot-soup.jpg',
        nutrient_values: {
            calories: 326,
            fat: 25,
            carbs: 37,
            protein: 24
        },
        price: 7
    }, {
        id: 7,
        name: 'Eggs Benedict',
        store_id: 3,
        foodImage: 'http://www.bbcgoodfood.com/sites/bbcgoodfood.com/files/recipe_images/recipe-image-legacy-id--857455_11.jpg',
        nutrient_values: {
            calories: 421,
            fat: 42.41,
            carbs: 8.7,
            protein: 22.14
        },
        price: 9
    }, {
        id: 8,
        name: 'Seafood Laksa',
        store_id: 4,
        foodImage: 'http://rasamalaysia.com/uploaded_images/laksa-recipe/laksa5.jpg',
        nutrient_values: {
            calories: 591,
            fat: 32,
            carbs: 58,
            protein: 17
        },
        price: 6
    }, {
        id: 8,
        name: 'Beef Pho',
        store_id: 5,
        foodImage: 'http://www.slendierslim.com.au/images/com_yoorecipe/natalie-916/Large.JPG',
        nutrient_values: {
            calories: 334,
            fat: 6,
            carbs: 55,
            protein: 15
        },
        price: 9
    }];
    $scope.cardSwiped = function(index) {
        $scope.foods.splice(index, 1);
    };
    //
    // $scope.dislike = function (foodDisliked,index) {
    //     var dislikeSet = $rootScope.user.preference.dislike;
    //     dislikeSet.push(foodDisliked);
    //
    //     $scope.foods.splice(index, 1);
    // };
    // $scope.like = function (foodLiked, index) {
    //     var likeSet = $rootScope.user.preference.like;
    //     likeSet.push(foodLiked);
    //     $scope.foods.splice(index, 1);
    // };
})
.controller('SwipeCtrl', function ($scope, $rootScope,$ionicSwipeCardDelegate,Users) {
  $scope.dislike = function (foodDisliked,index) {
      var dislikeSet = $rootScope.user.preference.dislike;
      console.log(dislikeSet);
      dislikeSet.push(foodDisliked);
      var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
      //$scope.foods.splice(index, 1);
      card.swipe();
  };
  $scope.like = function (foodLiked, index) {
      var likeSet = $rootScope.user.preference.like;
      likeSet.push(foodLiked);
      var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
      //$scope.foods.splice(index, 1);
      card.swipe();
  };
})

.controller('ExplorerHistoryCtrl', function ($scope, FoodAndStores) {
    $scope.foods = FoodAndStores.foods();
    $scope.preference = [{
        food: $scope.foods[3],
        liked: true
    }, {
        food: $scope.foods[6],
        liked: false
    }, {

        food: $scope.foods[0],
        liked: true
    }, {
        food: $scope.foods[5],
        liked: true
    }, {
        food: $scope.foods[2],
        liked: false
    }, {
        food: $scope.foods[4],
        liked: true
    }];

})

.controller('QnsCtrl', function ($scope, $ionicSlideBoxDelegate, $window) {
    $scope.toSelect = function () {
        if (!$scope.selected) {
            $scope.selected = '4px solid orange';
            $scope.bg = 'white';
            $scope.bg1 = null;
            $scope.bg2 = null;
            $scope.selected1 = null;
            $scope.selected2 = null;
        } else {
            $scope.selected = null;
            $scope.bg = null;

        }
    };
    $scope.toSelect1 = function () {
        if (!$scope.selected1) {
            $scope.selected1 = '4px solid orange';
            $scope.bg1 = 'white';
            $scope.bg2 = null;
            $scope.bg = null;
            $scope.selected = null;
            $scope.selected2 = null;
        } else {
            $scope.bg1 = null;
            $scope.selected1 = null;
        }
    };
    $scope.toSelect2 = function () {
        if (!$scope.selected2) {
            $scope.selected2 = '4px solid orange';
            $scope.bg2 = 'white';
            $scope.bg1 = null;
            $scope.bg = null;
            $scope.selected1 = null;
            $scope.selected = null;
        } else {
            $scope.bg2 = null;
            $scope.selected2 = null;
        }
    };
    $scope.a = function () {
        if (!$scope.activity) {
            $scope.activity = '4px solid orange';
            $scope.abg = 'white';
            $scope.abg1 = null;
            $scope.abg2 = null;
            $scope.abg3 = null;
            $scope.activity1 = null;
            $scope.activity2 = null;
            $scope.activity3 = null;
        } else {
            $scope.abg = null;
            $scope.activity = null;
        }
    };
    $scope.a1 = function () {
        if (!$scope.activity1) {
            $scope.activity1 = '4px solid orange';
            $scope.abg1 = 'white';
            $scope.abg = null;
            $scope.abg2 = null;
            $scope.abg3 = null;
            $scope.activity = null;
            $scope.activity2 = null;
            $scope.activity3 = null;
        } else {
            $scope.abg1 = null;
            $scope.activity1 = null;
        }
    };
    $scope.a2 = function () {
        if (!$scope.activity2) {
            $scope.activity2 = '4px solid orange';
            $scope.abg2 = 'white';
            $scope.abg1 = null;
            $scope.abg = null;
            $scope.abg3 = null;
            $scope.activity1 = null;
            $scope.activity = null;
            $scope.activity3 = null;
        } else {
            $scope.abg2 = null;
            $scope.activity2 = null;
        }
    };
    $scope.a3 = function () {
        if (!$scope.activity3) {
            $scope.activity3 = '4px solid orange';
            $scope.abg3 = 'white';
            $scope.abg1 = null;
            $scope.abg2 = null;
            $scope.abg = null;
            $scope.activity = null;
            $scope.activity1 = null;
            $scope.activity2 = null;
        } else {
            $scope.abg3 = null;
            $scope.activity3 = null;
        }
    };

    $scope.male = function () {
        if (!$scope.m) {
            $scope.m = 'orange';
            $scope.f = null;
        } else {
            $scope.m = null;
        }
    };
    $scope.female = function () {
        if (!$scope.f) {
            $scope.f = 'orange';
            $scope.m = null;
        } else {
            $scope.f = null;
        }
    }
    $scope.nextSlide = function () {
        $ionicSlideBoxDelegate.next();
    }
    $scope.goDiary = function () {
        $window.location.replace('#/tutorial');
    }

})

.controller('HomeCtrl', function ($scope, $window) {
    $scope.goQuestions = function () {
        $window.location = '#/questions';
    }
    $scope.Login = function () {
        $window.location = '#/tab/diary';
    }

})

.controller('TutorialCtrl', function ($scope, $window) {
  $scope.tutorials = ['img/1.png','img/2.png','img/3.png','img/4.png','img/5.png','img/6.png','img/7.png','img/8.png','img/9.png','img/11.png','img/12.png','img/13.png','img/14.png','img/15.png'];

})



;
