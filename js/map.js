'use strict';
var ENTER_KEY = 'Enter';
var LEFT_BUTTON = 1;
var adFormHeader = document.querySelector('.ad-form-header');
var adFormElement = document.querySelectorAll('.ad-form__element');
var mapFilter = document.querySelectorAll('.map__filter');
var mapFeatures = document.querySelector('.map__features');
var mapPinMain = document.querySelector('.map__pin--main');
var onMapPinMain = function (evt) {
  if (evt.which === LEFT_BUTTON) {
    mapActivate();
  }
};


var mapActivate = function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
  window.util.removeDisabled(mapFeatures);
  window.util.removeDisabled(mapFilter);
  window.util.removeDisabled(adFormHeader);
  window.util.removeDisabled(adFormElement);
  window.pin.setPins();
  var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  mapPinMain.removeEventListener('mousedown', onMapPinMain);
  var onPinClick = function (pin, i) {
    pin.addEventListener('click', function () {
      var mapCard = map.querySelector('.map__card');
      if (mapCard) {
        map.removeChild(mapCard);
      }
      window.insertCard(i);
      mapCard = map.querySelector('.map__card');
      var cardClose = document.querySelector('.popup__close');
      cardClose.addEventListener('click', function () {
        window.util.setHidden(mapCard);
      });
      document.addEventListener('keydown', function () {
        window.util.isEscEvent('keydown', window.util.setHidden(mapCard));
      });
    });
  };
  for (var i = 0; i < pins.length; i++) {
    onPinClick(pins[i], i);
  }
  mapPinMain.removeEventListener('click', onPinClick);
  pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  console.log(pins);
};

window.form.setAdress();
window.util.setDisabled(mapFeatures);
window.util.setDisabled(mapFilter);
window.util.setDisabled(adFormHeader);
window.util.setDisabled(adFormElement);

mapPinMain.addEventListener('mousedown', onMapPinMain);

mapPinMain.addEventListener('mouseup', function (evt) {
  if (evt.which === LEFT_BUTTON) {
    window.form.setAdress();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    mapActivate();
    window.form.setAdress();
  }
});

window.insertCard = function (i) {
  var map = document.querySelector('.map');
  map.appendChild(window.fillOutCard(i));
};

window.form.validatingRoomGuest();
window.form.validatingTitle();
window.form.validatingPrice();
window.form.validatingType();
window.form.validatingCheckInOut();
