'use strict';
(function () {
  var roomNumber = document.getElementById('room_number');
  var guestNumber = document.getElementById('capacity');

  // Функция влидации полей комнаты и гости.
  window.validatingRoomGuest = function () {
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
})();
