//
//

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
	//	let url = window.location.href;
	//	let trailing_slash = url.endsWith("/");
	//	if (window.location.pathname != "/" && trailing_slash == true) {
	//		let new_url = url.slice(0, -1);
	//		window.location.replace(new_url);
	//	}
	}

	let vh_pre = window.outerHeight;
	function setVh(resize) {
		let vh = window.innerHeight * 0.01;
		if (!resize) {
			document.documentElement.style.setProperty('--vh', `${vh}px`);
			console.log("--vh set to " + `${vh}px` + ".");
		} else {
			let vh_post = window.outerHeight;
			if (vh_post != vh_pre) {
				vh_pre = vh_post;
				document.documentElement.style.setProperty('--vh', `${vh}px`);
				console.log("--vh set to " + `${vh}px` + ".");
			}
		}
	}

	function reticulateSplines() {
		console.log("For: " + document.title);
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
			debounce(setVh(true), 500);
		});
		if (cascade) {
			window.addEventListener("DOMContentLoaded", (event) => {
				redirectWheel();
				redirectTouch();
			});
		}
		if (list) {
			window.addEventListener("DOMContentLoaded", () => {
				const tags = document.getElementsByClassName("list_page_item_tag_list-list_page_item_tag");
				const untags = document.getElementsByClassName("list_page_item_tag-tag_unfilter");
				for (let i = 0; i < tags.length; i++) {
					tags[i].addEventListener("click", filter);
					untags[i].addEventListener("click", (event) => {
						event.stopPropagation();
						unfilter();
					});
				}
			});
		}
		if (central) {
			window.addEventListener("DOMContentLoaded", (event) => {
				document.getElementById("arrow_wrapper").addEventListener("click", (event) => {
					toArrow(event);
					unarrow();
				});
			});
			window.addEventListener("load", () => {
				if (!hasScrolled) {
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
	}

// begin
// init

	function initialise() {
		checkUrl();
		setVh();
		reticulateSplines();
		initialListen();
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
		setTimeout(() => { header_container.style.opacity = "1"; }, 250);
		if (central) {
			// https://stackoverflow.com/questions/16302483/event-to-detect-when-positionsticky-is-triggered
			const observer = new IntersectionObserver(
			([e]) => e.target.children[0].classList.toggle("--sticky_header", e.intersectionRatio < 1),
				{threshold: [1]}
			);
			observer.observe(header_container);
		}
	}

	function arrow() {
		document.getElementById("arrow_wrapper").style.display = "block";
		console.log("Arrowed.");
	}
	function unarrow() {
		document.getElementById("arrow_wrapper").style.opacity = "0";
		console.log("Arrow hid.");
		setTimeout(() => { document.getElementById("arrow_wrapper").remove() }, 1250);
		setTimeout(() => { console.log("Unarrowed.") }, 1250);
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
	function unfilter() {
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

	let hasScrolled = false;
	function redirectWheel() {
		let customDeltaX;
		let customDeltaY;
		window.addEventListener("wheel", () => {
			hasScrolled = true;
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

	function redirectTouch(event) {
		let touchX;
		let touchY;
		let redirectTouchX;
		let redirectTouchY;
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
