'use strict';

(function () {
  var card = document.getElementById('card').content.querySelector('.popup');
  var pinObject = window.getArrayOfAnnouncements;
  window.fillOutCard = function (i) {
    var cardCopy = card.cloneNode(true);
    cardCopy.querySelector('.popup__title').textContent = pinObject[i].offer.title;
    cardCopy.querySelector('.popup__text--address').textContent = pinObject[i].offer.address;

    cardCopy.querySelector('.popup__text--price').textContent = pinObject[i].offer.price + ' ₽/ночь';
    if (pinObject[i].offer.type === 'flat') {
      cardCopy.querySelector('.popup__type').textContent = 'Квартира';
    } else if (pinObject[i].offer.type === 'bungalo') {
      cardCopy.querySelector('.popup__type').textContent = 'Бунгало';
    } else if (pinObject[i].offer.type === 'house') {
      cardCopy.querySelector('.popup__type').textContent = 'Дом';
    } else if (pinObject[i].offer.type === 'palace') {
      cardCopy.querySelector('.popup__type').textContent = 'Дворец';
    }
    cardCopy.querySelector('.popup__text--capacity').textContent = pinObject[i].offer.rooms + ' комнаты для ' + pinObject[i].offer.guests + ' гостей';
    cardCopy.querySelector('.popup__text--time').textContent = 'Заезд после ' + pinObject[i].offer.checkin + ', выезд до ' + pinObject[i].offer.checkout;
    var featuresList = cardCopy.querySelector('.popup__features');
    var featuresCard = cardCopy.querySelectorAll('.popup__feature');
    while (featuresList.firstChild) {
      featuresList.removeChild(featuresList.firstChild);
    }
    for (var j = 0; j < pinObject[i].offer.features.length; j++) {
      var featureClass = pinObject[i].offer.features[j];
      for (var k = 0; k < featuresCard.length; k++) {
        var featureCard = featuresCard[k];
        if (featureCard.classList.contains('popup__feature--' + featureClass)) {
          featuresList.appendChild(featureCard);
        }
      }
    }
    cardCopy.querySelector('.popup__description').textContent = pinObject[1].offer.description;
    for (var l = 0; l < pinObject[i].offer.photos.length; l++) {
      var photoBlock = cardCopy.querySelector('.popup__photos');
      var images = cardCopy.querySelector('.popup__photo');
      images.src = pinObject[i].offer.photos[l];
      var img = images.cloneNode(true);
      img.src = pinObject[i].offer.photos[l];
      photoBlock.appendChild(img);
    }
    cardCopy.querySelector('.popup__avatar').src = pinObject[i].author.avatar;
    return cardCopy;
  };
})();
