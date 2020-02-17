'use strict';
// Функция влидации полей комнаты и гости.

var roomNumber = document.getElementById('room_number');
var guestNumber = document.getElementById('capacity');

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
      titleInput.setCustomValidity('Имя должно состоять минимум из 30-ти символов');
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
  var priceInput = document.getElementById('price');
  priceInput.addEventListener('invalid', function () {
    if (priceInput.validity.rangeOverflow) {
      priceInput.setCustomValidity('Ценник не может быть больше 1 000 000');
    } else if (priceInput.validity.valueMissing) {
      priceInput.setCustomValidity('Укажите стоимость');
    } else {
      priceInput.setCustomValidity('');
    }
  });
};

window.form = {
  validatingRoomGuest: validatingRoomGuest,
  validatingTitle: validatingTitle,
  validatingPrice: validatingPrice
};

