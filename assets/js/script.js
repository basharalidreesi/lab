function lock_scroll() {
	window.scrollTo(0, 0);
	document.body.classList.toggle("--lock_scroll");
	console.log("Body scrolling temporarily locked.");
}
