---
title: Home
position: 0
is_navigation_list_item: false
header_graphic_location: central
has_footer_container: true
---

{% assign image_files = site.static_files | where: "showcase_tile_graphic", true %}
{% for myimage in image_files %}
		{{ myimage.path }}
{% endfor %}
