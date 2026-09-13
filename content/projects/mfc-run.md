+++
title = 'mfc-run'
date = 2026-09-11T11:00:00-04:00
draft = false
summary = 'A wrapper for MFC that records what every simulation run was for and files its outputs automatically, on a workstation or a cluster.'
tags = ['cfd', 'computing', 'open-source']
+++

Running one simulation is easy. Running dozens of variants of it, and remembering three weeks later which output folder was the one with the finer grid and the lower viscosity, is not. MFC writes its outputs into the case directory, where the next run overwrites them. I wrote [mfc-run](https://github.com/drcole17/mfc-run) in February 2026 so that every run keeps a record of what it was for and where its results went.

## What it does

mfc-run wraps MFC's `./mfc.sh run`. Every run gets a short description, and when it finishes, everything it made is filed into its own dated folder:

- `run_info.json`, recording the status, duration, MFC git commit and parameters
- a snapshot of `case.py` as it was when the run started, plus the parameters as JSON
- the simulation outputs (`D/`, `silo_hdf5/`, `restart_data/`, `p_all/`), moved out of the working directory
- copies of any analysis scripts and plots

Failed runs go into a separate `failed/` folder instead of being mixed in with good ones, and `mfc-run --list-runs <case>` shows a case's whole history. It finds the MFC checkout on its own by walking up from the case file. It's a single Bash script that needs nothing beyond Python, rsync and git, so it drops onto an HPC cluster easily.

## Batch jobs are where it gets interesting

On a workstation, a run is finished when the command returns. On a cluster it isn't. The first version of batch support archived empty results, because `sbatch` returns immediately after *submitting* a job, long before the job runs. The fix was to poll the scheduler until the job actually finished before archiving anything.

A later audit found two subtler problems. A still-running batch job could be recorded as an empty success. And the scheduler settings the script was exporting did nothing at all, because MFC reads its account and partition from its own command-line flags, not from the environment. The reworked batch mode supports SLURM, PBS and LSF, only deletes local outputs after a clean success, and comes with a 220-line test suite that fakes each scheduler so it can be tested without a cluster. That rework is written and tested but not merged yet.

## Upstream

The same idea later went into MFC itself as the `--archive` option for interactive runs ([#1376](https://github.com/MFlowCode/MFC/pull/1376)), which I wrote and which was merged in April 2026.
