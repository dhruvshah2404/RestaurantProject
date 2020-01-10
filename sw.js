const cacheName = 'version-1';
const allFile = [
  '/RestaurantProject/index.html',
  '/RestaurantProject/restaurant.html',
  '/RestaurantProject/js/main.js',
  '/RestaurantProject/js/dbhelper.js',
  '/RestaurantProject/js/restaurant_info.js',
  '/RestaurantProject/css/styles.css',
  '/RestaurantProject/data/restaurants.json',
  '/RestaurantProject/img/1.jpg',
  '/RestaurantProject/img/2.jpg',
  '/RestaurantProject/img/3.jpg',
  '/RestaurantProject/img/4.jpg',
  '/RestaurantProject/img/5.jpg',
  '/RestaurantProject/img/6.jpg',
  '/RestaurantProject/img/7.jpg',
  '/RestaurantProject/img/8.jpg',
  '/RestaurantProject/img/9.jpg',
  '/RestaurantProject/img/10.jpg',
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(allFile);
    })
      .then(() => self.skipWaiting())
  );
});
 
self.addEventListener('activate', event => {
  console.log('Activating new service worker...');

  const cacheWhitelist = [cacheName];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return resp || fetch(event.request).then((response) => {
        return caches.open(cacheName).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });  
      });
    })
  );
});