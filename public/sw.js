const CACHE_NAME = 'shopping-list-cache-v1';
const urlsToCache = [
  '/miha/',
  '/miha/index.html',
  '/miha/favicon.ico',
  '/miha/manifest.json',
  '/miha/assets/index-BKr9NTfI.css',
  '/miha/assets/index-B6VL9R0R.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache).catch(error => {
          console.error('Cache addAll error:', error);
          // Continue with installation even if caching fails
          return Promise.resolve();
        });
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).catch(error => {
          console.error('Fetch error:', error);
          // Return a default response or handle the error as needed
          return new Response('Offline');
        });
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
