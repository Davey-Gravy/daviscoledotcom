+++
title = 'Pulling My Solar Data'
date = 2026-09-11T11:00:00-04:00
draft = true
summary = 'A small tool that downloads every 5-minute reading our solar inverter has stored: 919 days, no gaps.'
tags = ['computing', 'homelab']
+++

<!-- TODO: add a production chart from ~/fronius/daily_summary.csv. -->

The solar array at home runs through a Fronius inverter that keeps about two and a half years of 5-minute production data and serves it over a local API. `fronius.py` pulls live readings, a single day, a date range, or the whole archive, and it can resume if interrupted. The full export is 151,984 readings over 919 days, from February 21, 2024 (as far back as the inverter keeps) to August 27, 2026, with no gaps.

Some quirks, if you own one:

- **It doesn't answer ping**, so network scans miss it. Query the API directly.
- **Whole-system archive queries sometimes fail** with a firmware error ("installing device with invalid nodetype"). Asking for the single inverter instead returns the same data, so no days are lost.
- **The power-stage temperature reads garbage** (up to 255 °C) for a few minutes at dawn while the inverter wakes up, in about 0.26% of samples.

By the inverter's own count, it produced 9,701 kWh in 2025.
