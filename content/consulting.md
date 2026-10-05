+++
title = 'Consulting'
description = 'Hardware, software and research computing for people, labs and companies in the Upper Valley. Davis Cole, Lebanon, New Hampshire.'
layout = 'consulting'
draft = false
+++

# Hardware, software and research computing in the Upper Valley.

I take on technical work of most kinds for people, labs and companies around Lebanon, Hanover and the rest of the Upper Valley: computers and networks, lab equipment, software and websites, cloud systems, data, and engineering simulation. A lot of it is the kind of problem that falls between specialists. When something is outside what I can do well, I say so and point you to someone who can.

I live in Lebanon, where I was born. I take a small number of clients at once.

## Background

My training is in research and development, and most of it has been spent finding out whether things actually work. I studied mechanical engineering at the University of New Hampshire. At DEKA Research & Development in Manchester I was a verification and validation engineer on medical devices: test fixtures, sensors, data logging, and simulation to find the root cause of failures. I then spent two years on the testing team for Ansys Fluent, a flow solver, in Ansys's Lebanon office. Since late 2024 I have been a staff engineer at a commercial simulation-software company, where I run the cloud and computing operations. I am also a PhD student in mechanical engineering at WPI, where I simulate colliding droplets and add physics to an open-source flow solver.

## What I do

**Hardware.** Workstations and servers, specified, built and repaired, including used enterprise equipment. Home and office networks and Wi-Fi. File servers and backups, with the backup proven by restoring from it. Lab and test equipment: sensors, microcontrollers, data acquisition and fixtures. Soldering, 3D printing and light machining when a job needs a part.

**Software.** Websites for small businesses. Internal tools, and scripts that remove a step somebody does by hand every week. Data pipelines and dashboards. Mostly Python, with C++ and the web when the job calls for them.

**Infrastructure and cloud.** Cloud-bill audits and rightsizing. Migrations. Monitoring that checks the data path rather than the configuration. Fractional infrastructure work during business hours.

**Research and engineering computing.** Computing for labs: environments, pipelines, storage, and burst capacity on a 128-core, 1 TiB machine for jobs a cluster will not schedule. CFD and simulation for compressible, multiphase and thermal problems, with the verification to show the answer is right.

**AI tools.** Private systems for data that cannot leave the building, installed at your site with no per-seat fees. Hands-on sessions for teams starting to use AI coding agents on their own code. I direct agents in most of my own engineering work and can show what that looks like day to day.

## Who I work with

**Small businesses and offices** without an IT person, where the network, the backups, the website and the shared drive were each set up once by someone who has since moved on. I start by writing down what is there.

**Research labs**, where the postdoc is also the sysadmin, the queue is three days long for a large-memory job, and the data lives on two laptops. I take blocks of hours on a purchase order, which keeps it inside a grant line.

**Startups**, usually before the first infrastructure hire, when the cloud bill is growing faster than headcount. I tend to begin with a two-day audit paid out of the savings it finds.

**Manufacturers and R&D groups** with more simulation than the CAE team can get through, or a test rig that needs instrumenting: compressible and high-temperature gas dynamics, droplet formation and jetting, conjugate heat transfer, multiphase flow. Studies are fixed-price and scoped in a free week.

**Individuals** with a project: a new workstation or home server, a home network that keeps dropping out, files to move off an old machine.

## Selected work

**Hardware and test.** At DEKA I wrote the Arduino and Python interface that read a prototype linear encoder over SPI and logged it in real time, and upgraded the fixture that tested it to meet the subsystem's tolerance requirements. I used OpenFOAM to find the root cause of air coming out of solution in infusion-pump tubing, and built hyperelastic models of the tubing from load tests I ran. At home I run several Proxmox servers and two ZFS file servers on used enterprise hardware. When one of the file servers hung for ten and a half hours while still answering ping, I traced the repeat hangs to its NFS service stalling on large replies, fixed it, and changed my monitoring to check that data actually comes back. This September I grew a storage pool from five disks to six in place, then rehearsed a disk failure to prove the hot spare would take over on its own.

**Software and test automation.** At Ansys I led testing of a new, business-critical cloud feature on short notice: twelve test cases, and more than twenty defects reported and resolved to meet its acceptance criteria. I rewrote the team's daily regression workflow in Azure DevOps, which doubled how often it ran. More recently I built the website for a family-owned deli in Lebanon, and a tool that turns a builder's PDF drawing set into a 3D walkthrough that opens in any browser.

**Cloud and operations.** At the simulation-software company where I work, I moved the customer platform onto AWS this summer and built a replica of production that the whole test suite runs against on every pull request. In September a two-day audit of the company's cloud account found about 31% of the monthly bill in savings, and changes worth an estimated $414 a month were in place two days later. Before an idle-shutdown policy touched production, I replayed it against 63 days of history; it would have stopped nothing that was about to be used.

**Research.** Two of my changes are merged into [MFC](/projects/mfc-contributions/), an open-source solver for compressible multiphase flow and a 2025 Gordon Bell Prize finalist. One fixed a ten-month-old bug that corrupted grid coordinates in post-processing. I have run [3D droplet collisions](/projects/droplet-coalescence/) at up to 96 million cells on about 24 A100 GPUs on NCSA's Delta supercomputer, and a stretched grid I set up ran the same collision about 2.9 times cheaper.

References on request.

## How I work

Scope is written down before work starts: one page with the deliverable, the price and the date. Things are verified by doing them. A backup is proven by a restore, a fix by reproducing the failure first and watching it go away, and a green dashboard is not evidence. Everything I build is documented and handed over, so you can leave at any time. I work business hours and do not sell around-the-clock coverage I cannot honestly provide.

## Rates

| Engagement | Terms | Rate |
|---|---|---|
| Hourly | Any of the above, remote or on site in the Upper Valley; one-hour minimum | $125 an hour |
| Day rate | On site with your team | $1,200 a day |
| Fixed-price project | Builds, websites, migrations, instrumentation; written scope and price before work starts | quoted per project |
| Fractional infrastructure | 10 to 20 hours a month, business hours, named contact | $3,000 to $6,000 a month |
| Cloud-bill audit | Two days, written findings, savings implemented on approval; no fee if there are no savings | 20% of first-year savings |
| Simulation study | Fixed price, scoped in a free one-week assessment | from $20,000 |

Hardware and parts are billed at cost, with receipts. New Hampshire charges no sales tax on services.

## Getting in touch

Write to [davis@daviscole.com](mailto:davis@daviscole.com). I answer within a business day. A first conversation is half an hour and costs nothing; for anything larger than a few hours, the next step is a written scope and a number.

The rest of this site is personal: [projects](/projects), [writing](/posts), [photographs](/gallery) and [about me](/about).
