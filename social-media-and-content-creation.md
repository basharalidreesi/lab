---
title: Social Media & Content Creation
date: 2021-02-03 23:39:00 Z
permalink: "/social-media-and-content-creation/"
position: 3
has_bottom_footer: true
is_for_navigation: true
---

<!-- {% include page_header.html %} -->
<ul class="content_container-list_page_wrapper">
	{% assign sorted = site.social-media-and-content-creation | sort: "position" %}
	{% for item in sorted %}
		{% if item.is_listed == true %}
			<li class="list_page_wrapper-list_page_item">
				<a class="--anchor_styling --list_text_styling" href="{{ item.url }}">
					{{ item.title }}
				</a>
				{% if item.tags != empty %}
					<ul class="list_page_item-list_page_item_tag_list">
						{% for tag in item.tags %}
							<li class="list_page_item_tag_list-list_page_item_tag --tag_text_styling">
								<a href="" class="--anchor_styling">
									{{ tag }}
								</a>
							</li>
						{% endfor %}
					</ul>
				{% endif %}
			</li>
		{% endif %}
	{% endfor %}
</ul>
