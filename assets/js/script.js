console.log("Title: " + document.title);

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
console.log("--vh set to " + `${vh}px` + ".");

function lock_scroll() {
	window.scrollTo(0, 0);
	document.body.classList.toggle("--lock_scroll");
	console.log("Body scrolling temporarily locked.");
}
