# Modern Workplace Blog

A simple GitHub Pages blog built with Jekyll and the Minima theme.

## Included features

- About page
- Example blog posts
- Tag browsing
- Client-side search
- Google Analytics support
- utterances-based comments

## Quick start

1. Create a GitHub repository.
2. Copy these files into the repository root.
3. Update `_config.yml` with your GitHub username, repo name, analytics ID, and utterances repo.
4. In GitHub, enable Pages from the main branch.

## Local run

```bash
bundle install
bundle exec jekyll serve
```

## Configuration to update

### GitHub Pages URL

```yml
url: "https://yourusername.github.io"
baseurl: "/modern-workplace-blog"
```

### Google Analytics 4

```yml
google_analytics: "G-XXXXXXXXXX"
```

### utterances

```yml
utterances:
  repo: "yourusername/modern-workplace-blog"
  issue_term: "pathname"
  theme: "github-light"
  label: "comments"
```
