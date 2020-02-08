'use strict';
var PIN_HEIGHT = 65;
var PIN_WIDTH = 65;
var PIN_POINTER_HEIGHT = 22;
var NUMBER_OF_ANNO = 8;
var MAX_GUESTS = 200;
var MAX_ROOMS = 20;
var MAX_PRICE = 5000;
var TYPE_OF_PLASES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_OUT_TIMES = ['12:00', '13:00', '14:00'];
var ADVANTAGES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OFFSET = 20;
var pinX = PIN_WIDTH / 2;
var pinY = PIN_HEIGHT + PIN_POINTER_HEIGHT;

var map = document.querySelector('.map');
var pin = document.getElementById('pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

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

var getArrayOfAnnouncements = function () {
  var announcements = [];
  for (var i = 0; i < NUMBER_OF_ANNO; i++) {
    announcements.push({
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
    });
  }
  return announcements;
};

var pinObject = getArrayOfAnnouncements();

var setPins = function () {
  for (var i = 0; i < pinObject.length; i++) {
    var pinCopy = pin.cloneNode(true);
    var avatar = pin.querySelector('img');
    var Left = pinObject[i].location.x + OFFSET;
    var Top = pinObject[i].location.y + OFFSET;
    pinCopy.style.left = Left + 'px';
    pinCopy.style.top = Top + 'px';
    avatar.src = pinObject[i].author.avatar;
    avatar.alt = pinObject[i].offer.title;
    mapPins.appendChild(pinCopy);
  }
};

// next task (in progress)
var ENTER_KEY = 'Enter';
var LEFT_BUTTON = 1;
var adFormHeader = document.querySelector('.ad-form-header');
var adFormElement = document.querySelectorAll('.ad-form__element');
var mapFilter = document.querySelectorAll('.map__filter');
var mapFeatures = document.querySelector('.map__features');
var mapPinMain = document.querySelector('.map__pin--main');
var adFormAddress = document.querySelector('.ad-form__address');
var roomNumber = document.getElementById('room_number');
var guestNumber = document.getElementById('capacity');

var setDisabled = function (arr) {
  for (var t = 0; t < arr.length; t++) {
    arr[t].setAttribute('disabled', 'disabled');
  }
};
var removeDisabled = function (arr) {
  for (var t = 0; t < arr.length; t++) {
    arr[t].removeAttribute('disabled');
  }
};
var mapActivate = function () {
  map.classList.remove('map--faded');
  removeDisabled(mapFeatures);
  removeDisabled(mapFilter);
  removeDisabled(adFormHeader);
  removeDisabled(adFormElement);
  setPins();
};
// функция ввода адреса
var setAdress = function () {
  var styleLocationY = mapPinMain.style.top;
  var mainLocationY = parseInt(styleLocationY, 10);
  var styleLocationX = mapPinMain.style.left;
  var mainLocationX = parseInt(styleLocationX, 10);
  adFormAddress.setAttribute('value', Math.round((mainLocationX + pinX)) + ', ' + Math.round((mainLocationY + pinY)));
};

// Функция влидации полей комнаты и гости.
var roomOptions = roomNumber.querySelectorAll('.add-form__option');
var guestOptions = guestNumber.querySelectorAll('.add-form__option');
roomNumber.addEventListener('change', function (evt) {
  var target = evt.target;
  var getDisabledGuest = function (option) {
    for (var i = 0; i < guestOptions.length; i++) {
      guestOptions[i].removeAttribute('disabled', true);
      if (guestOptions[i].value !== option) {
        guestOptions[i].setAttribute('disabled', true);
        if (guestOptions[i].selected) {
          target.setCustomValidity('Вариант размещение не более 1го гостя');
        }
      }
    }
  };
  getDisabledGuest(2);
  if (target) {
    for (var i = 0; i < roomOptions.length; i++) {
      var roomOption = roomOptions[i];
      var roomSelected = roomOption.selected;
      if (roomSelected) {
        if (roomOption.value === '1') {
          getDisabledGuest('1');
        } else if (roomOption.value === '2') {
          getDisabledGuest('2');
        } else if (roomOption.value === '3') {
          getDisabledGuest('3');
        } else if (roomOption.value === '100') {
          getDisabledGuest('0');
        }
      }
    }
  }
});

setAdress();
setDisabled(mapFeatures);
setDisabled(mapFilter);
setDisabled(adFormHeader);
setDisabled(adFormElement);

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.which === LEFT_BUTTON) {
    mapActivate();
    setAdress();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    mapActivate();
    setAdress();
  }
});

var card = document.getElementById('card').content.querySelector('.popup');

var fillOutCard = function () {
  var cardCopy = card.cloneNode(true);
  cardCopy.querySelector('.popup__title').textContent = pinObject[1].offer.title;
  cardCopy.querySelector('.popup__text--address').textContent = pinObject[1].offer.address;

  cardCopy.querySelector('.popup__text--price').textContent = pinObject[1].offer.price + ' ₽/ночь';
  if (pinObject[1].offer.type === 'flat') {
    cardCopy.querySelector('.popup__type').textContent = 'Квартира';
  } else if (pinObject[1].offer.type === 'bungalo') {
    cardCopy.querySelector('.popup__type').textContent = 'Бунгало';
  } else if (pinObject[1].offer.type === 'house') {
    cardCopy.querySelector('.popup__type').textContent = 'Дом';
  } else if (pinObject[1].offer.type === 'palace') {
    cardCopy.querySelector('.popup__type').textContent = 'Дворец';
  }
  cardCopy.querySelector('.popup__text--capacity').textContent = pinObject[1].offer.rooms + ' комнаты для ' + pinObject[1].offer.guests + ' гостей';
  cardCopy.querySelector('.popup__text--time').textContent = 'Заезд после ' + pinObject[1].offer.checkin + ', выезд до ' + pinObject[1].offer.checkout;
  var featuresList = cardCopy.querySelector('.popup__features');
  var featuresCard = cardCopy.querySelectorAll('.popup__feature');
  while (featuresList.firstChild) {
    featuresList.removeChild(featuresList.firstChild);
  }
  for (var j = 0; j < pinObject[1].offer.features.length; j++) {
    var featureClass = pinObject[1].offer.features[j];
    for (var k = 0; k < featuresCard.length; k++) {
      var featureCard = featuresCard[k];
      if (featureCard.classList.contains('popup__feature--' + featureClass)) {
        featuresList.appendChild(featureCard);
      }
    }
  }
  cardCopy.querySelector('.popup__description').textContent = pinObject[1].offer.description;
  for (var l = 0; l < pinObject[1].offer.photos.length; l++) {
    var photoBlock = cardCopy.querySelector('.popup__photos');
    var images = cardCopy.querySelector('.popup__photo');
    images.src = pinObject[1].offer.photos[l];
    var img = images.cloneNode(true);
    img.src = pinObject[1].offer.photos[l];
    photoBlock.appendChild(img);
  }
  cardCopy.querySelector('.popup__avatar').src = pinObject[1].author.avatar;
  return cardCopy;
};

var insertCard = function () {
  map.appendChild(fillOutCard());
};

insertCard();
