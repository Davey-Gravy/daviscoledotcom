+++
title = 'Droplet Coalescence'
date = 2026-09-11T11:00:00-04:00
draft = true
summary = 'My PhD research at WPI: simulating what decides whether two colliding droplets bounce apart or merge.'
tags = ['cfd', 'research']
+++

<!-- TODO before publishing: run this page past your advisor. It describes methods only, no results or conclusions, on purpose. -->

My PhD research at WPI is about what happens when two droplets meet. Whether they bounce off each other or merge comes down to a thin film of the surrounding fluid that has to drain out from between them before their surfaces can touch.

That question has a practical payoff. Crude oil comes out of the ground mixed with water as an emulsion, a suspension of tiny water droplets in oil, and the water has to come out before the oil is any use. One way to get it out is with sound: ultrasound pushes droplets together so they merge, grow, and settle. My lab studies that process, called acoustic demulsification, and my part is the simulations.

{{< gallery >}}

*Two droplets colliding head-on and merging: a 3D simulation in MFC, rendered in Blender.*

## How I'm going about it

**3D simulations in MFC.** I built droplet-collision cases modeled on the experiments in Qian & Law's *Regimes of coalescence and separation in droplet collision* (1997) and ran them in [MFC](https://mflowcode.github.io/), an open-source solver for compressible multiphase flow. The largest runs used 96 million cells on 24 NVIDIA A100 GPUs on NCSA's Delta supercomputer. Along the way I added features MFC didn't have yet; see [Contributing to MFC](/projects/mfc-contributions/).

**Zooming in on the film.** The draining film is orders of magnitude thinner than the droplets, too thin to resolve in a full 3D run at any grid size I could afford. So I moved to axisymmetric simulations in [Basilisk](http://basilisk.fr/), which treat the collision as a 2D slice rotated around its axis. Each droplet gets its own interface-tracking field, so the solver can't merge them just because their surfaces land in the same grid cell.

**Checking every stage.** Each stage of the pipeline has to reproduce a problem with a known exact answer before it's trusted on a real case.

The 3D case files are public in [my MFC fork](https://github.com/cmtl-wpi/MFC-drcole/tree/master/examples/3D_droplet_coalescence).
