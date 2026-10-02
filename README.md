# Alexandria — website

The GitHub Pages site at <https://stoutc24.github.io/AlexandriaUpdatesRoadmap/>:
one page that presents the app, the Apple TV app, Party Play, the companion
server, pricing, the roadmap, bug reports, feature requests and the community.

- `index.html` — the page. Section anchors (`#v310`, `#v2`, `#features`,
  `#appletv`, `#party`, `#companion`, `#pricing`, `#gallery`, `#roadmap`,
  `#bugs`, `#features-request`, `#community`) are stable; older links keep working.
- `assets/site.css` — brand dark theme (Royal Blue `#2563EB`, Copper-Gold
  `#C9822A`), device mockups (`.phone`, `.tv`), the Party Play diagram, pricing,
  roadmap and issue lists. Respects `prefers-reduced-motion`.
- `assets/site.js` — reveal-on-scroll, services marquee, gentle parallax,
  mobile nav, lightbox, counters and the Party Play beams.
- `images/showcase/` — screenshots from the staged showcase library (invented
  titles and generated art, nothing copyrighted), produced by
  `abs_kavita_client/tools/showcase/site_images.py`; `og.jpg` is the link preview.

No build step: edit, commit, push to `main`.
