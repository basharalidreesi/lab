console.log("Title: " + document.title);

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
console.log("--vh set to " + `${vh}px` + ".");

window.addEventListener("error", (event) => {
	console.log(event.error);
});

var debounce;
function debounced(func, delay) {
	clearTimeout(debounce);
	debounce = setTimeout(func, delay);
}

var oldheight = window.outerHeight;
function vhed() { // todo: increment vh
	var newheight = window.outerHeight;
	if (newheight !== oldheight) {
		oldheight = newheight;
		vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		console.log("--vh updated to " + `${vh}px` + ".");
	}
}

window.addEventListener("DOMContentLoaded", reticulated);
window.addEventListener("load", splined);

// let url = window.location.href;
// let trailing_slash = url.endsWith("/");
// if (window.location.pathname != "/" && trailing_slash == true) {
//	let new_url = url.slice(0, -1);
//	window.location.replace(new_url);
// }

function reticulated() {
	console.log("Reticulated...");
}

function splined() {
	console.log("...splines.");
}

function arrowed() {
	document.getElementById("arrow_wrapper").style.display = "block";
	console.log("Arrowed.");
}

function unarrowed() {
	document.getElementById("arrow_wrapper").style.opacity = "0";
	console.log("Arrow hid.");
	setTimeout(() => { document.getElementById("arrow_wrapper").remove() }, 1250);
	setTimeout(() => { console.log("Unarrowed.") }, 1250);
	document.getElementById("bodyalt").removeEventListener("scroll", unarrowed, {passive: true});
}

function toArrow(event) {
	var scroll_to = event.target;
	scroll_to.scrollIntoView({
		behavior: 'auto',
		block: 'center',
		inline: 'center'
	});
}

function filtered(event) {
	var tag = event.target;
	var tag_content = tag.textContent;
	var list_items = document.getElementsByClassName("list_page_item-list_page_item_tag_list");
	var all_tags = document.getElementsByClassName("list_page_item_tag_list-list_page_item_tag");
	for (var i = 0, length = list_items.length; i < length; i++) {
		if (list_items[i].textContent.indexOf(tag_content) != -1) {
			list_items[i].parentElement.classList.add("--highlighted_list_item");
		} else {
			list_items[i].parentElement.classList.remove("--highlighted_list_item");
		}
	}
	for (var j = 0, length = all_tags.length; j < length; j++) {
		if (all_tags[j].textContent.indexOf(tag_content) != -1) {
			all_tags[j].classList.add("--highlighted_tag");
			all_tags[j].children[0].style.display = "block";
			all_tags[j].children[0].style.opacity = "1";
		} else {
			all_tags[j].classList.remove("--highlighted_tag");
			all_tags[j].children[0].removeAttribute("style");
		}
	}
	console.log("Filtered " + tag_content.trim() + ".");
}

function unfiltered(event) {
	var list_items = document.getElementsByClassName("list_page_item-list_page_item_tag_list");
	var all_tags = document.getElementsByClassName("list_page_item_tag_list-list_page_item_tag");
	for (var i = 0, length = list_items.length; i < length; i++) {
		list_items[i].parentElement.classList.remove("--highlighted_list_item");
	}
	for (var j = 0, length = all_tags.length; j < length; j++) {
		all_tags[j].classList.remove("--highlighted_tag");
		all_tags[j].children[0].removeAttribute("style");
	}
	console.log("Unfiltered.");
}

var hasScrolled = false;
function redirected(event) {
	var customDeltaX;
	var customDeltaY;
	hasScrolled = true;
	if (event.deltaX != null || event.deltaY != null) {
		customDeltaX = event.deltaX;
		customDeltaY = event.deltaY;
	} else {
		customDeltaX = 0;
		customDeltaY = redirectY / -5;
	}
	if (window.innerWidth < document.getElementById("cascade_wrapper").scrollWidth) { // if cascade is overflowing
		if (window.innerHeight + document.getElementById("bodyalt").scrollTop == document.getElementById("bodyalt").scrollHeight) { // if at bottom of bodyalt
			if (customDeltaY > 0 || customDeltaX > 0) { // if going down or right
				event.preventDefault();
				document.getElementById("bodyalt").classList.add("--lock_scroll");
				document.getElementById("cascade_wrapper").scrollLeft += (customDeltaY + customDeltaX);
			} else if (customDeltaY < 0 || customDeltaX < 0) { // if going up or left
				if (document.getElementById("cascade_wrapper").scrollLeft <= 0) {
					document.getElementById("bodyalt").classList.remove("--lock_scroll");
				} else if (document.getElementById("cascade_wrapper").scrollLeft > 0) {
					document.getElementById("cascade_wrapper").scrollLeft += (customDeltaY + customDeltaX);
				}
			}
		} else if (window.innerHeight + document.getElementById("bodyalt").scrollTop > document.getElementById("bodyalt").scrollHeight) { // if below bottom of bodyalt
			// todo ?
		}
	}
}

function lock_scroll() {
	// window.scrollTo(0, 0);
	// document.body.classList.toggle("--lock_scroll");
	// console.log("Body scrolling temporarily locked.");
}
