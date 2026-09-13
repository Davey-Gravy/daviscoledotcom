+++
title = 'Droplet Coalescence'
date = 2026-09-11T11:00:00-04:00
draft = false
weight = 1
cover = 'coalescence.webp'
coverVideo = 'coalescence.mp4'
summary = 'My PhD research at WPI: simulating what decides whether two colliding droplets bounce apart or merge, and why that is so hard to compute.'
tags = ['cfd', 'research']
+++

My PhD research at WPI is about what happens when two droplets meet. Whether they bounce off each other or merge comes down to a film of the surrounding fluid, trapped between them, that has to drain out before their surfaces can touch. If the film drains fast enough, they merge. If it pushes back hard enough, they bounce.

That question has a practical payoff. Crude oil comes out of the ground mixed with water as an emulsion, a suspension of tiny water droplets in oil, and the water has to come out before the oil is worth much. One way to get it out is with sound: ultrasound gathers droplets together so they merge, grow and settle. My lab studies that process, called acoustic demulsification, and my part is the simulations.

{{< loop src="coalescence.mp4" poster="coalescence.webp" width="960" height="600" caption="Two droplets colliding head-on and merging: a 3D simulation in MFC, rendered in Blender." >}}

## Starting in 3D

I started from a classic set of experiments: Qian and Law's 1997 study of hydrocarbon droplets colliding in nitrogen, which mapped out when droplets bounce, when they merge, and when they merge and then tear apart again. The example case I built in MFC, an open-source solver for compressible multiphase flow, carries all 18 of their collisions.

The runs went on NCSA's Delta supercomputer, up a resolution ladder from 2.5 million cells to 96 million (599 × 399 × 399). The largest ran on about 24 NVIDIA A100 GPUs, roughly 88 times faster than the same run on 64 cores of my workstation. Even so, one simulated millisecond is about 1.1 million time steps at 0.2 seconds each. Resolution is expensive in a compressible code: halve the cell size and you get eight times the cells and twice the time steps, so sixteen times the cost. When I noticed that only about 23% of the 96-million-cell grid sat anywhere near the droplets, I redesigned it to stretch the cells away from the action. That gave a 45-million-cell grid with 112 to 121 cells across the droplet where it matters, about 2.9 times cheaper to run.

One early set of runs blew up in an instructive way. I'd set the surrounding gas at about 116 Pa, far below the 2.7 kPa dynamic pressure of the collision. The impact pulled the liquid into vacuum, the local sound speed spiked about 166-fold, and the time step collapsed to zero. The fix was to raise the gas pressure until the two fluids' sound speeds matched.

## The film MFC couldn't see

The trouble is the film. Two droplets bounce when a gas film between them, down to roughly 100 nanometers thick, pushes back hard enough. Resolving that on a uniform grid around a 300-micron droplet would take on the order of a trillion cells. Published simulations that capture bouncing used cells around 15 nm across in the film. My best 3D cells were 1.5 microns.

Worse, MFC spreads each interface over three to five cells. As two droplets approach, their smeared edges overlap and fuse while the surfaces are still several cells apart. I tried everything I could think of to make the clearest bouncing case in the experiments actually bounce: three interface-sharpening modes, gas pressures from 0.08 to 1 atmosphere, a low-Mach correction, and 400 cells across the droplet. Every run merged once the film was about three cells thick. OpenFOAM's interface-capturing solver merged too, both in 2D at 200 cells per diameter and in 3D at 100 (10 million cells, 128 cores, 3.7 hours). The smeared interface fails in the other direction as well: it won't pinch a neck apart. At 64³ and 128³ cells the neck stalls at the same physical width, which makes it a limit of the method rather than of the resolution.

## Zooming in with Basilisk

In July I moved the film question to [Basilisk](http://basilisk.fr/), which does several things MFC doesn't. Its interface is exactly one cell wide. Its surface-tension scheme holds a still droplet in balance to round-off. And its tree-based mesh can put tiny cells in the film and large ones everywhere else, which makes the problem tractable on a workstation instead of a GPU allocation. The trade-off is that it runs on CPUs only. Each droplet gets its own interface-tracking field, because a single field merges two surfaces automatically the moment they share a cell.

Refining only the film didn't work at first. The mesh kept reshuffling as the film moved, and the simulation blew up (about 5,000 m/s in a single step). What worked was refining the whole gap region uniformly once it closed. Refinement cuts the cell count, not the time step, because surface tension caps the step everywhere.

With 256-nanometer cells in the film, the droplets merged. With 128 nm cells, they bounced cleanly: 330,299 time steps and 24 hours. The contact lasted about 35% longer than in published results, and making the gas compressible flipped the same run back to a merge, by trapping a small gas bubble in the middle of the film. A 64 nm run to check convergence was cancelled, so that question is still open.

{{< loop src="bounce-vs-merge.mp4" poster="bounce-vs-merge.webp" width="1280" height="520" caption="Qian and Law's case b in Basilisk, with 128 nm cells in the film. With incompressible gas (left) the droplets bounce apart; with compressible gas (right) the same collision merges. The boxes are zoomed views of the film." >}}

The same Basilisk setup became the test bed for a sharper question: [can a pulsing bubble help droplets merge?](/projects/bubble-assisted-coalescence/)

## Along the way

Along the way I've been adding features MFC didn't have yet: heat conduction, temperature-dependent surface tension, surfactants, and multilevel mesh refinement. See [Contributing to MFC](/projects/mfc-contributions/).

The 3D case files are public in [my MFC fork](https://github.com/cmtl-wpi/MFC-drcole/tree/master/examples/3D_droplet_coalescence).
