'use strict';
(function () {
  var housingType = document.getElementById('housing-type');
  var housingTypeSelected = housingType.options.selectedIndex;
  var housingTypeValue = housingType.options[housingTypeSelected].value;

  var housingPrice = document.getElementById('housing-price');
  var housingPriceSelected = housingPrice.options.selectedIndex;
  var housingPriceValue = housingPrice.options[housingPriceSelected].value;

  var housingRooms = document.getElementById('housing-rooms');
  var housingRoomsSelected = housingRooms.options.selectedIndex;
  var housingRoomsValue = housingRooms.options[housingRoomsSelected].value;

  var housingGuests = document.getElementById('housing-guests');
  var housingGuestsSelected = housingGuests.options.selectedIndex;
  var housingGuestsValue = housingGuests.options[housingGuestsSelected].value;

  // var housingFeatures = document.getElementById('housing-features');

  var cards = [];
  var samePins = function () {
    var onSuccess = function (data) {
      cards = data;
      window.pin.setPins(cards);
    };
    window.load(onSuccess);
  };

  var updatePins = function () {

    var sameType = cards.filter(function (it) {
      if (housingTypeValue === 'any') {
        return cards;
      }
      return it.offer.type === housingTypeValue;
    });

    var samePrice = sameType.filter(function (it) {
      if (housingPriceValue === 'low') {
        return it.offer.price < 10000;
      } else if (housingPriceValue === 'high') {
        return it.offer.price > 50000;
      } else if (housingPriceValue === 'middle') {
        return (it.offer.price > 10000 && it.offer.price < 50000);
      }
      return sameType;
    });


    var sameRooms = samePrice.filter(function (it) {
      if (housingRoomsValue !== 'any') {

        return it.offer.rooms === housingRoomsValue;
      }
      return samePrice;
    });

    var sameGuests = sameRooms.filter(function (it) {
      if (housingGuestsValue === 'any') {
        return sameRooms;
      }
      return it.offer.guests === housingGuestsValue;
    });

    var filteredCards = sameGuests;
    window.pin.setPins(filteredCards);
  };

  var updateType = function () {
    housingType.addEventListener('change', function () {
      housingTypeSelected = housingType.options.selectedIndex;
      housingTypeValue = housingType.options[housingTypeSelected].value;
      updatePins();
    });
  };

  var updatePrice = function () {
    housingPrice.addEventListener('change', function () {
      housingPriceSelected = housingPrice.options.selectedIndex;
      housingPriceValue = housingPrice.options[housingPriceSelected].value;
      updatePins();
    });
  };

  var updateRooms = function () {
    housingRooms.addEventListener('change', function () {
      housingRoomsSelected = housingRooms.options.selectedIndex;
      housingRoomsValue = housingRooms.options[housingRoomsSelected].value;
      updatePins();
    });
  };

  var updateGuests = function () {
    housingGuests.addEventListener('change', function () {
      housingGuestsSelected = housingGuests.options.selectedIndex;
      housingGuestsValue = housingGuests.options[housingGuestsSelected].value;
      updatePins();
    });
  };

  var updateFilter = function () {
    updateType();
    updatePrice();
    updateRooms();
    updateGuests();
  };

  window.filter = {
    updateFilter: updateFilter,
    samePins: samePins
  };
})();
