'use strict';

(function () {

  var SUCCESS_CODE = 200;
  var TIMEOUT_SERVER = 10000;
  var ServerLink = {
    LOAD: 'https://www512.github.io/keksobooking/package',
    UPLOAD: 'https://javascript.pages.academy/keksobooking'
  };

  var ErrorText = {
    ERROR_LOAD: 'Произошла ошибка ',
    ERROR_SERVER: 'Ошибка соединения',
    ERROR_TIMEOUT: 'Сервер не отвечает больше чем '
  };

  var createXhr = function (method, url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_SERVER;
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError(ErrorText.ERROR_LOAD + xhr.status);
      }
    });
    xhr.addEventListener('error', function () {
      onError(ErrorText.ERROR_SERVER);
    });
    xhr.addEventListener('timeout', function () {
      onError(ErrorText.ERROR_TIMEOUT + xhr.timeout + 'мс');
    });
    xhr.open(method, url);
    return xhr;
  };

  var load = function (onSuccess, onError) {
    createXhr('GET', ServerLink.LOAD, onSuccess, onError).send();
  };

  var upload = function (onSuccess, onError, data) {
    createXhr('POST', ServerLink.UPLOAD, onSuccess, onError).send(data);
  };

  var onErrorEsc = function (evt) {
    window.utils.onEscDown(evt, closeError);
  };

  var onErrorClick = function () {
    closeError();
  };

  var closeError = function () {
    bodyMain.removeChild(message);
    document.removeEventListener('keydown', onErrorEsc);
    message.removeEventListener('click', onErrorClick);
    window.map.offPageActive();
  };

  var errorTemplate = document.getElementById('error').content.querySelector('.error');
  var bodyMain = document.querySelector('body');
  var message = errorTemplate.cloneNode(true);
  var errorWindow = function (errorMessage) {
    message.querySelector('.error__message').innerHTML = errorMessage;
    message.querySelector('.error__button').setAttribute('onclick', 'window.location.reload();');
    bodyMain.appendChild(message);
    document.addEventListener('keydown', onErrorEsc);
    message.addEventListener('click', onErrorClick);
  };

  window.network = {
    load: load,
    upload: upload,
    errorWindow: errorWindow
  };
})();
