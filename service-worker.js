var CACHE = 'cache-and-update';

self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');
  evt.waitUntil(precache());
});

self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.');
  evt.respondWith(fromCache(evt.request));
  evt.waitUntil(update(evt.request));
});

function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll([
  "./3rdpartylicenses.txt",
  "./fontawesome-webfont.674f50d287a8c48dc19b.eot",
  "./fontawesome-webfont.912ec66d7572ff821749.svg",
  "./fontawesome-webfont.af7ae505a9eed503f8b8.woff2",
  "./fontawesome-webfont.b06871f281fee6b241d6.ttf",
  "./fontawesome-webfont.fee66e712a8a08eef580.woff",
  "./index.html",
  "./inline.318b50c57b4eba3d437b.bundle.js",
  "./main.8a399109de524ca944ad.bundle.js",
  "./manifest.json",
  "./polyfills.bf95165a1d5098766b92.bundle.js",
  "./styles.a47a2984dd2d0fee3759.bundle.css",
  "./assets/homescreen-144x144.png",
  "./assets/homescreen.png"
]);
  });
}

function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}








/* var CACHE = 'PoolTime';

self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');
  evt.waitUntil(precache());
});

self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.');
  evt.respondWith(fromNetwork(evt.request, 5000)
    .catch(function () {
      return fromCache(evt.request);
    }));
});

function precache() {
  return caches.open(CACHE).then(function (cache) {
    return self.fetch('./file-to-cache.json?toto=' + Math.random())
      .then(res => { console.log(res); return res; })
      .then(res => res.json())
      .then(res => { console.log(res); return res; })
      .then(files => cache.addAll(files));
  });
}

function fromNetwork(request, timeout) {
  console.log('From network')
  return new Promise(function (fulfill, reject) {
    var timeoutId = setTimeout(reject, timeout);

    fetch(request).then(function (response) {
      console.log('succeed from network');
      clearTimeout(timeoutId);
      fulfill(response);
    }, reject);
  });
}

function fromCache(request) {
  console.log('failed from network');
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

*/
