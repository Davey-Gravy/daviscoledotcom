+++
title = 'mfc-run'
date = 2026-09-11T11:00:00-04:00
draft = true
summary = 'A wrapper for MFC that records what every simulation run was for and files its outputs automatically.'
tags = ['cfd', 'computing', 'open-source']
+++

Running one simulation is easy. Running forty variants of it and remembering, three weeks later, which output folder was the one with the finer grid and the lower viscosity is not.

[mfc-run](https://github.com/drcole17/mfc-run) wraps MFC's `./mfc.sh run`. Every run gets a short description and lands in its own dated folder holding:

- a snapshot of the case file as it was when the run started
- the parameters as JSON
- the run's status, duration and MFC git commit
- the simulation outputs, moved out of the working directory

Failed runs are filed separately, and `mfc-run --list-runs <case>` shows a case's history.

It finds the MFC checkout on its own, and it's a single Bash script that needs nothing beyond Python, rsync and git, so it drops onto an HPC cluster easily. The same idea later went upstream as MFC's own [`--archive` option](https://github.com/MFlowCode/MFC/pull/1376).
