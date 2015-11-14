angular.module('starter.controllers', ['nvd3', 'uiGmapgoogle-maps', 'ngCordova', 'ionic.contrib.ui.cards', 'ionic'])

.controller('DiaryCtrl', function($rootScope, $scope, Users, $window, $firebaseObject) {
  $scope.$on('$ionicView.enter', function(e) {
    if (!$rootScope.addfood_date) {
      $rootScope.addfood_date = new Date();
    }
    $scope.current_view = 0;
    $scope.today = new Date(new Date().getTime() + $scope.current_view * day);
    $scope.ytd = new Date(new Date().getTime() + ($scope.current_view - 1) * day);
    $scope.tmr = new Date(new Date().getTime() + ($scope.current_view + 1) * day);

    $scope.calendar = {
      ytd: $scope.ytd.getDate() + ' ' + months[$scope.ytd.getMonth()],
      today: $scope.today.getDate() + ' ' + months[$scope.today.getMonth()],
      tmr: $scope.tmr.getDate() + ' ' + months[$scope.tmr.getMonth()]
    };
  })
  if (!$rootScope.user) {
    $rootScope.user = Users.get_user('0');
  }
  if (!$rootScope.filter) {
    $rootScope.filter = {
      'price': 12,
      'proximity': 8
    };
  }


  $rootScope.cal = 2090
  $rootScope.fat = 70
  $rootScope.carbs = 157
  $rootScope.protein = 183

  var months = Users.months();
  var day = 86400000;
  $scope.today = new Date(new Date().getTime() + $scope.current_view * day);
  $scope.ytd = new Date(new Date().getTime() + ($scope.current_view - 1) * day);
  $scope.tmr = new Date(new Date().getTime() + ($scope.current_view + 1) * day);

  $scope.calendar = {
    ytd: $scope.ytd.getDate() + ' ' + months[$scope.ytd.getMonth()],
    today: $scope.today.getDate() + ' ' + months[$scope.today.getMonth()],
    tmr: $scope.tmr.getDate() + ' ' + months[$scope.tmr.getMonth()]
  };

  $scope.indexUp = function() {
    $scope.current_view = $scope.current_view - 1;
    $scope.today = new Date(new Date().getTime() + $scope.current_view * day);
    $scope.ytd = new Date(new Date().getTime() + ($scope.current_view - 1) * day);
    $scope.tmr = new Date(new Date().getTime() + ($scope.current_view + 1) * day);
    $scope.calendar = {
      ytd: $scope.ytd.getDate() + ' ' + months[$scope.ytd.getMonth()],
      today: $scope.today.getDate() + ' ' + months[$scope.today.getMonth()],
      tmr: $scope.tmr.getDate() + ' ' + months[$scope.tmr.getMonth()]
    };
  }
  $scope.indexDown = function() {
    $scope.current_view = $scope.current_view + 1;
    $scope.today = new Date(new Date().getTime() + $scope.current_view * day);
    $scope.ytd = new Date(new Date().getTime() + ($scope.current_view - 1) * day);
    $scope.tmr = new Date(new Date().getTime() + ($scope.current_view + 1) * day);
    $scope.calendar = {
      ytd: $scope.ytd.getDate() + ' ' + months[$scope.ytd.getMonth()],
      today: $scope.today.getDate() + ' ' + months[$scope.today.getMonth()],
      tmr: $scope.tmr.getDate() + ' ' + months[$scope.tmr.getMonth()]
    };
  }
  $scope.edit_breakfast = function(breakdex) {
    var meal_food = {
      meal: 'breakfast',
      food: $rootScope.user.today_meal.breakfast[breakdex],
      foodex: breakdex
    };
    $rootScope.editFood = meal_food;
    $window.location.replace('#/tab/diary/foodinfo');
  };
  $scope.edit_lunch = function(lunchdex) {
    var meal_food = {
      meal: 'lunch',
      food: $rootScope.user.today_meal.lunch[lunchdex],
      foodex: lunchdex
    };
    $rootScope.editFood = meal_food;
    $window.location.replace('#/tab/diary/foodinfo');
  };
  $scope.edit_dinner = function(dinnerdex) {
    var meal_food = {
      meal: 'dinner',
      food: $rootScope.user.today_meal.dinner[dinnerdex],
      foodex: dinnerdex
    };
    $rootScope.editFood = meal_food;
    $window.location.replace('#/tab/diary/foodinfo');
  };
  $scope.edit_snack = function(snackdex) {
    var meal_food = {
      meal: 'snack',
      food: $rootScope.user.today_meal.snack[snackdex],
      foodex: snackdex
    };
    $rootScope.editFood = meal_food;
    $window.location.replace('#/tab/diary/foodinfo');
  };
  $scope.remove_breakfast = function(breakfast) {
    $rootScope.user.today_meal.breakfast.splice(breakfast, 1);
  };
  $scope.remove_lunch = function(lunch) {
    $rootScope.user.today_meal.lunch.splice(lunch, 1);
  };
  $scope.remove_dinner = function(dinner) {
    $rootScope.user.today_meal.dinner.splice(dinner, 1);
  };
  $scope.remove_snack = function(snack) {
    $rootScope.user.today_meal.snack.splice(snack, 1);
  };

  $scope.addFoodWithDate = function() {
    $rootScope.addfood_date = $scope.today;
    $window.location = '#/tab/diary/addfood';
  }
  $scope.options = {
    chart: {
      type: 'pieChart',
      height: 100,
      width: 80,
      x: function(d) {
        return d.key;
      },
      y: function(d) {
        return d.y;
      },
      showLabels: false,
      showLegend: false,
      transitionDuration: 500,
      donutRatio: 0.70,
      donut: true,
      title: $rootScope.protein + 'g',
      growOnHover: false,
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0

      }
    }
  };
  $scope.options1 = {
    chart: {
      type: 'pieChart',
      height: 100,
      width: 80,
      x: function(d) {
        return d.key;
      },
      y: function(d) {
        return d.y;
      },
      showLabels: false,
      showLegend: false,
      transitionDuration: 500,
      donutRatio: 0.70,
      donut: true,
      title: $rootScope.carbs + 'g',
      growOnHover: false,
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0

      }
    }
  };
  $scope.options2 = {
    chart: {
      type: 'pieChart',
      height: 100,
      width: 80,
      x: function(d) {
        return d.key;
      },
      y: function(d) {
        return d.y;
      },
      showLabels: false,
      showLegend: false,
      transitionDuration: 500,
      donutRatio: 0.70,
      donut: true,
      title: $rootScope.fat + 'g',
      growOnHover: false,
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0

      }

    }
  };
  $scope.options3 = {
    chart: {
      type: 'pieChart',
      height: 100,
      width: 80,
      x: function(d) {
        return d.key;
      },
      y: function(d) {
        return d.y;
      },
      showLabels: false,
      showLegend: false,
      transitionDuration: 500,
      donutRatio: 0.70,
      donut: true,
      title: $rootScope.cal + 'kcal',
      growOnHover: false,
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0

      }
    }
  };

  $scope.data = [{
    key: "One",
    y: Math.floor((Math.random() * 100) + 1),
    color: "#1f77b4"
  }, {
    key: "Two",
    y: $rootScope.protein,
    color: "#aec7e8"
  }];
  $scope.data1 = [{
    key: "One",
    y: Math.floor((Math.random() * 100) + 1),
    color: "#FC3030"
  }, {
    key: "Two",
    y: $rootScope.carbs,
    color: "#FF9E9E"
  }];
  $scope.data2 = [{
    key: "One",
    y: Math.floor((Math.random() * 100) + 1),
    color: "#FCFCB6"
  }, {
    key: "Two",
    y: $rootScope.fat,
    color: "#E4E600"
  }];
  $scope.data3 = [{
    key: "One",
    y: Math.floor((Math.random() * 100) + 1),
    color: "#B6DECA"
  }, {
    key: "Two",
    y: $rootScope.cal,
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

.controller('EditDiaryCtrl', function($scope, $rootScope, $window) {
  $scope.food = $rootScope.editFood.food;
  var previousMeal = $rootScope.editFood.meal.valueOf();
  $scope.added_to = {
    meal: $rootScope.editFood.meal
  };

  $scope.save_edit = function() {
    if (previousMeal == 'breakfast') {
      console.log("break");
      $rootScope.user.today_meal.breakfast.splice($rootScope.editFood.foodex, 1);
      var meal_array = $rootScope.user.today_meal[$scope.added_to.meal];
      meal_array.push($scope.food);
    } else if (previousMeal == 'lunch') {
      $rootScope.user.today_meal.lunch.splice($rootScope.editFood.foodex, 1);
      console.log("lunch");
      var meal_array = $rootScope.user.today_meal[$scope.added_to.meal];
      meal_array.push($scope.food);
    } else if (previousMeal == 'dinner') {
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

.controller('RecommendCtrl', function($scope, $rootScope, FoodAndStores, $window) {
  $scope.$on('$ionicView.enter', function(e) {
    $rootScope.justEntered = true;
  });
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
  $scope.addMealPlan = function() {
    var passed = {
      liked: [],
      neutral: []
    };
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
    var randomFoodex = function() {
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
  $scope.cardSwiped = function(index) {
    $scope.meal_plan_cards.splice(index, 1);
    $rootScope.justEntered = false;
    //$scope.addMealPlan();
  };

  if ($scope.meal_plan_cards.length == 0) {
    for (var i = 0; i < 5; i++) {
      $scope.addMealPlan();
    }
  }
  var newMeal = {
    'breakfast': {},
    'lunch': {},
    'dinner': {}
  }
  newMeal.breakfast = $scope.foods[2];
  newMeal.lunch = $scope.foods[3];
  newMeal.dinner = $scope.foods[8];
  $scope.meal_plan_cards[2] = newMeal;


  //save meal plan
  $scope.addToDiary = function(meal) {
    var bf = $rootScope.user.today_meal.breakfast;
    bf.push(meal.breakfast);
    var lun = $rootScope.user.today_meal.lunch;
    lun.push(meal.lunch);
    var din = $rootScope.user.today_meal.dinner;
    din.push(meal.dinner);
    $rootScope.userCal += meal.breakfast.nutrient_values.calories;
    $rootScope.userCal += meal.lunch.nutrient_values.calories;
    $rootScope.userCal += meal.dinner.nutrient_values.calories;

    $rootScope.userCarbs += meal.breakfast.nutrient_values.carbs;
    $rootScope.userCarbs += meal.lunch.nutrient_values.carbs;
    $rootScope.userCarbs += meal.dinner.nutrient_values.carbs;

    $rootScope.userFat += meal.breakfast.nutrient_values.fat;
    $rootScope.userFat += meal.lunch.nutrient_values.fat;
    $rootScope.userFat += meal.dinner.nutrient_values.fat;

    $rootScope.userProtein +=$rootScope.userFat += meal.breakfast.nutrient_values.protein;
    $rootScope.userProtein +=$rootScope.userFat += meal.lunch.nutrient_values.protein;
    $rootScope.userProtein +=$rootScope.userFat += meal.dinner.nutrient_values.protein;
    if (bf[0].name == "Fruit Salad" && lun[0].name == "Chicken Rice" && din[0].name == "Seafood Laksa") {
      $rootScope.task = 2
      $rootScope.stopTimer();
      $rootScope.startTimer();
    };
    $window.location.replace('#/tab/diary');
  }
})

.controller('FilterCtrl', function($scope, $rootScope, $window) {
  $scope.$on('$ionicView.enter', function(e) {
    $scope.pref = {
      'price': $rootScope.filter.price,
      'proximity': $rootScope.filter.proximity
    }
  })
  $scope.save = function() {
    $rootScope.filter.price = $scope.pref.price;
    $rootScope.filter.proximity = $scope.pref.proximity;
    $window.location.replace('#/tab/diary');
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

.controller('AddFoodCtrl', function($scope, FoodAndStores, Users, $window, $rootScope, $cordovaBarcodeScanner) {
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

  $scope.generateRandom = function() {
    var randFoodId = 5;
    $window.location.replace('#/tab/diary/addfood/' + randFoodId);
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

  $scope.scanBarcode = function() {
    $cordovaBarcodeScanner.scan().then(function(imageData) {
      $scope.generateRandom();
    }, function(error) {
      console.log("An error happened -> " + error);
    });
  };
})

.controller('FoodDetailCtrl', function($scope, $stateParams, FoodAndStores, $rootScope, $window, Users, $ionicPopup, $timeout) {
  $scope.food = FoodAndStores.get_food($stateParams.foodId);
  $scope.added_to = {};
  $scope.added_to.meal = 'breakfast';
  $scope.added_to.portion = '1';
  var today = new Date();
  var months = Users.months();
  $scope.eat_food = function() {
    var add_to_date = $rootScope.addfood_date;
    var day_to_add = add_to_date.getDate();
    var mth_to_add = add_to_date.getMonth();
    //check if User has a meal schedule instance else create
    if (day_to_add == today.getDate() && mth_to_add == today.getMonth()) {
      var meal_array = $rootScope.user.today_meal[$scope.added_to.meal];
      meal_array.push($scope.food);
    } else if (day_to_add < today.getDate()) {
      var meal_array = $rootScope.user.yesterday[$scope.added_to.meal];
      meal_array.push($scope.food);
    } else {
      var meal_array = $rootScope.user.tomorrow[$scope.added_to.meal];
      meal_array.push($scope.food);
    }

    if (day_to_add == 13 && mth_to_add == 10 && $scope.added_to.meal == 'lunch' && $scope.added_to.portion == '2' && $scope.food.name == "Fruit Salad") {
      $rootScope.task = 3
      $rootScope.stopTimer();
    }
    add_alert();
  };

  var add_alert = function() {
    var alertPopup = $ionicPopup.show({
      title: '<div class=" animated zoomIn"><div class="row"><div class="col" align="center"><h4>Added to diary!</h4></div></div><div class="row"><div class="col" align="center"><i class="ion-checkmark-round"></i></div></div></div>'
    });
    alertPopup.then(function(res) {
      console.log('Added to diary');
    });
    $timeout(function() {
      alertPopup.close(); //close the popup after 1.5 seconds
      $window.location.replace("#/tab/diary/addfood");
    }, 1500);
  };
})

.controller('StoreDetailCtrl', function($scope, $stateParams, FoodAndStores) {
  $scope.store = FoodAndStores.get_store($stateParams.storeId);
})

.controller('StoreFoodDetailCtrl', function($scope, $window, $rootScope, $stateParams, FoodAndStores) {
  $scope.food = FoodAndStores.get_food($stateParams.foodId);
  $scope.added_to = {};
  $scope.added_to.meal = 'breakfast';
  $scope.added_to.portion = '1';
  $scope.added_to.date = new Date();
  $scope.eat_food = function() {
    var today = new Date();
    var add_to_date = $scope.added_to.date
    var day_to_add = add_to_date.getDate();
    var mth_to_add = add_to_date.getMonth();
    //check if User has a meal schedule instance else create
    if (day_to_add == today.getDate() && mth_to_add == today.getMonth()) {
      var meal_array = $rootScope.user.today_meal[$scope.added_to.meal];
      meal_array.push($scope.food);
    } else if (day_to_add < today.getDate()) {
      var meal_array = $rootScope.user.yesterday[$scope.added_to.meal];
      meal_array.push($scope.food);
    } else {
      var meal_array = $rootScope.user.tomorrow[$scope.added_to.meal];
      meal_array.push($scope.food);
    }

    if (day_to_add == 13 && mth_to_add == 10 && $scope.added_to.meal == 'dinner' && $scope.added_to.portion == '1' && $scope.food.name == "Eggs Benedict") {
      $rootScope.task = 1
      $rootScope.stopTimer();
      $rootScope.startTimer();
    }

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

.controller('ExplorerCtrl', function($scope, FoodAndStores, $rootScope, $ionicSwipeCardDelegate) {
    $scope.$on('$ionicView.enter', function(e) {
      $rootScope.justEntered = true;
    });
    $scope.foods = FoodAndStores.foods();
    $scope.cardSwiped = function(index) {
      $scope.foods.splice(index, 1);
      $rootScope.justEntered = false;
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
  .controller('SwipeCtrl', function($scope, $rootScope, $ionicSwipeCardDelegate, Users) {
    $scope.dislike = function(foodDisliked, index) {
      var dislikeSet = $rootScope.user.preference.dislike;
      console.log(dislikeSet);
      dislikeSet.push(foodDisliked);
      var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
      //$scope.foods.splice(index, 1);
      $rootScope.justEntered = false;
      card.swipe();
    };
    $scope.like = function(foodLiked, index) {
      var likeSet = $rootScope.user.preference.like;
      likeSet.push(foodLiked);
      var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
      //$scope.foods.splice(index, 1);
      $rootScope.justEntered = false;
      card.swipe();
    };
  })

.controller('ExplorerHistoryCtrl', function($scope, FoodAndStores) {
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

.controller('QnsCtrl', function($scope, $ionicSlideBoxDelegate, $window) {
  $scope.toSelect = function() {
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
  $scope.toSelect1 = function() {
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
  $scope.toSelect2 = function() {
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
  $scope.a = function() {
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
  $scope.a1 = function() {
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
  $scope.a2 = function() {
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
  $scope.a3 = function() {
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

  $scope.male = function() {
    if (!$scope.m) {
      $scope.m = 'orange';
      $scope.f = null;
    } else {
      $scope.m = null;
    }
  };
  $scope.female = function() {
    if (!$scope.f) {
      $scope.f = 'orange';
      $scope.m = null;
    } else {
      $scope.f = null;
    }
  }
  $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next();
  }
  $scope.goDiary = function() {
    $window.location.replace('#/tutorial');
  }

})

.controller('HomeCtrl', function($scope, $window, $rootScope) {
  $scope.goQuestions = function() {
    $window.location = '#/questions';
  }
  $scope.createorFindUser = function(name) {
    $rootScope.userdata.findOrCreateUser(name).then(function(foundUser) {
      $rootScope.user_id = foundUser.$id;
      $rootScope.user_name = foundUser.name;
    });

  }
  $scope.goDiary = function() {
    $window.location.replace('#/tab/diary');
  }
})


.controller('NameCtrl', function($scope, $window, $rootScope) {

})

.controller('TutorialCtrl', function($scope, $window) {
  $scope.tutorials = ['img/1.png', 'img/2.png', 'img/3.png', 'img/4.png', 'img/5.png', 'img/6.png', 'img/7.png', 'img/8.png', 'img/9.png', 'img/11.png', 'img/12.png', 'img/13.png', 'img/14.png', 'img/15.png'];

})

.controller('DashboardCtrl', function($scope, $window, $rootScope) {



  $scope.goProfile = function() {
    $window.location.replace('#/tab/profile');
  }
  $scope.goDiary = function() {
    $window.location.replace('#/tab/diary');
  }
  $scope.goFind = function() {
    $window.location.replace('#/tab/findfood');
  }
  $scope.goDiscover = function() {
    $window.location.replace('#/tab/explorer');
  }
  $scope.goAdd = function() {
    $window.location.replace('#/tab/diary/addfood');
  }

})


;
