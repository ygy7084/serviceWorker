console.log('index File Loaded');
const timerDOM = document.getElementById('timer');
function Timer() {
	timerDOM.innerHTML = new Date().toLocaleString();
}
setInterval(Timer, 1000);

function registerServiceWorker() {
	console.log('registerServiceWorker');
	if ('serviceWorker' in navigator) {
		console.log('found serviceWorker');
		window.addEventListener('load', () => {
			navigator.serviceWorker.register('/sw.js')
				.then((reg) => {
					console.log('reg success');
				})
				.catch((error) => {
					console.log('reg error', error);
				});
		});
	}
}
registerServiceWorker();
