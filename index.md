---
title: Home
position: 0
is_navigation_list_item: false
header_graphic_location: central
has_footer_container: true
---
{% assign image_files = site.static_files | where: "showcase_tile", true %}
<div class="content_container-showcase_wrapper">
	{% for myimage in image_files %}
		<div class="showcase_wrapper-showcase_tile" style="background-image: url({{ myimage.path }})">
	{% endfor %}
</div>
