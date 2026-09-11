+++
title = 'My Homelab Fails Silently'
date = 2026-09-11T11:00:00-04:00
draft = true
summary = 'Three outages ran for days to months while every status check said everything was fine. What they had in common, and what I check now.'
tags = ['computing', 'homelab']
+++

<!-- TODO: the hardware list on the Homelab project page is out of date. Refresh it before this post links there. -->

Everything in my [homelab](/projects/homelab/) reports its own health. This summer I found three outages that had been running for days to months, and in every case each layer reported healthy.

## 1. Backups that never happened

Nightly replication from my NAS to a second machine had been failing since about April with a network timeout, because its SSH credential pointed at an old VPN address. I found it on July 12. The task was enabled and scheduled the whole time, and it had never successfully replicated once: the last-snapshot field was empty.

## 2. Media served from an empty folder

One mini PC's NFS mount had been down for months. Its containers use bind mounts, which bind whatever is sitting at the host path, so with the mount gone they bound an empty local directory instead. The media servers served nothing, and anything "saved to the NAS" actually landed on the host's own boot disk. Nothing logged an error.

## 3. A VPN tunnel that said "connected" for three days

My qBittorrent container sends its traffic through a PIA WireGuard tunnel, and around July 28 the tunnel died. I found it on July 31 while looking for something else entirely. The container was running and had never restarted, and qBittorrent's web UI answered normally and reported `connected`. But `wg show` inside the container said the last handshake was 2 days and 23 hours old, on a tunnel set to check in every 25 seconds.

The symptoms were all downstream: one DHT node, 0 B/s in both directions, every magnet link stuck fetching metadata, 19 torrents missing files, and a Sonarr queue of 187 items carrying 3,556 "Failed to import episode" errors. At least it failed closed: traffic stopped instead of leaking out over my home connection.

The container's VPN health check had been switched off. Turning it on and recreating the container brought the handshake back to 3 seconds, DHT nodes from 1 to 272, and throughput from 0 to 14.7 MB/s. One trap: right after reconnecting, qBittorrent said `firewalled`, and it only said `connected` once DHT had filled back in. Read that field too early and you'll think the fix failed.

## What they had in common

Every check I had asked "is this configured?" None asked "is data actually moving?" A running container, an fstab entry, an enabled replication task and a status field that says `connected` are all configuration. None of them tells you whether the bytes arrived.

What I check now:

- **Test the data path, not the config.** Write a file, read it back, delete it.
- **Distrust your own test.** A mount that fails on authentication leaves a plain local directory behind, and a write test then passes against local disk. If a test passes suspiciously easily, check what it actually touched.
- **Judge a tunnel by handshake age, not interface state.** A WireGuard interface stays up with an IP address forever after the other end stops answering.

A health-check script now runs every 15 minutes, checking that snapshots are fresh and that the NFS mount is real NFS. A second script checks every 5 minutes that I can still get in over my VPN. Each one pings an Uptime Kuma monitor only when everything passes, so silence is the alarm.

That turned up a fourth failure: the checker itself hanging. A stuck NFS server doesn't fail a check, it freezes it. During one hang on August 12, cron stacked 42 copies of the health check on top of each other because none of them ever exited. Now every remote check has a timeout, and only one copy can run at a time.
