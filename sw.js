// const CACHE_NAME = 'kiyeop-cache-v1';
// const urlsToCache = [
// 	'/',
// 	'/index.js',
// 	'/index.css',
// 	'/index.html',
// 	'/img1.png',
// 	'/img2.png',
// ];
const CACHE_NAME = 'img-cache-v1';
const urlsToCache = [
	'/img1.png',
	'/img2.png',
];
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then((cache) => {
				console.log('Opened cache');
				return cache.addAll(urlsToCache);
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
					const fetchRequest = event.request.clone();
					return fetch(fetchRequest)
						.then((res) => {
							if (!res || res.status !== 200 || res.type !== 'basic') {
								return res;
							}
							const resToCache = res.clone();
							caches.open(CACHE_NAME)
								.then((cache) => {
									cache.put(event.request, resToCache);
								});
							return res;
						});
			})
	);
});
self.addEventListner('activate', (event) => {
	console.log('activate');
	const cacheWhiteList = ['img-cache-v1'];
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheWhiteList.indexOf(cacheName) < 0) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
})