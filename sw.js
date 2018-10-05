var cacheName = 'pwa-v1';
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
