console.log("Title: " + document.title);

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
console.log("--vh set to " + `${vh}px` + ".");

window.addEventListener("load", loaded);
if (document.getElementById("arrow_wrapper") !== null) {
	window.addEventListener("load", arrowed);
	window.addEventListener("scroll", unarrowed, {passive: true});
}

// let url = window.location.href;
// let trailing_slash = url.endsWith("/");
// if (window.location.pathname != "/" && trailing_slash == true) {
//	let new_url = url.slice(0, -1);
//	window.location.replace(new_url);
// }

function loaded() {
	console.log("Reticulated splines.");
}

function arrowed() {
	document.getElementById("arrow_wrapper").style.display = "block";
	console.log("Arrowed.");
}

function unarrowed() {
	document.getElementById("arrow_wrapper").style.opacity = "0";
	console.log("Arrow hid.");
	window.removeEventListener("scroll", unarrowed, {passive: true});
	console.log("Scroll listener removed.");
	setTimeout(() => { document.getElementById("arrow_wrapper").remove() }, 1250);
	setTimeout(() => { console.log("Unarrowed.") }, 1250);
}

function toArrow(event) {
	var scroll_to = event.target;
	scroll_to.scrollIntoView({
		behavior: 'auto',
		block: 'center',
		inline: 'center'
	});
}

function lock_scroll() {
	// window.scrollTo(0, 0);
	// document.body.classList.toggle("--lock_scroll");
	// console.log("Body scrolling temporarily locked.");
}
