const CACHE_NAME = 'deudas-cache-v4'; // Cambiamos de v3 a v4
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Instalación: limpia cachés antiguos
self.addEventListener('install', event => {
  self.skipWaiting(); // Fuerza a que el nuevo service worker tome el control
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación: elimina versiones viejas de la memoria
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
