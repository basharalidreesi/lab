---
title: Home
permalink: "/"
position: 0
colours:
  primary colour: black
  secondary colour: grey
  border colour: yellow
  text colour: yellow
page:
  has central header: true
layout: showcase
---

{% for doc in site.documents %}
* {{ doc.title }}
* {{ doc.path }}
{% if doc.page['is navigable'] %}
* Navigable!
{% endif %}
{% endfor %}