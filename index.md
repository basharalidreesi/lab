---
title: Home
position: 0
header_location: central
has_bottom_footer: true
---

<div class="content_container-showcase_wrapper">
	{%- assign image_files = site.static_files | where: "showcase_tile", true -%}
	{%- for myimage in image_files -%}
		<div class="showcase_wrapper-showcase_tile" style="background-image: url({{- myimage.path -}})"></div>
	{%- endfor -%}
</div>
