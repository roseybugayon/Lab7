// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation
//   - One for activation ( check out MDN's clients.claim() for this step )
//   - One for fetch requests
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    'https://cse110lab6.herokuapp.com/entries',
    'https://roseybugayon.github.io/Lab7/',
    'https://roseybugayon.github.io/Lab7/scripts/router.js',
    'https://roseybugayon.github.io/Lab7/scripts/script.js',
    'https://roseybugayon.github.io/Lab7/sw.js',
    'https://roseybugayon.github.io/Lab7/settings.svg',
    'https://roseybugayon.github.io/Lab7/style.css',
    'https://rooseybugayon.github.io/Lab7/components/entry-page.js',
    'https://roseybugayon.github.io/Lab7/components/journal-entry.js',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
  });

  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((resp) => {
        return resp || fetch(event.request).then((response) => {
          return caches.open('v1').then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
});