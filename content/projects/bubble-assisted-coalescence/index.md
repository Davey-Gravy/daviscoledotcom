+++
title = 'Can a Pulsing Bubble Help Droplets Merge?'
date = 2026-09-11T11:00:00-04:00
draft = false
weight = 2
cover = 'geometry.webp'
summary = "I tested whether a pulsing bubble helps water droplets in oil merge faster. It doesn't, and the result that said it did came from the edge of my simulation box."
tags = ['cfd', 'research']
+++

Low-frequency ultrasound is used to break crude-oil emulsions, where water is suspended in oil as tiny droplets. One explanation for why it works: sound makes gas bubbles in the oil pulse, and a pulsing bubble next to two water droplets might help squeeze out the film of oil between them, so they merge sooner. I built a simulation to test that idea. The answer is no, and getting to that answer took more retractions than I'd like.

## The setup

Two water droplets, 50 µm across, approach each other head-on in oil, with a pulsing bubble on the same axis. The simulation is axisymmetric (a 2D slice spun around that axis) and incompressible, in [Basilisk](http://basilisk.fr/). A constant force pushes the droplets together, standing in for the acoustic force that holds a pair of droplets against each other in a sound field.

- **Merging is a threshold, not an event.** Each droplet is tracked separately, so they can't merge in the code. "Merged" means the film has thinned below 1 µm. Real films rupture at 10 to 100 nm, finer than any grid I can afford, so the observable is when the film crosses 1 µm, and the check is that this time converges as the grid gets finer.
- **The bubble is imposed, not simulated.** It's a source of volume with a set radius over time. Outside an isolated pulsing sphere that's the exact solution, so it holds as long as the droplets stay a few bubble radii away. A solved bubble in MFC fared worse when I tried it: its acoustic source inflated the gas mass 68-fold, and its bubble rang 27% high with four times the damping.
- **Incompressible is fine here.** The flow's Mach number is about 0.012, and the sound wavelength is 478 times the bubble's radius.

In real units, one capillary time is 64.5 µs, so a run covers 0.4 to 0.5 ms. The finest validation run took 280,795 time steps and 20.3 hours on 64 cores.

## Gates before results

Nothing ran a real case until it reproduced a problem with a known exact answer:

- The pulsing source reproduces the exact flow around a pulsing sphere to within 1%.
- Two droplets on their own get the pressure jump across a curved surface and a droplet's natural wobble frequency right to within about 1–2%, never merge numerically, and their film converges as the grid is refined.
- With the bubble added, the effect scales with the square of the pulse amplitude, as theory says it should (measured exponent 2.06 ± 0.08, against 2).

![The imposed bubble radius (top) and the flow it produces, measured in the simulation (teal) against the exact prediction (dashed)](validation_bubble_field.webp)

An upgraded bubble model with an actual solid boundary failed one of its seven checks, and chasing that failure turned up two problems in how Basilisk's embedded boundaries handle axisymmetric flow. The source code itself notes that the combination isn't supported. I dropped that model rather than use it.

## The result that wasn't

At the end of July the simulations said the bubble made droplets merge 53% faster, and in early August I rendered a movie of it.

It wasn't the first thing I'd had to take back. Earlier headlines had included an "arrest" of the film that turned out to live below one grid cell, a trend whose sign flipped under refinement, and a film that had drifted out of the refined region of the mesh. Each time the fix was the same: find the numerical cause, withdraw the claim, write down why.

The big one surfaced on August 13. A 47-run parameter sweep had to use a 64-diameter box because a 32-diameter run blew up, and every effect in the sweep came out about 20 times smaller than in the earlier runs. My first explanation was resolution. It only covered a factor of 2.3. The commit message the next day reads: "WITHDRAW the resolution attribution: it is the box, and I had the sign backwards."

The deciding clue was which way the droplets drifted. In the 32-diameter box, the pair drifted *away* from the bubble. In every wider box, 64, 128 and 256 diameters, it drifted *toward* it. The walls of the box held the pressure at zero, which made them reflect the bubble's pressure field back as a mirror-image bubble. In an incompressible fluid, pressure acts instantly everywhere, so that reflection reaches the droplets whatever the box size, and it pulls harder on the near droplet than on the far one. The box had been squeezing the pair together, and the bubble got the credit. Box size had gone unsuspected because the earlier check only compared the standard box with one 1.5 times larger.

{{< loop src="domain-ladder.mp4" poster="domain-ladder.webp" width="1280" height="720" caption="The same simulation in boxes 32, 64, 128 and 256 droplet diameters wide, with identical cells, so only the outer boundary moves. The top strip shows the pulsing bubble and the droplet pair. In the 32-diameter box (red), the film drains fastest and the pair drifts away from the bubble; in every wider box, it drifts toward it." >}}

With the box widened, the "speed-up" disappears (128 and 256 diameters agree to 0.2%). Replace the walls with the bubble's exact far-field pressure and the box size stops mattering at all. The largest remaining assist, +15.4% at 64 diameters, became −20.4% at 128. For a week before this I'd been working through four explanations for *how* the bubble helped, retracting each in turn. In hindsight, they'd mostly been explaining the wall.

![Film thickness with the bubble divided by without it; above 1.0 means the bubble is holding the film open. The 53% headline came from the 32-diameter box; every wider or better-bounded box says the opposite](domain_disproof.webp)

## What survived

With the box fixed, a bubble near the film *slows* drainage: by up to 28% when it sits 3.4 droplet diameters away, fading to nothing beyond about 8. One result holds up in every box: the squeeze needed to merge a pair scales with the oil's viscosity, as lubrication theory predicts, re-verified at 128 diameters to within 0.6%.

Then a back-of-the-envelope check reframed the whole question. At the frequencies and pressures industry actually uses, the acoustic force on a droplet is about 11 piconewtons in the best case, twelve times weaker than the droplet's own buoyancy. That's tens of thousands to hundreds of thousands of times too weak to squeeze a pair together on the millisecond timescale these simulations cover. Reaching the threshold would take about 26 MPa of sound, and at around 1 MPa the sound starts breaking droplets up again. At realistic forces the film takes tens of seconds to drain: about 50 s for 50 µm droplets, and longer for smaller ones.

So the picture changed. Sound gathers droplets and holds them together, the film drains on its own over tens of seconds, and the bottleneck is getting droplets to meet and stay together, not the film. One small coincidence I only noticed afterward: the pulse frequency I'd been using sat at 0.95 times the bubble's natural frequency. Nobody chose that.

## Where it stands

The last simulation finished on August 15. The next step is a decision between three options: a population model of how droplets meet and pair up (cheap equations, not more simulation), a compressible check in MFC, or writing up what's here.
