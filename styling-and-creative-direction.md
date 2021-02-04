---
title: Styling & Creative Direction
date: 2021-02-03 23:35:00 Z
permalink: "/styling-and-creative-direction/"
position: 2
is_navigation_list_item: true
navigation_list_item_order: 1
header_graphic_location: upper
has_footer_container: true
---

<ol class="content_container-project_list_wrapper-client_list_wrapper">
	{% for item in site.styling-and-creative-direction %}
		<li class="project_list_wrapper-project_list_item-client_list_item">
			<a class="--color_black --font_size_universal_answer_single --text_align_center" href="{{ item.url }}">
				{{ item.title }}
			</a>
		</li>
	{% endfor %}
</ol>
