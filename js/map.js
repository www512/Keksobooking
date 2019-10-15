'use strict';

(function () {

  var PIN_Y_HEIGHT = 65;
  var PIN_TAIL = 15;
  var PIN_X_HALF = 25;
  var PIN_X_DEFAULT = 570;
  var PIN_Y_DEFAULT = 375;

  var dragBorder = {
    X: {
      MIN: 0,
      MAX: 1200
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
  };

  var map = document.querySelector('.map');
  var mapPin = document.querySelector('.map__pin');
  var mapPinX = mapPin.offsetLeft;
  var mapPinY = mapPin.offsetTop;
  var address = document.getElementById('address');
  var adForm = document.querySelector('.ad-form');
  var formDisabled = document.querySelector('.ad-form--disabled');
  var mapFilters = document.querySelector('.map__filters');

  var fieldset = document.querySelectorAll('.notice fieldset');
  var onFielsetDisabled = function () {
    fieldset.forEach(function (element) {
      element.setAttribute('disabled', 'disabled');
    });
  };
  onFielsetDisabled();

  var select = document.querySelectorAll('.map__filters select');
  var onSelectDisabled = function () {
    select.forEach(function (element) {
      element.setAttribute('disabled', 'disabled');
    });
  };
  onSelectDisabled();

  var input = document.querySelectorAll('.map__features input');
  var onInputDisabled = function () {
    input.forEach(function (element) {
      element.setAttribute('disabled', 'disabled');
    });
  };
  onInputDisabled();

  var onLoadSuccess = function (data) {
    window.form.activatePage(data);
  };

  var onLoadError = function (errorMessage) {
    window.network.errorWindow(errorMessage);
  };

  var pageActive = false;
  var onPageActive = function () {
    if (!pageActive) {
      map.classList.remove('map--faded');
      window.network.load(onLoadSuccess, onLoadError);
      fieldset.forEach(function (element) {
        element.removeAttribute('disabled', 'disabled');
      });
      select.forEach(function (element) {
        element.removeAttribute('disabled', 'disabled');
      });
      input.forEach(function (element) {
        element.removeAttribute('disabled', 'disabled');
      });
      formDisabled.classList.remove('ad-form--disabled');
      window.image.activate();
      pageActive = true;
    }
  };

  var resetAddress = function () {
    address.setAttribute('value', (mapPinX + PIN_X_HALF) + ', ' + (mapPinY + PIN_Y_HEIGHT));
  };
  resetAddress();

  mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinPosition = {
        x: mapPin.offsetLeft - shift.x,
        y: mapPin.offsetTop - shift.y
      };

      var borderMap = {
        LEFT: dragBorder.X.MIN,
        RIGHT: dragBorder.X.MAX - mapPin.offsetWidth,
        TOP: dragBorder.Y.MIN - mapPin.offsetHeight - PIN_TAIL,
        BOTTOM: dragBorder.Y.MAX - mapPin.offsetHeight - PIN_TAIL
      };

      if (pinPosition.x < borderMap.LEFT) {
        pinPosition.x = borderMap.LEFT;
      }
      if (pinPosition.x > borderMap.RIGHT) {
        pinPosition.x = borderMap.RIGHT;
      }
      if (pinPosition.y < borderMap.TOP) {
        pinPosition.y = borderMap.TOP;
      }
      if (pinPosition.y > borderMap.BOTTOM) {
        pinPosition.y = borderMap.BOTTOM;
      }

      mapPin.style.left = pinPosition.x + 'px';
      mapPin.style.top = pinPosition.y + 'px';

      address.setAttribute('value', (pinPosition.x + PIN_X_HALF) + ', ' + (pinPosition.y + PIN_Y_HEIGHT + PIN_TAIL));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      onPageActive();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var offPageActive = function () {
    mapPin.style.left = PIN_X_DEFAULT + 'px';
    mapPin.style.top = PIN_Y_DEFAULT + 'px';
    mapFilters.reset();
    adForm.reset();
    map.classList.add('map--faded');
    formDisabled.classList.add('ad-form--disabled');
    resetAddress();
    onSelectDisabled();
    onInputDisabled();
    onFielsetDisabled();
    window.image.remove();
    pageActive = false;
  };

  window.map = {
    offPageActive: offPageActive
  };
})();
