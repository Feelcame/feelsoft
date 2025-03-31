{% assign directory = page.path | remove: page.name %}  
{%
  assign all_files = site.static_files
  | where: "extname", ".apk"
  | where_exp: "item",  "item.path contains directory"
  | sort: "path"
%}
{%- assign filescount = all_files.size -%}  

{% capture result %}
<ol>
{% for file in all_files %}
<li>
<a href="{{ file.path | relative_url }}">{{ file.name }}</a>
</li>
{% endfor %}
</ol>
{% endcapture %}

{% if filescount > 0 %}
<b>Всего файлов: {{ filescount }}</b>
<div id="filelist">{{ result }}</div>
{% endif %}