---
layout: default
title: directory listing
---

directory listing

{%
	assign all_pages = site.pages
	| sort: "path"
%}
{% for page in all_pages -%}
<a href="{{ page.path | relative_url}}">{{ page.path }}</a>
{% endfor %}