+++
title = 'Projects'
date = 2026-09-13T00:00:00-04:00
draft = false
+++

I'm a mechanical engineering PhD student at WPI, currently on a break. My research simulates what decides whether two colliding droplets bounce apart or merge, which matters for separating water from crude oil with ultrasound. A lot of that work is software: building cases, adding physics to the solvers, running them on workstations, clusters and GPUs, and checking whether the answers are right.

Some specifics:

- **Two changes merged into [MFC](https://mflowcode.github.io/)**, an open-source solver for compressible multiphase flow and a 2025 Gordon Bell Prize finalist: a fix for a ten-month-old bug that corrupted grid coordinates in post-processing, and an `--archive` option that files each run's inputs and outputs with a manifest. [More](/projects/mfc-contributions/)
- **Heat conduction, temperature-dependent surface tension and temperature-dependent viscosity** added to MFC, each with its own validation case against an exact solution or theory. [More](/projects/mfc-contributions/)
- **3D droplet collisions up to 96 million cells** on about 24 A100 GPUs on NCSA's Delta, and a stretched grid that ran the same collision about 2.9 times cheaper. [More](/projects/droplet-coalescence/)
- **A droplet bounce resolved in Basilisk**, with 128 nm cells in the film between the droplets. [More](/projects/droplet-coalescence/)
- **A 53% speed-up I withdrew** after tracing it to the boundaries of my simulation box. With the box fixed, the bubble slows drainage instead. [More](/projects/bubble-assisted-coalescence/)
- **Two years on the Fluent testing team at Ansys**, after verification and validation work at DEKA.

Research is listed first. The rest is tooling, an older CFD study, and the computers I run at home. I've also written up two tools I built for myself: [deleting 108,498 emails without losing one](/posts/deleting-108498-emails/), and [garbage-collecting my AI assistant's memory](/posts/garbage-collecting-ai-memory/).
