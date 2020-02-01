'use strict';

var getRandom = function (parametr) {
  var randomNumber = Math.floor(Math.random() * Math.floor(parametr));
  return randomNumber;
};

var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArray = function (arr) {
  var randomArray = [];
  for (var i = 0; i < getRandom(arr.length); i++) {
    randomArray[i] = arr[getRandom(arr.length)];
  }
  return randomArray;
};
var NUMBER_OF_ANNO = 8;
var MAX_GUESTS = 200;
var MAX_ROOMS = 20;
var MAX_PRICE = 5000;
var TYPE_OF_PLASES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_OUT_TIMES = ['12:00', '13:00', '14:00'];
var ADVANTAGES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OFFSET = 20;
var map = document.querySelector('.map');
var pin = document.getElementById('pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

map.classList.remove('map--faded');

var getArrayOfAnnouncements = function () {
  var announcements = [];
  for (var i = 0; i < NUMBER_OF_ANNO; i++) {
    announcements[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': 'заголовок предложения',
        'address': getRandom(600) + ', ' + getRandom(600),
        'price': getRandom(MAX_PRICE),
        'type': TYPE_OF_PLASES[getRandom(TYPE_OF_PLASES.length)],
        'rooms': getRandom(MAX_ROOMS),
        'guests': getRandom(MAX_GUESTS),
        'checkin': CHECKIN_OUT_TIMES[getRandom(CHECKIN_OUT_TIMES.length)],
        'checkout': CHECKIN_OUT_TIMES[getRandom(CHECKIN_OUT_TIMES.length)],
        'features': getRandomArray(ADVANTAGES),
        'description': 'строка с описанием',
        'photos': getRandomArray(PHOTOS)
      },
      'location': {
        'x': getRandomIntInclusive(130, 630),
        'y': getRandomIntInclusive(130, 630),
      }
    };
  }
  return announcements;
};

var pinObject = getArrayOfAnnouncements();

for (var i = 0; i < pinObject.length; i++) {
  var pinCopy = pin.cloneNode(true);
  var avatar = pin.querySelector('img');
  var left = pinObject[i].location.x + OFFSET;
  var topT = pinObject[i].location.y + OFFSET;
  mapPins.appendChild(pinCopy);
  pinCopy.setAttribute('style', 'left: ' + left + 'px' + ';' + 'top: ' + topT + 'px');
  avatar.src = pinObject[i].author.avatar;
  avatar.alt = pinObject[i].offer.title;
}
