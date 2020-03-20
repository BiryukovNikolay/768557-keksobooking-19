'use strict';

(function () {
  window.xhr = function (URL, onSuccess, onError, method, data) {
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
    xhr.open(method, URL);
    xhr.send(data);
  };
})();
