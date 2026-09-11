+++
title = 'Contributing to MFC'
date = 2026-09-11T11:00:00-04:00
draft = true
summary = 'New physics and tooling for MFC, an open-source exascale CFD solver and 2025 Gordon Bell Prize finalist.'
tags = ['cfd', 'research', 'open-source']
+++

<!-- TODO: clean up the fork's public branches before this page sends people to it. -->

[MFC](https://mflowcode.github.io/) is an open-source solver for compressible multiphase flow, developed at Georgia Tech and a 2025 ACM Gordon Bell Prize finalist. My [droplet coalescence research](/projects/droplet-coalescence/) runs on it, so when my cases need something MFC doesn't do, I add it.

## Merged upstream

- **[#1376](https://github.com/MFlowCode/MFC/pull/1376): `./mfc.sh run --archive`.** After an interactive run finishes, this collects the case inputs and outputs into a timestamped archive, with a manifest recording the command, git version and build. Before, snapshotting a run meant copying files by hand. Merged April 2026.
- **[#1389](https://github.com/MFlowCode/MFC/pull/1389): corrupted grid coordinates in post-processing.** A Fortran array-bounds remapping made the grid reader write into the wrong slots for every MPI rank away from the domain's left edge, leaving uninitialized memory in the output files. It was a quiet bug: on a uniform grid the shifted coordinates look identical to the right ones, so it only showed when the leftover memory happened to hold a NaN. It had been in the code for ten months. Merged April 2026.

## In my fork

These live in [cmtl-wpi/MFC-drcole](https://github.com/cmtl-wpi/MFC-drcole), each with its own validation case:

- **Heat conduction** without needing MFC's chemistry module.
- **Temperature-dependent surface tension.** This drives thermocapillary (Marangoni) flow: a droplet sitting in a temperature gradient migrates toward the hot side. Validated against the Young–Goldstein–Block migration speed.
- **Temperature-dependent viscosity** (Arrhenius), validated in a sheared Couette flow.

In progress:

- **Surfactant-driven Marangoni flow**, where surface tension varies with how much surfactant is on the interface instead of with temperature.
- **Multilevel adaptive mesh refinement**, extending MFC's in-progress mesh refinement to more than one level on CPU and GPU, with mass and energy conserved to round-off error across levels.
