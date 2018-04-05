const CACHE = 'cache-and-update';

self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');
  evt.waitUntil(preCache());
});

self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.');
  evt.respondWith(fromCache(evt.request));
  evt.waitUntil(update(evt.request));
});

function preCache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll(['insertFiles']);
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
