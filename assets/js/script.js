console.log("Title: " + document.title);

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
console.log("--vh set to " + `${vh}px` + ".");

// let url = window.location.href;
// let trailing_slash = url.endsWith("/");
// if (window.location.pathname != "/" && trailing_slash == true) {
//	let new_url = url.slice(0, -1);
//	window.location.replace(new_url);
// }

function lock_scroll() {
	window.scrollTo(0, 0);
	document.body.classList.toggle("--lock_scroll");
	console.log("Body scrolling temporarily locked.");
}

window.addEventListener("load", loaded);
function loaded() {
	console.log("Reticulated splines");
}
