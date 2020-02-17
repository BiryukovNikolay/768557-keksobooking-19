'use strict';

var PIN_HEIGHT = 65;
var PIN_WIDTH = 65;
var PIN_POINTER_HEIGHT = 22;
var pinX = PIN_WIDTH / 2;
var pinY = PIN_HEIGHT + PIN_POINTER_HEIGHT;
var map = document.querySelector('.map');


// next task (in progress)
var ENTER_KEY = 'Enter';
var LEFT_BUTTON = 1;
var adFormHeader = document.querySelector('.ad-form-header');
var adFormElement = document.querySelectorAll('.ad-form__element');
var mapFilter = document.querySelectorAll('.map__filter');
var mapFeatures = document.querySelector('.map__features');
var mapPinMain = document.querySelector('.map__pin--main');
var adFormAddress = document.querySelector('.ad-form__address');
var mapActivate = function () {
  map.classList.remove('map--faded');
  window.util.removeDisabled(mapFeatures);
  window.util.removeDisabled(mapFilter);
  window.util.removeDisabled(adFormHeader);
  window.util.removeDisabled(adFormElement);
  window.setPins();
};
// функция ввода адреса
var setAdress = function () {
  var styleLocationY = mapPinMain.style.top;
  var mainLocationY = parseInt(styleLocationY, 10);
  var styleLocationX = mapPinMain.style.left;
  var mainLocationX = parseInt(styleLocationX, 10);
  adFormAddress.setAttribute('value', Math.round((mainLocationX + pinX)) + ', ' + Math.round((mainLocationY + pinY)));
};

setAdress();
window.util.setDisabled(mapFeatures);
window.util.setDisabled(mapFilter);
window.util.setDisabled(adFormHeader);
window.util.setDisabled(adFormElement);

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

var insertCard = function () {
  map.appendChild(window.fillOutCard());
};

insertCard();
window.form.validatingRoomGuest();
window.form.validatingTitle();
window.form.validatingPrice();
