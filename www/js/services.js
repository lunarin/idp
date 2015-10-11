angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Eggs Benedict',
    lastText: 'Hatched',
    face: 'http://www.hatched.sg/wp-content/themes/hatched/images/logo.png'
  }, {
    id: 1,
    name: 'Eggs Benedict',
    lastText: 'Subway',
    face: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Subway_restaurant.svg/2000px-Subway_restaurant.svg.png'
  }, {
    id: 2,
    name: 'Eggs Benedict',
    lastText: 'McDonalds',
    face: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Mcdonalds-90s-logo.svg/2000px-Mcdonalds-90s-logo.svg.png'
  }, {
    id: 3,
    name: 'Eggs Benedict',
    lastText: 'KFC',
    face: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/1024px-KFC_logo.svg.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
