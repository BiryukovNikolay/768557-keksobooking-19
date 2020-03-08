'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });
    xhr.addEventListener('error', function () {
      onError();
    });
    xhr.addEventListener('timeout', function () {
      onError();
    });
    xhr.timeout = 10000; // 10s
    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
