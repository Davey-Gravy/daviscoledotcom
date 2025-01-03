+++
title = 'Homelab'
date = 2024-10-29T19:22:29-04:00
draft = false 
+++

Given that fluid simulation is typically resource intensive, I always had dreams of building my own cluster/supercomputer. After being exposed to more IT-related work in my role with Ansys, I found an excuse to spend too much money on computer hardware.

## Hardware
Expand tags for more info

{{< collapse `battlestation` >}}
My primary desktop workstation for productivity and gaming, dual boots Debian 12 and Windows 10
- CPU: AMD Ryzen 5800X3D 8c/16t
- Mobo: ASRock X570 Phantom Gaming 4
- Memory: 4x 16 GB DDR4-3200
- GPU: AMD XFX 7900XTX 24 GB
- Boot drive: 2 TB NVMe SSD
- Case: Lian Li O11 Air Mini ATX chassis
{{< /collapse >}}

{{< collapse `foam` >}}
Rack-mounted dual-socket system spec'd as much as my wallet allows, runs Ubuntu 22.04
- CPU: 2x AMD EPYC 7K62 48c/48c
- Mobo: ASRock Rack ROME2D16-2T 
- Memory: 16x 64 GB ECC DDR4-3200 
- Boot drive: 1 TB NVMe SSD
- Case: Supermicro CSE-826 2U chassis
{{< /collapse >}}

{{< collapse `pve` >}}
Rack-mounted dual-socket system for virtualization, runs Proxmox
- CPU: 2x AMD EPYC 7532 32c/64t
- Mobo: Supermicro H12DSi-NT6
- Memory: 8x 64 GB ECC DDR4-3200 
- Boot drive: 512 GB NVMe SSD
- Case Supermicro CSE-826 2U chassis
{{< /collapse >}}

{{< collapse `reservoir` >}}
TrueNAS Scale box for network storage
- CPU: AMD Ryzen 5 3600 6c/12t
- Mobo: ASRock Rack X570D4U-2L2T
- Memory 4x 16 GB DDR4-3200
- Boot drive: Mirrored 58 GB Optane P1600X 
- Storage: 7x 14 TB HDD RAID-Z2, 1x spare
- Case: Fractal Node 804 mATX chassis
{{< /collapse >}}

{{< collapse `minis` >}}
Low-powered mini PCs currently used in a Proxmox cluster for most home server applications
- 3x Beelink EQ12
    - CPU: Intel N100 4c/4t
    - Memory: 16 GB DDR5-4800
    - Boot drive: 500GB NVMe SSD
{{< /collapse >}}

{{< collapse `blackbird` >}}
Underutilized PC that has been rock solid, runs Ubuntu 22.04
- AMD EPYC 7F32 8c/16t
- AsRock Rack ROMED8-2T
- Memory: 8x 32 GB ECC DDR4-3200
- Boot drive: 2 TB NVMe SSD
- Fractal Define 7 ATX chassis
{{< /collapse >}}


## Applications

- Blog: Hugo
- AI stack: Open WebUI + Ollama
- Media server stack: Jellyfin + *arr apps
- File server: NFS/SMB shares
- Git repo: Gitea, GitLab
- Password vault: Vaultwarden
- Collaborative Markdown editor: CodiMD

## Future Goals

- Build private cloud
    - Kubernetes
    - SLURM
