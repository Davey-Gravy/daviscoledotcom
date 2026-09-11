+++
title = 'CoolSim'
date = 2026-09-11T11:00:00-04:00
draft = true
summary = 'My day job: engineering for CoolSim, a cloud product that simulates airflow and cooling in data centers.'
tags = ['cfd', 'computing']
+++

<!-- TODO: get your employer's OK before publishing, and check the AI-authorship line is how you want to put it. -->

Since November 2024 I've been a staff engineer at Applied Math Modeling, which makes CoolSim, software that simulates airflow and cooling in data centers. Customers model their room (racks, cooling units, raised floors, containment) and CoolSim runs the CFD in the cloud to show where the hot air goes and what will overheat.

What I've worked on:

- **Moving to AWS.** In July 2026 we cut the customer-facing platform over to AWS: the web app, the queue that runs simulation jobs, and result storage.
- **Test and release.** A CI test environment and a formal build, test and release process for the product.
- **Solver upgrades.** Qualifying newer versions of the Ansys solvers with side-by-side comparisons on real models before switching anything over.
- **Automated operations.** 17 scheduled jobs and 4 monitoring agents that watch the job pipeline, so problems surface before a customer notices.
- **Catching bad models early.** Automated checks that flag problems in a customer's model before it's solved, instead of after a failed run.
- **The next-generation web platform**, plus customer support, documentation and the marketing site.

Most of the code is written by AI coding agents that I direct and review; the direction, the calls and the domain judgment are mine.

I'm also a certified Data Center Energy Practitioner (DCEP) Generalist.
