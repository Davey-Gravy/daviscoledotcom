+++
title = 'Journal'
date = 2026-06-16T00:00:00-04:00
draft = false

# Gated personal area. Cloudflare Access protects the /private/ path itself;
# this front matter keeps the content from leaking through Hugo's PUBLIC
# aggregation files (homepage, RSS /index.xml, sitemap.xml, search /index.json),
# which live at public URLs that Access does NOT cover.
#
#   render = 'always'      -> emit the HTML so Access can serve it once authed
#   list   = 'never'       -> this landing page appears in no public collection
#   cascade list = 'local' -> child posts show in IN-GATE lists (this page and the
#                             section indexes) but stay out of every site-wide
#                             collection, so they never reach a public surface.
# (layouts/index.json also excludes this content by section name.)
[build]
  list = 'never'
  render = 'always'

[cascade]
  [cascade.build]
    list = 'local'
    render = 'always'
+++

Informal posts, updates, and notes — kept behind the gate.
