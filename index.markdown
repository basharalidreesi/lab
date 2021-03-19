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

{% assign docs = site.documents %}
{% assign pages = site.pages %}
{% assign docs = docs | push: pages %}

{% for item in docs %}
<p>{{ item.path }}</p>
{% endfor %}

Hello