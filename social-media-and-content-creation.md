---
title: Social Media & Content Creation
date: 2021-02-03 23:39:00 Z
permalink: "/social-media-and-content-creation/"
position: 3
is_navigation_list_item: true
navigation_list_item_order: 3
header_graphic_location: upper
has_footer_container: true
---

<!-- {% include page_header.html %} -->
<ol class="content_container-project_list_wrapper-client_list_wrapper">
	{% for item in site.social-media-and-content-creation %}
		<li class="project_list_wrapper-client_list_wrapper-project_list_item-client_list_item">
			<a class="--anchor_styling" href="{{ item.url }}">
				{{ item.title }}
			</a>
			{% if item.tags != empty %}
				<ul class="project_list_wrapper-client_list_wrapper-tag_list_wrapper">
					{% for tag in item.tags %}
						<li class="tag_list_wrapper-tag_list_item">
							{{ tag }}
						</li>
					{% endfor %}
				</ul>
			{% endif %}
		</li>
	{% endfor %}
</ol>
