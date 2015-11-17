angular.module('starter.controllers', ['nvd3', 'uiGmapgoogle-maps', 'ngCordova', 'ionic.contrib.ui.cards', 'ionic'])

.controller('DiaryCtrl', function($rootScope, $scope, Users, $window, $firebaseObject) {
  $scope.$on('$ionicView.enter', function(e) {
    if (!$rootScope.addfood_date) {
      var today_datetime = new Date();
      $rootScope.addfood_date = new Date(today_datetime.getFullYear(),today_datetime.getMonth(),today_datetime.getDate());
    }
    if (!$rootScope.user) {
      $rootScope.user = Users.get_user('0');
      updateMealPlan();
    }else{
      console.log($rootScope.user);
      updateMealPlan();
    }
    if (!$rootScope.filter) {
      $rootScope.filter = {
        'price': 12,
        'proximity': 8
      };
    }
  })

  var months = Users.months();
  var day = 86400000;
  var today_time = new Date();
  var today_date = new Date(today_time.getFullYear(),today_time.getMonth(),today_time.getDate());
  $scope.current_view = 0;
  $scope.today = new Date(today_date.getTime() + $scope.current_view * day);
  $scope.ytd = new Date(today_date.getTime() + ($scope.current_view - 1) * day);
  $scope.tmr = new Date(today_date.getTime() + ($scope.current_view + 1) * day);
  $scope.calendar = {
    ytd: $scope.ytd.getDate() + ' ' + months[$scope.ytd.getMonth()],
    today: $scope.today.getDate() + ' ' + months[$scope.today.getMonth()],
    tmr: $scope.tmr.getDate() + ' ' + months[$scope.tmr.getMonth()]
  };

  $rootScope.cal = 2090;
  $rootScope.fat = 70;
  $rootScope.carbs = 157;
  $rootScope.protein = 183;
  $scope.mealplan_display =
        { breakfast:[],
          lunch:[],
          dinner: [],
          snack: []
        };

  var updateMealPlan = function(){
    if(!$rootScope.user.meals[$scope.today.getTime()]){
      $rootScope.user.meals[$scope.today.getTime()] = {
        breakfast:[],
        lunch:[],
        dinner: [],
        snack: []
      };
    }
    $scope.mealplan_display = $rootScope.user.meals[$scope.today.getTime()];
  }


  $scope.indexUp = function() {
    $scope.current_view = $scope.current_view - 1;
    $scope.today = new Date(today_date.getTime() + $scope.current_view * day);
    $scope.ytd = new Date(today_date.getTime() + ($scope.current_view - 1) * day);
    $scope.tmr = new Date(today_date.getTime() + ($scope.current_view + 1) * day);
    $scope.calendar = {
      ytd: $scope.ytd.getDate() + ' ' + months[$scope.ytd.getMonth()],
      today: $scope.today.getDate() + ' ' + months[$scope.today.getMonth()],
      tmr: $scope.tmr.getDate() + ' ' + months[$scope.tmr.getMonth()]
    };
    updateMealPlan();
  }
  $scope.indexDown = function() {
    $scope.current_view = $scope.current_view + 1;
    $scope.today = new Date(today_date.getTime() + $scope.current_view * day);
    $scope.ytd = new Date(today_date.getTime() + ($scope.current_view - 1) * day);
    $scope.tmr = new Date(today_date.getTime() + ($scope.current_view + 1) * day);
    $scope.calendar = {
      ytd: $scope.ytd.getDate() + ' ' + months[$scope.ytd.getMonth()],
      today: $scope.today.getDate() + ' ' + months[$scope.today.getMonth()],
      tmr: $scope.tmr.getDate() + ' ' + months[$scope.tmr.getMonth()]
    };
    updateMealPlan();
  }
  $scope.edit_breakfast = function(breakdex) {
    var meals = $rootScope.user.meals[$scope.today.getTime()];
    var food_to_edit = meals.breakfast[breakdex];
    var meal_food = {
      meal: 'breakfast',
      food: food_to_edit,
      foodex: breakdex,
      date: $scope.today
    };
    $rootScope.editFood = meal_food;
    $window.location='#/tab/diary/foodinfo';
  };
  $scope.edit_lunch = function(lunchdex) {
    var meals = $rootScope.user.meals[$scope.today.getTime()];
    var food_to_edit = meals.lunch[lunchdex];
    var meal_food = {
      meal: 'lunch',
      food: food_to_edit,
      foodex: lunchdex,
      date: $scope.today
    };
    $rootScope.editFood = meal_food;
    $window.location='#/tab/diary/foodinfo';
  };
  $scope.edit_dinner = function(dinnerdex) {
    var meals = $rootScope.user.meals[$scope.today.getTime()];
    var food_to_edit = meals.dinner[dinnerdex];
    var meal_food = {
      meal: 'dinner',
      food: food_to_edit,
      foodex: dinnerdex,
      date: $scope.today
    };
    $rootScope.editFood = meal_food;
    $window.location='#/tab/diary/foodinfo';
  };
  $scope.edit_snack = function(snackdex) {
    var meals = $rootScope.user.meals[$scope.today.getTime()];
    var food_to_edit = meals.snack[snackdex];
    var meal_food = {
      meal: 'snack',
      food: food_to_edit,
      foodex: snackdex,
      date: $scope.today
    };
    $rootScope.editFood = meal_food;
    $window.location='#/tab/diary/foodinfo';
  };
  $scope.remove_breakfast = function(bf) {
    // $rootScope.user.today_meal.breakfast.splice(bf, 1);
    var today = new Date(today_date.getTime() + $scope.current_view * day);
    var meals = $rootScope.user.meals[today.getTime()];
    meals.breakfast.splice(bf, 1);
  };
  $scope.remove_lunch = function(lun) {
    // $rootScope.user.today_meal.lunch.splice(lunch, 1);
    var today = new Date(today_date.getTime() + $scope.current_view * day);
    var meals = $rootScope.user.meals[today.getTime()];
    meals.lunch.splice(lun, 1);
  };
  $scope.remove_dinner = function(din) {
    // $rootScope.user.today_meal.dinner.splice(dinner, 1);
    var today = new Date(today_date.getTime() + $scope.current_view * day);
    var meals = $rootScope.user.meals[today.getTime()];
    meals.dinner.splice(din, 1);
  };
  $scope.remove_snack = function(sna) {
    // $rootScope.user.today_meal.snack.splice(snack, 1);
    var today = new Date(today_date.getTime() + $scope.current_view * day);
    var meals = $rootScope.user.meals[today.getTime()];
    meals.snack.splice(sna, 1);
  };

  $scope.addFoodWithDate = function () {
      $rootScope.addfood_date = $scope.today;
      $window.location='#/tab/diary/addfood';
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
      $rootScope.user.meals[$rootScope.editFood.date.getTime()].breakfast.splice($rootScope.editFood.foodex, 1);
      var meals = $rootScope.user.meals[$rootScope.editFood.date.getTime()];
      var meal_array = meals[$scope.added_to.meal];
      meal_array.push($scope.food);
    } else if (previousMeal == 'lunch') {
      $rootScope.user.meals[$rootScope.editFood.date.getTime()].lunch.splice($rootScope.editFood.foodex, 1);
      var meals = $rootScope.user.meals[$rootScope.editFood.date.getTime()];
      var meal_array = meals[$scope.added_to.meal];
      meal_array.push($scope.food);
    } else if (previousMeal == 'dinner') {
      $rootScope.user.meals[$rootScope.editFood.date.getTime()].dinner.splice($rootScope.editFood.foodex, 1);
      var meals = $rootScope.user.meals[$rootScope.editFood.date.getTime()];
      var meal_array = meals[$scope.added_to.meal];
      meal_array.push($scope.food);
    } else {
      $rootScope.user.meals[$rootScope.editFood.date.getTime()].snack.splice($rootScope.editFood.foodex, 1);
      var meals = $rootScope.user.meals[$rootScope.editFood.date.getTime()];
      var meal_array = meals[$scope.added_to.meal];
      meal_array.push($scope.food);
    }
    $rootScope.editFood = {};
    $window.location.replace('#/tab/diary');
  };
})

.controller('RecommendCtrl', function($scope, $rootScope, FoodAndStores, $window,$ionicPopup,$timeout) {
  $scope.$on('$ionicView.enter', function(e) {
    $rootScope.justEntered = true;
  });
  $scope.disliked_meals = [];
  $scope.liked_meals = FoodAndStores.foods();
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
    var today_time = new Date();
    var today_date = new Date(today_time.getFullYear(),today_time.getMonth(),today_time.getDate());
    var meals = $rootScope.user.meals[today_date.getTime()];

    var bf = meals.breakfast;
    bf.push(meal.breakfast);
    var lun = meals.lunch;
    lun.push(meal.lunch);
    var din = meals.dinner;
    din.push(meal.dinner);
    // $rootScope.userCal += meal.breakfast.nutrient_values.calories;
    // $rootScope.userCal += meal.lunch.nutrient_values.calories;
    // $rootScope.userCal += meal.dinner.nutrient_values.calories;
    //
    // $rootScope.userCarbs += meal.breakfast.nutrient_values.carbs;
    // $rootScope.userCarbs += meal.lunch.nutrient_values.carbs;
    // $rootScope.userCarbs += meal.dinner.nutrient_values.carbs;
    //
    // $rootScope.userFat += meal.breakfast.nutrient_values.fat;
    // $rootScope.userFat += meal.lunch.nutrient_values.fat;
    // $rootScope.userFat += meal.dinner.nutrient_values.fat;
    //
    // $rootScope.userProtein +=$rootScope.userFat += meal.breakfast.nutrient_values.protein;
    // $rootScope.userProtein +=$rootScope.userFat += meal.lunch.nutrient_values.protein;
    // $rootScope.userProtein +=$rootScope.userFat += meal.dinner.nutrient_values.protein;
    if ((meal.breakfast.name == "Fruit Salad") && (meal.lunch.name == "Chicken Rice") && (meal.dinner.name == "Seafood Laksa")) {
      $rootScope.task = 2
      $rootScope.stopTimer();
      $rootScope.startTimer();
      // add_alert();
    }else{
      add_alert_default();
    }
  }
  var add_alert_default = function() {
    var alertPopup = $ionicPopup.show({
      title: '<div class=" animated zoomIn"><div class="row"><div class="col" align="center"><h4>Meal Plan Added!</h4></div></div><div class="row"><div class="col" align="center"><i class="ion-checkmark-round"></i></div></div></div>'
    });
    alertPopup.then(function(res) {
        $window.location.replace('#/tab/diary');
    });
    $timeout(function() {
      alertPopup.close(); //close the popup after 1.5 seconds
    }, 1500);
  };
  var add_alert = function() {
    var alertPopup = $ionicPopup.show({
      title: '<div class=" animated zoomIn"><div class="row"><div class="col" align="center"><h4>Task 2 Completed!</h4></div></div><div class="row"><div class="col" align="center"></div></div></div>'
    });
    alertPopup.then(function(res) {
      // console.log('Account is not valid');
    });
    $timeout(function() {
      alertPopup.close(); //close the popup after 1.5 seconds
      $window.location.replace("#/tab/diary");
    }, 1500);
  };
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
    $window.location= '#/tab/diary/addfood/' + randFoodId;
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
  var today_datetime = new Date();
  var today = new Date(today_datetime.getFullYear(),today_datetime.getMonth(),today_datetime.getDate());

  $scope.eat_food = function() {
    var add_to_date = $rootScope.addfood_date.getTime();
    var meals = $rootScope.user.meals[add_to_date];
    var meal_array = meals[$scope.added_to.meal];
    meal_array.push($scope.food);
    //check if User has a meal schedule instance else create
    // if (today.getTime()==add_to_date) {
    //   var meal_array = $rootScope.user.today_meal[$scope.added_to.meal];
    //   meal_array.push($scope.food);
    // } else if (today.getTime()>=add_to_date) {
    //   var meal_array = $rootScope.user.yesterday[$scope.added_to.meal];
    //   meal_array.push($scope.food);
    // } else {
    //   var meal_array = $rootScope.user.tomorrow[$scope.added_to.meal];
    //   meal_array.push($scope.food);
    // }
    var endDate = new Date(2015,10,7);
    if (endDate.getTime()===add_to_date && $scope.added_to.meal == 'lunch' && $scope.added_to.portion == '2' && $scope.food.name == "Fruit Salad") {
      $rootScope.task = 3
      $rootScope.stopTimer();
      // add_alert1();
    }
    else{
      add_alert();
    }
  };

  var add_alert = function() {
    var alertPopup = $ionicPopup.show({
      title: '<div class=" animated zoomIn"><div class="row"><div class="col" align="center"><h4>Added to diary!</h4></div></div><div class="row"><div class="col" align="center"><i class="ion-checkmark-round"></i></div></div></div>'
    });
    alertPopup.then(function(res) {
        $window.location.replace('#/tab/diary/addfood');
    });
    $timeout(function() {
      alertPopup.close(); //close the popup after 1.5 seconds
    }, 1500);
  };

  var add_alert1 = function() {
    var alertPopup = $ionicPopup.show({
      title: '<div class=" animated zoomIn"><div class="row"><div class="col" align="center"><h4>Task 3 Completed!</h4></div></div><div class="row"><div class="col" align="center"></div></div></div>'
    });
    alertPopup.then(function (res) {
        $window.location.replace('#/tab/diary/addfood');
    });
    $timeout(function() {
      alertPopup.close();
    }, 1500);
  };
})

.controller('StoreDetailCtrl', function($scope, $stateParams, FoodAndStores) {
  $scope.store = FoodAndStores.get_store($stateParams.storeId);
})

.controller('StoreFoodDetailCtrl', function($scope, $window, $rootScope, $stateParams, FoodAndStores,$ionicPopup, $timeout) {
  $scope.food = FoodAndStores.get_food($stateParams.foodId);
  $scope.added_to = {};
  $scope.added_to.meal = 'breakfast';
  $scope.added_to.portion = '1';
  $scope.added_to.date = new Date();

  $scope.eat_food = function() {
    var added_date = new Date($scope.added_to.date.getFullYear(),$scope.added_to.date.getMonth(),$scope.added_to.date.getDate());
    var meals = {
        breakfast:[],
        lunch:[],
        dinner: [],
        snack: []
      };
    if(!$rootScope.user.meals[added_date.getTime()]){
      $rootScope.user.meals[added_date.getTime()]=meals;
    }else{
      meals = $rootScope.user.meals[added_date.getTime()];
    }
    var meal_array = meals[$scope.added_to.meal];
    meal_array.push($scope.food);

    var endDate = new Date(2015,10,7);
    if (endDate.getTime()===added_date.getTime() && $scope.added_to.meal == 'dinner' && $scope.added_to.portion == '1' && $scope.food.name == "Eggs Benedict") {
      $rootScope.task = 1
      $rootScope.stopTimer();
      // add_alert();
      $rootScope.startTimer();
    }else{
      add_alert_default();
    }
  };

  var add_alert = function() {
    var alertPopup = $ionicPopup.show({
      title: '<div class=" animated zoomIn"><div class="row"><div class="col" align="center"><h4>Task 1 completed!</h4></div></div><div class="row"><div class="col" align="center"><i class="ion-checkmark-round"></i></div></div></div>'
    });
    alertPopup.then(function(res) {
      $window.location.replace("#/tab/diary");
    });
    $timeout(function() {
      alertPopup.close(); //close the popup after 1.5 seconds
    }, 1500);
  };
  var add_alert_default = function() {
    var alertPopup = $ionicPopup.show({
      title: '<div class=" animated zoomIn"><div class="row"><div class="col" align="center"><h4>Added to diary!</h4></div></div><div class="row"><div class="col" align="center"><i class="ion-checkmark-round"></i></div></div></div>'
    });
    alertPopup.then(function (res) {
        $window.location.replace("#/tab/diary");
    });
    $timeout(function() {
      alertPopup.close(); //close the popup after 1.5 seconds
    }, 1500);
  };

  // $scope.eat_food = function() {
  //   var today = new Date();
  //   var add_to_date = $scope.added_to.date
  //   var day_to_add = add_to_date.getDate();
  //   var mth_to_add = add_to_date.getMonth();
  //   //check if User has a meal schedule instance else create
  //   if (day_to_add == today.getDate() && mth_to_add == today.getMonth()) {
  //     var meal_array = $rootScope.user.today_meal[$scope.added_to.meal];
  //     meal_array.push($scope.food);
  //   } else if (day_to_add < today.getDate()) {
  //     var meal_array = $rootScope.user.yesterday[$scope.added_to.meal];
  //     meal_array.push($scope.food);
  //   } else {
  //     var meal_array = $rootScope.user.tomorrow[$scope.added_to.meal];
  //     meal_array.push($scope.food);
  //   }

  //   if (day_to_add == 7 && mth_to_add == 10 && $scope.added_to.meal == 'dinner' && $scope.added_to.portion == '1' && $scope.food.name == "Eggs Benedict") {
  //     $rootScope.task = 1
  //     $rootScope.stopTimer();
  //     add_alert();
  //     $rootScope.startTimer();
  //   }

  //   $window.location.replace('#/tab/diary');
  // };

  // var add_alert = function() {
  //   var alertPopup = $ionicPopup.show({
  //     title: '<div class=" animated zoomIn"><div class="row"><div class="col" align="center"><h4>Task 1 completed!</h4></div></div><div class="row"><div class="col" align="center"><i class="ion-checkmark-round"></i></div></div></div>'
  //   });
  //   alertPopup.then(function(res) {
  //     console.log('Added to diary');
  //   });
  //   $timeout(function() {
  //     alertPopup.close(); //close the popup after 1.5 seconds
  //     $window.location.replace("#/tab/diary");
  //   }, 1500);
  // };

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
      $rootScope.justLiked = false;
    });

    $scope.foods = FoodAndStores.foods();

    $scope.cardSwiped = function(foodDisliked,index) {
      $rootScope.justEntered = false;
      if(!$rootScope.justLiked){
        var food_disliked = {food:foodDisliked,liked:false}
        $rootScope.user.preference.push(food_disliked);
      }else{
        $rootScope.justLiked = false;
      }
      $scope.foods.splice(index, 1);
    };

})
.controller('SwipeCtrl', function($scope, $rootScope, $ionicSwipeCardDelegate) {
  $rootScope.justEntered = false;
  $scope.like = function(foodLiked, index) {
    $rootScope.justLiked = true;
    var food_liked = {food:foodLiked,liked:true}
    $rootScope.user.preference.push(food_liked);
    var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
    card.swipe();
  };
})

.controller('ExplorerHistoryCtrl', function($scope, $rootScope, FoodAndStores) {
  $scope.foods = FoodAndStores.foods();
  $scope.preference = $rootScope.user.preference;
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

.controller('HomeCtrl', function($scope, $window, $rootScope,$ionicPopup, $timeout) {
  $scope.goQuestions = function() {
    $window.location = '#/questions';
  }
  $scope.createorFindUser = function(name) {
    $rootScope.userdata.findOrCreateUser(name).then(function(foundUser) {
      if (foundUser != null) {
        $rootScope.user_id = foundUser.$id;
        $rootScope.user_name = foundUser.name;
        $window.location.replace('#/tab/diary');
      }
      else{
        add_alert();
      }
    });
  }
  var add_alert = function() {
    var alertPopup = $ionicPopup.show({
      title: '<div class=" animated zoomIn"><div class="row"><div class="col" align="center"><h4>Username is not valid</h4></div></div><div class="row"><div class="col" align="center"></div></div></div>'
    });
    alertPopup.then(function(res) {
      // console.log('Account is not valid');
    });
    $timeout(function() {
      alertPopup.close(); //close the popup after 1.5 seconds
      // $window.location.replace("#/tab/diary/addfood");
    }, 1500);
  };
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
