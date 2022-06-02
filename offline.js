var cacheName = "gamesCache";
var filesToCache = [
	"/",
	"/index.html",
	"/games/replit.com/@Koder09/Don'tTouchTheObstacles/fav/apple-touch-icon.png",
	"/games/replit.com/@Koder09/Don'tTouchTheObstacles/fav/favicon-32x32.png",
	"/games/replit.com/@Koder09/Don'tTouchTheObstacles/fav/favicon-16x16.png",
	"/games/replit.com/@Koder09/Don'tTouchTheObstacles/fav/site.webmanifest",
	"/games/replit.com/@Koder09/Don'tTouchTheObstacles/fav/favicon.ico",
	"/games/replit.com/@Koder09/Don'tTouchTheObstacles/fav/browserconfig.xml",
	"/games/replit.com/@Koder09/Don'tTouchTheObstacles/obs.html",
	"/games/replit.com/@Koder09/Don'tTouchTheObstacles/js/script.js",
	"/games/replit.com/@Koder09/Don'tTouchTheObstacles/css/style.css",
	"/games/replit.com/@Koder09/GuessTheLetter/letter.html",
	"/games/replit.com/@Koder09/GuessTheLetter/script.js",
	"/games/replit.com/@Koder09/GuessTheLetter/style.css",
	"/games/replit.com/@Koder09/GuessTheNumber/num.html",
	"/games/replit.com/@Koder09/GuessTheNumber/script.js",
	"/games/replit.com/@Koder09/GuessTheNumber/style.css",
	"/games/replit.com/@Koder09/PingPong/pong.html",
	"/games/replit.com/@Koder09/PingPong/script.js",
	"/games/replit.com/@Koder09/PingPong/style.css",
	"/games/replit.com/@Koder09/Don'tTouchTheObstacles/fontAwesome/all.js",
	"https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css",
	"https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js",
	"https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
];
self.addEventListener("install", function (e) {
	console.log("[ServiceWorker] Install");
	e.waitUntil(
		caches.open(cacheName).then(function (cache) {
			console.log(
				"[ServiceWorker] Caching app shell");
			return cache.addAll(filesToCache);
		})
	);
});
self.addEventListener("activate", event => {
	event.waitUntil(self.clients.claim());
	console.log("[ServiceWorker] Activate");
});
self.addEventListener("fetch", event => {
	console.log("[ServiceWorker] Fetch");
	event.respondWith(
		caches.match(event.request,
			{ ignoreSearch: true }).then(response => {
				return response || fetch(event.request);
			})
	);
});