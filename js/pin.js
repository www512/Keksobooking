'use strict';

(function () {

  var PINS_AMOUNT = 5;
  var pinTemplate = document.getElementById('pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');

  var renderPin = function (data) {
    var pin = pinTemplate.cloneNode(true);
    pin.style.left = data.location.x + 'px';
    pin.style.top = data.location.y + 'px';
    pin.querySelector('img').src = data.author.avatar;
    pin.querySelector('img').alt = data.offer.title;
    var onPinClick = function () {
      deleteActivePinClass();
      pin.classList.add('map__pin--active');
      window.card.create(data);
    };
    pin.addEventListener('click', onPinClick);
    return pin;
  };

  var createPins = function (pinsData) {
    var fragmentPin = document.createDocumentFragment();
    pinsData.forEach(function (it) {
      fragmentPin.appendChild(renderPin(it));
    });
    map.appendChild(fragmentPin);
  };

  var deleteActivePinClass = function () {
    var activePin = map.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var deletePins = function () {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPins.forEach(function (it) {
      it.remove();
    });
  };

  var reloadPin = function (it) {
    deletePins();
    createPins(it.slice(0, PINS_AMOUNT));
  };

  window.pin = {
    delete: deletePins,
    deleteActiveClass: deleteActivePinClass,
    reload: reloadPin
  };
})();
