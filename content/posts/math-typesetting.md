+++
title = 'Math Typesetting'
date = 2024-06-19T17:31:56-04:00
draft = true
+++

## The Navier-Stokes equations

### Conservation of mass

$$
\nabla\cdot\vec{u}=0
$$

### Conservation of momentum

$$
\overbrace{\frac{\partial \vec{u}}{\partial t}}^{\text{unsteady}}+\overbrace{(\vec{u}\cdot\nabla)\vec{u}}^{\text{convective acceleration}}=\overbrace{-\nabla p}^{\text{pressure gradient}}+\overbrace{\nu\nabla^2\vec{u}}^{\text{viscous diffusion}}
$$

### Conservation of energy

$$
\rho c_p \left(\frac{\partial T}{\partial t}+\vec{u}\cdot\nabla T \right) = k\nabla^2 T + \mu\Phi+\dot{q}
$$