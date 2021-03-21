"use strict";

// begin
// global purpose functions
	let t;
	function debounce(fn, delay) {
		clearTimeout(t);
		return t = setTimeout(fn, delay);
	}

// begin
// general purpose functions

	function checkUrl(redirect) {
		if (redirect) {
			let unchecked_url = window.location.href;
			let checked_url = unchecked_url.replace(/^(.+?)\/*?$/, "$1");
			if (checked_url !== unchecked_url && !home) {
				window.location.replace(checked_url);
			}
		}
	}

	function setVh() {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		console.log("--vh set to " + `${vh}px` + ".");
	}

	let vh_pre = window.outerHeight;
	function updateVh() {
		let vh = window.innerHeight * 0.01;
		let vh_post = window.outerHeight;
		if (vh_post != vh_pre) {
			vh_pre = vh_post;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
			console.log("--vh updated to " + `${vh}px` + ".");
		}
	}

	function reticulateSplines() {
		window.addEventListener("DOMContentLoaded", () => {
			console.log("Reticulated...");
		});
		window.addEventListener("load", () => {
			console.log("...splines");
		});
	}

	function initialListen() {
		window.addEventListener("load", header);
		window.addEventListener("resize", () => {
			debounce(updateVh, 350);
		});
		if (central) {
			window.addEventListener("scroll", hasScrolled, {passive: false});
			window.addEventListener("DOMContentLoaded", (event) => {
				document.getElementById("arrow_wrapper").addEventListener("click", (event) => {
					toArrow(event);
					unarrow();
				});
			});
			window.addEventListener("load", () => {
				if (!has_scrolled) {
					arrow();
					if(cascade) {
						document.getElementById("bodyalt").addEventListener("scroll", unarrow, {passive:true});
					} else {
						window.addEventListener("scroll", unarrow, {passive:true});
					}
				} else {
					document.getElementById("arrow_wrapper").remove();
					console.log("Dearrowed.");
				}
			});
		}
		if (contact) {
			window.addEventListener("DOMContentLoaded", () => {
				const textareas = document.querySelectorAll("textarea");
				textareas.forEach((textarea) => {
					textarea.addEventListener("input", () => {
						textarea.style.height = "calc(var(--quadruple) * 2)";
						textarea.style.height = textarea.scrollHeight + "px";
					});
				});
			});
		}
		if (list) {
			window.addEventListener("DOMContentLoaded", () => {
				const tags = document.querySelectorAll(".list_item-item_tag");
				const untags = document.querySelectorAll(".--untag");
				tags.forEach((tag) => {
					tag.addEventListener("click", filter);
				});
				untags.forEach((untag) => {
					untag.addEventListener("click", unfilter);
				});
			});
		}
		if (cascade) {
			window.addEventListener("DOMContentLoaded", (event) => {
				redirectWheel();
				redirectTouch();
			});
		}
	}

// begin
// init

	function initialise() {
		checkUrl(true);
		setVh();
		reticulateSplines();
		initialListen();
		console.log(document.title);
		window.addEventListener("beforeunload", () => {
			window.scrollTo(0, 0);
		});
	}

	initialise();

// begin
// special purpose functions

	function header() {
		const header_container = document.getElementById("header_container");
		const header_graphic = document.getElementById("header_graphic");
		let x = (Math.floor(Math.random() * headers.length));
		let random_header = (headers[x]); // array initialised in script.js.html
		header_graphic.src = random_header;
		console.log("Headered " + random_header + " from a total number of " + headers.length + " header graphics.");
		if(!black) {
			let extension = random_header.split(".").pop();
			if (extension === "svg") {
				SVGInject(header_graphic);
				console.log("SVG header injected.");
			} else {
				console.log("No SVG header detected. Injection has not occured.");
			}
		} else {
			console.log("SVG header injection unnecessary.");
		}
		document.getElementById("loader").style.animation = "none";
		document.getElementById("loader").style.width = "100%";
		setTimeout(() => {
			document.getElementById("loader_wrapper").style.display = "none";
			document.getElementById("loader_wrapper").remove();
			header_container.style.opacity = "1";
		}, 250);
		if (central) {
			const observer = new IntersectionObserver(([entry]) => {
				if (entry.intersectionRatio < 1) {
					entry.target.children[0].classList.add("--sticky_header");
					entry.target.children[0].children[0].removeAttribute("style");
				} else {
					entry.target.children[0].classList.remove("--sticky_header");
					entry.target.children[0].children[0].style.width = "100%";
				}
			}, { threshold: [1] });
			observer.observe(header_container);
		}
	}

	var has_scrolled = false;
	function hasScrolled() {
		has_scrolled = true;
		window.removeEventListener("scroll", hasScrolled, {passive: true});
	}

	function arrow() {
		document.getElementById("arrow_wrapper").style.display = "block";
		console.log("Arrowed.");
	}
	function unarrow() {
		document.getElementById("arrow_wrapper").style.opacity = "0";
		console.log("Arrow hid.");
		setTimeout(() => { document.getElementById("arrow_wrapper").remove(); }, 1250);
		setTimeout(() => { console.log("Unarrowed."); }, 1250);
		if (cascade) {
			document.getElementById("bodyalt").removeEventListener("scroll", unarrow, {passive: true});
		} else {
			window.removeEventListener("scroll", unarrow, {passive: true});
		}
	}
	function toArrow(event) {
		var scroll_to = event.target;
		scroll_to.scrollIntoView({
			behavior: 'auto',
			block: 'center',
			inline: 'center'
		});
	}

	function filter(event) {
		let target = event.target;
		let filter_index = new Array();
		filter_index.push(target.textContent);
//		const tags = document.querySelectorAll(".list_item-item_tag");
//		tags.forEach((tag) => {
//			if (tag.textContent.indexOf(filter_content) != -1) {
//				tag.classList.add("--highlighted_tag");
//				tag.children[0].style.display = "block";
//				tag.parentElement.classList.add("--highlighted_list_item");
//			}
//		});

//		let list_items = document.getElementsByClassName("list_wrapper-list_item");
//		let all_tags = document.getElementsByClassName("list_item-item_tag");
//		for (let i = 0; i < list_items.length; i++) {
//			if (list_items[i].textContent.indexOf(tag_content) != -1) {
//				list_items[i].classList.add("--highlighted_list_item");
//			} else {
//				list_items[i].classList.remove("--highlighted_list_item");
//			}
//		}
//		for (let i = 0; i < all_tags.length; i++) {
//			if (all_tags[i].textContent.indexOf(tag_content) != -1) {
//				all_tags[i].classList.add("--highlighted_tag");
//				all_tags[i].children[0].style.display = "block";
//				all_tags[i].children[0].style.opacity = "1";
//			} else {
//				all_tags[i].classList.remove("--highlighted_tag");
//				all_tags[i].children[0].removeAttribute("style");
//			}
//		}
		console.log("Filtered " + filter_index + ".");
	}
	function unfilter() {
//		var list_items = document.getElementsByClassName("list_item-tag_list_wrapper");
//		var all_tags = document.getElementsByClassName("tag_list_wrapper-tag_list_item");
//		for (var i = 0, length = list_items.length; i < length; i++) {
//			list_items[i].parentElement.classList.remove("--highlighted_list_item");
//		}
//		for (var j = 0, length = all_tags.length; j < length; j++) {
//			all_tags[j].classList.remove("--highlighted_tag");
//			all_tags[j].children[0].removeAttribute("style");
//		}
		console.log("Unfiltered.");
	}

	function redirectWheel() {
		let customDeltaX;
		let customDeltaY;
		window.addEventListener("wheel", () => {
			if (event.deltaX != null || event.deltaY != null) {
				customDeltaX = event.deltaX;
				customDeltaY = event.deltaY;
			} else {
				customDeltaX = 0;
				customDeltaY = redirectTouchY / -5;
			}
			if (window.innerWidth < document.getElementById("cascade_wrapper").scrollWidth) { // if cascade is overflowing
				if (window.innerHeight + document.getElementById("bodyalt").scrollTop >= document.getElementById("bodyalt").scrollHeight) { // if at bottom of bodyalt
					if (customDeltaY > 0 || customDeltaX > 0) { // if going down or right
						event.preventDefault();
						document.getElementById("cascade_wrapper").scrollLeft += (customDeltaY + customDeltaX);
					} else if (customDeltaY < 0 || customDeltaX < 0) { // if going up or left
						if (document.getElementById("cascade_wrapper").scrollLeft <= 0) {
						} else if (document.getElementById("cascade_wrapper").scrollLeft > 0) {
							event.preventDefault();
							document.getElementById("cascade_wrapper").scrollLeft += (customDeltaY + customDeltaX);
						}
					}
				}
			}
		}, {passive:false});
	}

	let redirectTouchX;
	let redirectTouchY;
	function redirectTouch(event) {
		let touchX;
		let touchY;
		window.addEventListener("touchstart", (event) => {
			touchX = event.touches[0].clientX;
			touchY = event.touches[0].clientY;
		}, {passive: true});
		window.addEventListener("touchmove", (event) => {
			if (window.innerHeight + document.getElementById("bodyalt").scrollTop >= document.getElementById("bodyalt").scrollHeight) { // if bottom of bodyalt
				redirectTouchX = event.changedTouches[0].clientX - touchX;
				redirectTouchY = event.changedTouches[0].clientY - touchY;
				if (Math.abs(redirectTouchY) > Math.abs(redirectTouchX)) { // if going up or down
					if (document.getElementById("cascade_wrapper").scrollLeft <= 0 && redirectTouchY > 0) { // if going up and cascade is at its beginning
						// do nothing
					} else {
						event.preventDefault();
						let wheel = new Event("wheel");
						window.dispatchEvent(wheel);
					}
				}
			}
		}, {passive: false});
	}
