'use strict';

(function () {
  var card = document.getElementById('card').content.querySelector('.popup');
  var pinObject = window.getArrayOfAnnouncements;
  window.fillOutCard = function () {
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
})();
