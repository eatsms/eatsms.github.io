var cacheName = 'pwa-v5.6';
var filesToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/icons/trol.png',
  '/icons/left.png',
  '/icons/l-144.png',
  '/icons/l-192.png',
  '/icons/l-512.png',
  '/icons/l-72.png',
  '/icons/l-96.png',
  '/sms-link.min.js'
];
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener('activate',  event => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );

  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
  event.respondWith(
    //     caches.match(event.request, {ignoreSearch:true}).then(response => {
    //       return response || fetch(event.request);
    //     })
    // Network falling back to the cache
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })

  );
});
