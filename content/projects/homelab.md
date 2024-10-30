+++
title = 'Homelab'
date = 2024-10-29T19:22:29-04:00
draft = false 
+++

Given that fluid simulation is typically resource intensive, I always had dreams of building my own cluster/supercomputer. After being exposed to more IT-related work in my role with Ansys, I found an excuse to spend too much money on computer hardware.

# Hardware
Expand tags for more info

{{< details `battlestation` >}}
My primary desktop workstation for productivity and gaming, dual boots Debian 12 and Windows 10
- AMD Ryzen 5800X3D 8c/16t
- ASRock X570 Phantom Gaming 4
- 4x 16 GB DDR4-3200
- XFX 7900XTX 24 GB
- 2x 2 TB NVMe SSDs
- Lian Li O11 Air Mini ATX chassis
{{< /details >}}

{{< details `foam` >}}
Rack-mounted dual-socket system spec'd as much as my wallet allows, runs Debian 12
- 2x AMD EPYC 7K62 48c/48c
- ASRock Rack ROME2D16-2T 
- 16x 64 GB ECC DDR4-3200 
- 1 TB NVMe SSD
- Supermicro CSE-826 2U chassis
{{< /details >}}

{{< details `pve` >}}
Rack-mounted dual-socket system for virtualization, runs Proxmox
- 2x AMD EPYC 7532 32c/64t
- Supermicro H12DSi-NT6
- 8x 64 GB ECC DDR4-3200 
- 512 GB NVMe SSD
- Supermicro CSE-826 2U chassis
{{< /details >}}

{{< details `reservoir` >}}
TrueNAS Scale box for network storage
- AMD Ryzen 5 3600 6c/12t
- ASRock Rack X570D4U-2L2T
- 4x 16 GB DDR4-3200
- 2x 58 GB Optane P1600X mirrored boot drives
- 7x 14 TB HDD RAID-Z2, 1x spare
- Fractal Node 804 mATX chassis
{{< /details >}}

{{< details `minis` >}}
Low-powered mini PCs currently used in a Proxmox cluster for most home server applications
- 3x Beelink EQ12
    - Intel N100 4c/4t
    - 16 GB DDR5-4800
    - 500GB NVMe SSD
{{< /details >}}

{{< details `compute` >}}
Underutilized PC that has been rock solid, runs DietPi
- AMD EPYC 7F32 8c/16t
- AsRock Rack ROMED8-2T
- 256 GB DDR4
- 500GB NVMe Proxmox boot drive
- Fractal Define 7 ATX chassis
{{< /details >}}

# Applications

- Blog: Hugo
- AI stack: Open WebUI + Ollama
- Media server stack: Jellyfin + *arr apps
- File server: NFS/SMB shares
- Git repo: Gitea, GitLab
- Password vault: Vaultwarden
- Collaborative Markdown editor: CodiMD
