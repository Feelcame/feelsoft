{%- assign directory = include.dir | default: page.dir -%}  
{%- 
	assign all_pages = site.pages 
	| where: "name",  "index.md"
	| where_exp: "item",  "item.dir contains directory"
	| where_exp: "item",  "item.path != page.path"
	| sort: 'path'
-%}

{% if page.dir == "/" %}
{%- assign all_pages = site.pages | where: "pagetype",  "category" -%}
{% endif %}

{% capture result -%}
<ol>
{%- for pg in all_pages -%}
<li>
<a href="{{ pg.url | relative_url }}">{{ pg.path | remove: "/index.md" | split: "/" | last }}</a>
</li>
{% endfor -%}
</ol>
{%- endcapture -%}

{{ result }}

<p>Всего страниц: {{ all_pages.size }}</p>
