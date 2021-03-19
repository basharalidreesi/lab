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
{{ doc.path }}
{% endfor %}

<!-- break -⟶

{% for pg in pages %}
{{ pg.path }}
{% endfor %}