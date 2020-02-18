'use strict';
// Функция влидации полей комнаты и гости.
var PIN_HEIGHT = 65;
var PIN_WIDTH = 65;
var PIN_POINTER_HEIGHT = 22;
var pinX = PIN_WIDTH / 2;
var pinY = PIN_HEIGHT + PIN_POINTER_HEIGHT;
var roomNumber = document.getElementById('room_number');
var guestNumber = document.getElementById('capacity');
var priceInput = document.getElementById('price');
var typeInput = document.getElementById('type');
var timeIn = document.getElementById('timein');
var timeOut = document.getElementById('timeout');
var adFormAddress = document.querySelector('.ad-form__address');
var mapPinMain = document.querySelector('.map__pin--main');

var setAdress = function () {
  adFormAddress.setAttribute('disabled', true);
  var styleLocationY = mapPinMain.style.top;
  var mainLocationY = parseInt(styleLocationY, 10);
  var styleLocationX = mapPinMain.style.left;
  var mainLocationX = parseInt(styleLocationX, 10);
  adFormAddress.setAttribute('value', Math.round((mainLocationX + pinX)) + ', ' + Math.round((mainLocationY + pinY)));
};

var validatingRoomGuest = function () {
  var guestOptions = guestNumber.querySelectorAll('.add-form__option');
  roomNumber.addEventListener('change', function (evt) {
    var target = evt.target;
    var roomOptionSelected = roomNumber.options.selectedIndex;
    var guestOptionSelected = guestNumber.options.selectedIndex;
    var roomNumberValue = roomNumber.options[roomOptionSelected].value;
    var guestNumberValue = guestNumber.options[guestOptionSelected].value;
    if (target) {
      for (var i = 0; i < guestOptions.length; i++) {
        guestOptions[i].removeAttribute('disabled', true);
        if (guestOptions[i].value > roomNumberValue) {
          guestOptions[i].setAttribute('disabled', true);
        }
      }
      if (roomNumberValue < guestNumberValue) {
        target.setCustomValidity('Неподходящее количество комнат');
      } else {
        target.setCustomValidity('');
      }
    }
  });
};

var validatingTitle = function () {
  var titleInput = document.getElementById('title');
  titleInput.addEventListener('invalid', function () {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Заголовок должно состоять минимум из 30-ти символов');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Имя не должно превышать 100 символов');
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }
  });
};

var validatingPrice = function () {
  priceInput.addEventListener('invalid', function () {
    var priceInputMin = priceInput.getAttribute('min');
    var priceInputMax = priceInput.getAttribute('max');
    if (priceInput.validity.rangeOverflow) {
      priceInput.setCustomValidity('Ценник не может быть больше ' + priceInputMax);
    } else if (priceInput.validity.valueMissing) {
      priceInput.setCustomValidity('Укажите стоимость');
    } else if (priceInput.validity.rangeUnderflow) {
      priceInput.setCustomValidity('Ценник не может быть ниже ' + priceInputMin);
    } else {
      priceInput.setCustomValidity('');
    }
  });
};

var validatingType = function () {
  var MIN_PRICE_BUNGALO = 0;
  var MIN_PRICE_FLAT = 1000;
  var MIN_PRICE_HOUSE = 5000;
  var MIN_PRICE_PALACE = 10000;

  typeInput.addEventListener('change', function () {
    var typeInputSelected = typeInput.options.selectedIndex;
    var typeInputValue = typeInput.options[typeInputSelected].value;
    var setPriceAttribute = function (value) {
      priceInput.min = value;
      priceInput.placeholder = value;
    };
    if (typeInputValue === 'flat') {
      setPriceAttribute(MIN_PRICE_FLAT);
    } else if (typeInputValue === 'house') {
      setPriceAttribute(MIN_PRICE_HOUSE);
    } else if (typeInputValue === 'palace') {
      setPriceAttribute(MIN_PRICE_PALACE);
    } else if (typeInputValue === 'bungalo') {
      setPriceAttribute(MIN_PRICE_BUNGALO);
    }
  });
};

var validatingCheckInOut = function () {
  timeOut.addEventListener('change', function () {
    var timeOutInputSelected = timeOut.options.selectedIndex;
    var timeOutInputValue = timeOut.options[timeOutInputSelected].value;
    for (var i = 0; i < timeIn.options.length; i++) {
      timeIn.options[i].removeAttribute('selected');
      if (timeIn.options[i].value === timeOutInputValue) {
        timeIn.options[i].setAttribute('selected', true);
      }
    }
  });
  timeIn.addEventListener('change', function () {
    var timeInInputSelected = timeIn.options.selectedIndex;
    var timeInInputValue = timeIn.options[timeInInputSelected].value;
    for (var i = 0; i < timeOut.options.length; i++) {
      timeOut.options[i].removeAttribute('selected');
      if (timeOut.options[i].value === timeInInputValue) {
        timeOut.options[i].setAttribute('selected', true);
      }
    }
  });
};

window.form = {
  validatingCheckInOut: validatingCheckInOut,
  validatingRoomGuest: validatingRoomGuest,
  validatingTitle: validatingTitle,
  validatingPrice: validatingPrice,
  validatingType: validatingType,
  setAdress: setAdress
};
