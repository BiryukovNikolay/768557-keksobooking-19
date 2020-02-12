'use strict';

(function () {
  window.getArrayOfAnnouncements = (function () {
    var NUMBER_OF_ANNO = 8;
    var MAX_GUESTS = 200;
    var MAX_ROOMS = 20;
    var MAX_PRICE = 5000;
    var TYPE_OF_PLASES = ['palace', 'flat', 'house', 'bungalo'];
    var CHECKIN_OUT_TIMES = ['12:00', '13:00', '14:00'];
    var ADVANTAGES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
    var announcements = [];
    for (var i = 0; i < NUMBER_OF_ANNO; i++) {
      announcements.push({
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },
        'offer': {
          'title': 'заголовок предложения',
          'address': window.util.getRandom(600) + ', ' + window.util.getRandom(600),
          'price': window.util.getRandom(MAX_PRICE),
          'type': TYPE_OF_PLASES[window.util.getRandom(TYPE_OF_PLASES.length)],
          'rooms': window.util.getRandom(MAX_ROOMS),
          'guests': window.util.getRandom(MAX_GUESTS),
          'checkin': CHECKIN_OUT_TIMES[window.util.getRandom(CHECKIN_OUT_TIMES.length)],
          'checkout': CHECKIN_OUT_TIMES[window.util.getRandom(CHECKIN_OUT_TIMES.length)],
          'features': window.util.getRandomArray(ADVANTAGES),
          'description': 'строка с описанием',
          'photos': window.util.getRandomArray(PHOTOS)
        },
        'location': {
          'x': window.util.getRandomIntInclusive(130, 630),
          'y': window.util.getRandomIntInclusive(130, 630),
        }
      });
    }
    return announcements;
  })();
})();
