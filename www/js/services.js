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
    }, {
        id: 5,
        name: 'Koufu',
        logo: 'http://fraserscentrepointmalls.com/images/koufu.jpg',
        distance: 1
    }, {
        id: 5,
        name: 'NamNam',
        logo: 'img/namnam.png',
        distance: 2
    }];

    var foods = [{
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

    return {
        stores: function () {
            return food_stores.sort(function (store_a, store_b) {
                if (store_a.distance > store_b.distance) {
                    return 1;
                }
                if (store_a.distance < store_b.distance) {
                    return -1;
                }
                return store_a.name.localeCompare(store_b.name);
            });
        },

        foods: function () {
            return foods;
        },

        /*remove: function(chat) {
          chats.splice(chats.indexOf(chat), 1);
        },*/

        get_store: function (storeId) {
            var store = {};
            for (var j = 0; j < food_stores.length; j++) {
                if (food_stores[j].id == storeId) {
                    store = food_stores[j];
                }
            }
            var menu = [];
            for (var i = 0; i < foods.length; i++) {
                if (foods[i].store_id == storeId) {
                    menu.push(foods[i]);
                }
            }
            store.menu = menu;
            return store;
        },

        get_food: function (foodId) {
            var food = {};
            for (var i = 0; i < foods.length; i++) {
                if (foods[i].id == foodId) {
                    food = foods[i];
                }
            }
            for (var j = 0; j < food_stores.length; j++) {
                if (food_stores[j].id == food.store_id) {
                    food.store = food_stores[j];
                }
            }
            return food;
        }
    };
})

.factory('Camera', ['$q', function ($q) {

    return {
        getPicture: function (options) {
            var q = $q.defer();

            navigator.camera.getPicture(function (result) {
                q.resolve(result);
            }, function (err) {
                q.reject(err);
            }, options);

            return q.promise;
        }
    }
}])

.factory('Users', function () {

    var users = [
        {
            id: 0,
            name: 'Johnny See Bae Fit',
            gender:'Male',
            height: 1.73,
            weight: 78,
            password: 'here',
            today_meal: {
                breakfast:[],
                lunch:[],
                dinner: [],
                snack: []
            },
            yesterday: {
                breakfast: [],
                lunch: [],
                dinner: [],
                snack: []
            },
            tomorrow: {
                breakfast: [],
                lunch: [],
                dinner: [],
                snack: []
            },
            preference: {
                like: [],
                dislike:[]
            }
        }];

    return {
        users: function () {
            return users.sort(function (user_a, user_b) {
                return user_a.name.localeCompare(user_b.name);
            });
        },

        remove: function(user) {
            users.splice(users.indexOf(user), 1);
        },

        get_user: function (userId) {
            var user = {};
            for (var j = 0; j < users.length; j++) {
                if (users[j].id == userId) {
                    user = users[j];
                }
            }
            return user;
        }
    };
})
;
