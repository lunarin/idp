angular.module('starter.services', [])

.factory('FoodAndStores', function () {
    // Might use a resource here that returns a JSON array

    var food_stores = [{
        id: 0,
        name: 'Hatched',
        logo: 'http://www.hatched.sg/wp-content/themes/hatched/images/logo.png',
        distance: 6
    }, {
        id: 1,
        name: 'Subway',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Subway_restaurant.svg/2000px-Subway_restaurant.svg.png',
        distance: 1
    }, {
        id: 2,
        name: 'McDonalds',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Mcdonalds-90s-logo.svg/2000px-Mcdonalds-90s-logo.svg.png',
        distance: 8
    }, {
        id: 3,
        name: 'KFC',
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/1024px-KFC_logo.svg.png',
        distance: 3
    }, {
        id: 4,
        name: 'Astons',
        logo: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTI-cIfFmST7xjzsQXrBQ6VjRHPhLwSDD2n7m7TTGuqfl3xQwKACg',
        distance: 2
    }];

    var foods = [{
        id: 0,
        name: 'Egg Benedict',
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
        name: 'Egg Benedict',
        store_id: 4,
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
        store_id: 3,
        foodImage: 'https://d2gn4xht817m0g.cloudfront.net/p/product_screenshots/images/original/000/311/491/311491-9e5fd3b26334da57245ef76155d09749caf36f1f.jpg?1397664111',
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
        store_id: 2,
        foodImage: 'http://steamykitchen.com/wp-content/uploads/2009/08/hainanese-chicken-83.jpg',
        nutrient_values: {
            calories: 650,
            fat: 18,
            carbs: 67,
            protein: 45
        },
        price: 7
    }, {
        id: 4,
        name: 'Laska',
        store_id: 1,
        foodImage: 'http://rasamalaysia.com/uploaded_images/laksa-recipe/laksa5.jpg',
        nutrient_values: {
            calories: 255,
            fat: 6,
            carbs: 15,
            protein: 18
        },
        price: 4
    }];
    
    return {
        stores: function () {
            return food_stores;
        },

        foods: function () {
            return foods;
        },

        /*remove: function(chat) {
          chats.splice(chats.indexOf(chat), 1);
        },*/

        get_store: function (storeId) {
            for (var i = 0; i < food_stores.length; i++) {
                if (food_stores[i].id === parseInt(storeId)) {
                    return food_stores[i];
                }
            }
            return null;
        },

        get_food: function (foodId) {
            for (var i = 0; i < foods.length; i++) {
                if (foods[i].id === parseInt(foodId)) {
                    return foods[i];
                }
            }
            return null;
        }
        
    };
});
