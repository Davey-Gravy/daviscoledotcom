+++
title = 'Homelab'
date = 2025-08-20T19:22:29-04:00
draft = false 
+++

Given that fluid simulation is typically resource intensive, I always had dreams of building my own cluster/supercomputer. After being exposed to more IT-related work in my role with Ansys, I found an excuse to spend too much money on computer hardware.

## Hardware

Expand for more info

{{< collapse `windows` >}}
My primary desktop workstation for productivity and gaming, dual boots Debian 12 and Windows 10
- CPU: AMD Ryzen 5800X3D 8c/16t
- Mobo: ASRock X570 Phantom Gaming 4
- Memory: 4x 16 GB DDR4-3200
- GPU: AMD XFX 7900XTX 24 GB
- Boot drive: 2 TB NVMe SSD
- Case: Lian Li O11 Air Mini ATX chassis
{{< /collapse >}}


{{< collapse `pve` >}}
Rack-mounted dual-socket system spec'd as much as my wallet allows, runs Proxmox VE
- CPU: 2x AMD EPYC 7K62 48c/48c
- Mobo: ASRock Rack ROME2D16-2T 
- Memory: 16x 64 GB ECC DDR4-3200 
- Boot drive: Mirrored WD SN850X 2 TB
- Storage: 5x 14 TB WD HDDs
- Case: Supermicro CSE-826 2U chassis
{{< /collapse >}}

{{< collapse `minis` >}}
Low-powered mini PCs currently used in a Proxmox cluster for most home server applications
- 3x Beelink EQ12
    - CPU: Intel N100 4c/4t
    - Memory: 16 GB DDR5-4800
    - Boot drive: 500GB NVMe SSD
{{< /collapse >}}

{{< collapse `nighthawk` >}}
A secondary Proxmox machine that I really should find a use for
- AMD EPYC 7532 32c/64t
- AsRock Rack EPYC-D8
- Memory: 8x 32 GB ECC DDR4-3200
- Boot drive: 2 TB NVMe SSD
- Lian Li O11 Air Mini ATX chassis
{{< /collapse >}}

## Applications

- Blog: Hugo
- AI stack: Open WebUI + Ollama
- Media server stack: Jellyfin + *arr apps
- Audiobook server: Audiobookshelf
- File server: NFS/SMB shares
- Git repo: Gitea, GitLab
- Password vault: Vaultwarden
- Collaborative Markdown editor: CodiMD

## What's the point?

Traditionally, homelabs have been despised by spouses, roommates, and parents.
They're usually loud, expensive, and take up a lot of space.

This was the case before Intel NUCs and the mini PC form factor became mainstream and cost-effective.

The same way a woodworker has a shop, the musician a studio, and the writer a study, a computer nerd has a homelab.
It is simply a tool for working on projects.

Just how a wood sculpture could require drills, routers, and chisels, a given application could require a specific type of computer or operating system.

The Beelink Mini PCs run on Intel N100 processors, which are praised for performance per watt and the QuickSync media transcoding abilities offered by the integrated GPU.
This makes them great candidates for streaming video using something like Plex, Jellyfin, or Emby.

My homelab allows me to stream audiobooks, TV shows, and movies without subscription fees, ads, or user tracking while getting me familir with technologies like virtualization, containerization, networking, and hardware.