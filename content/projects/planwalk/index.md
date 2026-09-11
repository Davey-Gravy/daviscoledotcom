+++
title = 'Planwalk'
date = 2026-09-11T11:00:00-04:00
draft = true
summary = 'Turns architectural PDF drawings into a 3D walkthrough that runs in a browser, plus photoreal renders.'
tags = ['computing']
+++

<!-- TODO: these renders are of a real client's house, built from drawings marked "shall not be reproduced, distributed, published". Get the builder's permission or swap in a demo plan set before publishing. Also decide whether this page should pitch the service. -->

Most people can't look at a floor plan and picture the house. Planwalk takes the drawing set an architect or builder already has, as a vector PDF, and turns it into a house you can walk through.

It reads the walls, doors, windows and stairs straight out of the PDF's linework and builds a 3D model from them. The result is a single HTML file: a first-person walkthrough that opens in any browser, with nothing to install. The same model also goes to Blender for photoreal stills and a flythrough video.

{{< gallery >}}

*Blender renders generated straight from a builder's PDF drawing set.*

## How it works

- **Extraction.** Poppler's `pdftocairo` and `pdftotext` pull the geometry and labels out of the PDF, and Python (NumPy, SciPy) cleans up the linework and classifies it.
- **One config file per job.** Everything specific to a drawing set lives in a single `job.yaml`, so the code has no per-house constants.
- **Viewer.** three.js, bundled into the HTML file so it works offline.
- **Automated QA.** Headless-browser scripts walk the model the way a person would (down the stairs, sideways, into walls) to catch broken collisions and geometry before anyone sees them.
- **Rendering.** Blender Cycles on the CPU. A 30-second flythrough renders overnight, in about ten hours.
