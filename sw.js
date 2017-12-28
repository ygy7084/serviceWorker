const CACHE_NAME = 'kiyeop-cache-v1';
const urlsToCache = [
	'/',
	'/index.js',
	'/index.css',
	'/index.html',
	'/img1.png',
	'/img2.png',
];
self.addEventListener('install', (event) => {
	console.log('install');
	console.log(event);
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then((cache) => {
				console.log('Opened cache');
				return cache.addAll(urlsToCache);
			})
	);
});
self.addEventListener('fetch', (event) => {
	console.log('fetch');
	console.log(event.request.url);
	event.respondWith(
		caches.match(event.request)
			.then((response) => {
					console.log(event.request.url, response);
					if (response) {
						return response;
					}
					const fetchRequest = event.request.clone();
					return fetch(fetchRequest)
						.then((res) => {
							console.log(res);
							if (!res || res.status !== 200 || res.type !== 'basic') {
								return res;
							}
							const resToCache = res.clone();
							caches.open(CACHE_NAME)
								.then((cache) => {
									console.log('cloned');
									cache.put(event.request, resToCache);
								});
							return res;
						});
			})
	);
});
