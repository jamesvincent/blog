---
layout: page
title: Tags
permalink: /tags/
---

Browse posts by tag.

<div id="tag-browser"></div>

<script>
  (function () {
    const selected = new URLSearchParams(window.location.search).get('tag');
    const allTags = {
      {% for tag in site.tags %}
      "{{ tag[0] | slugify }}": {
        name: "{{ tag[0] }}",
        posts: [
          {% for post in tag[1] %}
          {
            title: {{ post.title | jsonify }},
            url: {{ post.url | relative_url | jsonify }},
            date: {{ post.date | date: "%d %b %Y" | jsonify }}
          }{% unless forloop.last %},{% endunless %}
          {% endfor %}
        ]
      }{% unless forloop.last %},{% endunless %}
      {% endfor %}
    };

    const container = document.getElementById('tag-browser');
    const keys = Object.keys(allTags).sort();

    if (selected && allTags[selected]) {
      const tag = allTags[selected];
      container.innerHTML = `
        <h2>Tag: ${tag.name}</h2>
        <ul>
          ${tag.posts.map(p => `<li><a href="${p.url}">${p.title}</a> <span class="post-meta">${p.date}</span></li>`).join('')}
        </ul>
        <p><a href="{{ '/tags/' | relative_url }}">View all tags</a></p>
      `;
      return;
    }

    container.innerHTML = `
      <ul class="tag-listing">
        ${keys.map(key => `<li><a href="{{ '/tags/' | relative_url }}?tag=${key}">${allTags[key].name}</a> (${allTags[key].posts.length})</li>`).join('')}
      </ul>
    `;
  })();
</script>
