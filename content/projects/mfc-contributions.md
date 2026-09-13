+++
title = 'Contributing to MFC'
date = 2026-09-11T11:00:00-04:00
draft = false
weight = 3
summary = 'New physics and tooling for MFC, an open-source exascale CFD solver and 2025 Gordon Bell Prize finalist.'
tags = ['cfd', 'research', 'open-source']
+++

[MFC](https://mflowcode.github.io/) is an open-source solver for compressible multiphase flow, developed at Georgia Tech and a 2025 ACM Gordon Bell Prize finalist. My [droplet coalescence research](/projects/droplet-coalescence/) runs on it, so when my cases need something MFC doesn't do, I add it. Some of that has gone upstream; most of it lives in my fork for now.

## Merged upstream

**[#1389](https://github.com/MFlowCode/MFC/pull/1389): corrupted grid coordinates in post-processing.** On a 128-rank 3D coalescence run, the post-processed output had NaNs or coordinates over a meter on 9 of the 128 MPI ranks, and the stitched-together grid came out 193 × 3 × 159 instead of 180 × 120 × 120. The cause was a Fortran subtlety: the grid reader declared its array arguments with fixed lower bounds, and for ranks away from the domain's left edge, where the real arrays start at a different index, Fortran quietly remapped them. The reader wrote into the wrong slots and left the last few cell boundaries uninitialized. The NaNs were the lucky ranks. Most of the others were silently shifted by two cells, which is invisible on a uniform grid. It had been in the code for ten months, and the fix was seven lines: pass explicit slices so the bounds can't be remapped. Merged April 30, 2026.

**[#1376](https://github.com/MFlowCode/MFC/pull/1376): `./mfc.sh run --archive`.** After an interactive run finishes, this collects the case inputs and outputs into a timestamped archive (a folder, a tarball, or a zstd-compressed tarball) with a manifest recording the command, git version and build. It's the same idea as my own [mfc-run](/projects/mfc-run/) wrapper, built into MFC's toolchain: 521 lines across five files, with seven unit tests. Merged April 24, 2026.

## Heat and surface tension

Surface tension usually drops as temperature rises. On a droplet sitting in a temperature gradient, that means the surface pulls harder on the cold side than the hot side, which drags surface fluid from hot to cold and pushes the droplet toward the heat. That's thermocapillary, or Marangoni, migration, and there's a classic formula for its speed (Young, Goldstein and Block).

MFC didn't model any of it, so I added three things, each with its own validation case:

- **Heat conduction** without needing MFC's chemistry module. A flat-plate test matches the exact solution to within 0.3% of the temperature difference.
- **Temperature-dependent surface tension.** The nice discovery was that it needs no separate Marangoni term: letting surface tension vary from cell to cell inside the existing surface-stress calculation produces the sideways force automatically, by the product rule. In 3D, the migration speed goes from 0.837 to 0.926 of the theoretical value as the grid goes from 64 to 128 cells, extrapolating to about 1.01.
- **Temperature-dependent (Arrhenius) viscosity**, checked in a sheared flow between two plates, where the error falls from 1.3 × 10⁻⁴ to 1.5 × 10⁻⁵ as the grid refines (second-order convergence, as it should be).

Two debugging stories stand out. An MPI boundary bug made the droplet migrate *backwards*, and the giveaway was a sawtooth pattern in the cells along the boundaries between processors. And the ringing in my migration curves turned out to be a real standing sound wave, set off by the droplet's starting pressure. Starting the droplet at the pressure its surface tension actually demands cut the ringing by about 97%. Resolution mattered too: for the viscosity feature, a coarse grid said the droplet moved about 15% slower, while the resolved grid said 1–3% faster.

The whole thermal feature set is about 1,100 lines across 22 files, plus a 242-line new module and 18 reference test files. It started as one 13,000-line pull request, which I split into three reviewable features before merging them into my fork in June. They're ready to go upstream but haven't been opened there yet.

## Surfactants

Surfactant skins are part of what makes crude-oil emulsions so stable in the first place. The in-progress surfactant feature ([draft PR](https://github.com/cmtl-wpi/MFC-drcole/pull/9)) transports an insoluble surfactant along the interface and lets surface tension depend on how much is there. Surface diffusion decays at 1.971 against an exact 1.974, and the total amount of surfactant is conserved to machine precision. In 3D the migration rate reaches 0.53, then 0.88, of the exact value as the droplet goes from 5 to 16 cells across its radius, so it still needs resolution.

## Mesh refinement

Uniform grids waste most of their cells. Doubling the resolution in a droplet film with adaptive mesh refinement costs about 23% more cells; doing it uniformly costs 700% more. MFC's lead developer has an open pull request adding block-structured refinement, and I've been extending it in four draft PRs:

- **Multiple levels** on CPU and GPU. Mass and energy drift by 4 × 10⁻¹⁵ across levels with the correction that balances fluxes between coarse and fine cells, against 1.4 × 10⁻⁷ without it. A GPU run caught a bug that only exists on the GPU, where stale data overwrote freshly updated cells.
- **Sharp starting interfaces.** Initializing the fine blocks directly shrinks the interface width from 0.127 to 0.052 of the droplet radius.
- **Refining where the interface is**, by tagging cells at the 50% volume-fraction contour.
- **A moving second level** that follows the interface, where dropping one correction term worsens conservation to 1.4 × 10⁻³, so it stays.

## Smaller things

- **Multi-color markers**, which give each droplet its own marker so MFC can't merge two of them just because their interfaces touch: the same idea as giving each droplet its own field in Basilisk.
- **A missing hoop-stress term** in axisymmetric surface tension, without which a perfectly still sphere couldn't hold the pressure jump its own surface tension demands.
