---
---
(function () {
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if (!input || !results) return;

  let posts = [];

  function escapeHtml(value) {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function render(items, query) {
    if (!query) {
      results.innerHTML = '<p>Start typing to search.</p>';
      return;
    }

    if (!items.length) {
      results.innerHTML = '<p>No matching posts found.</p>';
      return;
    }

    results.innerHTML = items.map(item => {
      const tags = (item.tags || []).map(tag => `<span class="tag-chip">#${escapeHtml(tag)}</span>`).join(' ');
      return `
        <div class="search-result">
          <h3><a href="${item.url}">${escapeHtml(item.title)}</a></h3>
          <p class="post-meta">${escapeHtml(item.date)}</p>
          <p>${escapeHtml(item.excerpt || '').slice(0, 220)}</p>
          <div>${tags}</div>
        </div>
      `;
    }).join('');
  }

  function search(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      render([], '');
      return;
    }

    const terms = q.split(/\s+/).filter(Boolean);
    const matches = posts.map(post => {
      const haystack = [
        post.title,
        (post.excerpt || ''),
        (post.content || ''),
        (post.categories || []).join(' '),
        (post.tags || []).join(' ')
      ].join(' ').toLowerCase();

      let score = 0;
      for (const term of terms) {
        if (post.title.toLowerCase().includes(term)) score += 5;
        if (((post.tags || []).join(' ').toLowerCase()).includes(term)) score += 4;
        if (((post.categories || []).join(' ').toLowerCase()).includes(term)) score += 3;
        if (((post.excerpt || '').toLowerCase()).includes(term)) score += 2;
        if (haystack.includes(term)) score += 1;
      }

      return { post, score };
    }).filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(x => x.post);

    render(matches, q);
  }

  fetch('{{ "/search.json" | relative_url }}')
    .then(response => response.json())
    .then(data => {
      posts = data;
      render([], '');
      input.addEventListener('input', function () {
        search(input.value);
      });
    })
    .catch(() => {
      results.innerHTML = '<p>Search could not be loaded.</p>';
    });
})();
