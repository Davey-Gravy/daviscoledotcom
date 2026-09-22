+++
title = 'Teaching a Trackball Keyboard My Layout'
date = 2026-09-15T18:00:00-04:00
draft = true
summary = 'Porting a Dactyl layout to a ZMK trackball split: a firmware editor that cannot flash, a board with no reset button, a scroll knob debugged by logging USB reports, and an auto-mouse layer.'
tags = ['computing', 'keyboards']
+++

<!-- Images: drop them in this folder (content/posts/cck-ball-keyboard/) and reference by filename, e.g. ![alt](studio-stock.webp). Page bundle so the render-image hook can read their dimensions. -->

<!-- IMAGE: the CCK Ball on the desk next to the Dactyl, both halves visible -->

## The setup

<!-- SCAFFOLD: one paragraph. Why a second keyboard at all; what the CCK Ball is. -->

- **The board:** WK CCK BALL (ArtSplitLab), a 60-key wireless split running ZMK, nice!nano
  controllers, a PMW3610 trackball above the right thumb cluster, and an EC11 knob on each half.
- **The incumbent:** a Dactyl PRO 52&64 on QMK/Vial, layout tuned over weeks, muscle memory
  already paid for.
- **The goal:** don't learn a second layout. Make the new board answer to the old one.

## Starting point: what the stock layout couldn't do

<!-- IMAGE: ZMK Studio showing the stock layout -->

- **No `-`, `=`, `[`, `]` or backtick anywhere**, on any layer. A 60-key board that can't type a hyphen.
- **Enter on a thumb key**, which I'd already ruled out on the Dactyl after too many premature sends.
- **Hold-F to switch the ball to scroll**, a hold behaviour on a home-row letter.
- **Cmd in the bottom-left corner**, the QWERTY position, which is wrong on macOS with thumbs available.

## Detour 1: ZMK Studio is not a flashing tool

<!-- SCAFFOLD: the expectation vs the reality. Short. -->

Studio edits the keymap of the firmware that's already running, and saves the changes into the
board's own settings. That covers key bindings and nothing else:

| Studio can change | Studio can't |
| --- | --- |
| What each key sends | Knob (encoder) bindings |
| Layer names, adding/removing layers | Trackball settings, scroll and precision modes |
| Anything built into the firmware | Anything that needs a rebuild |

Since I wanted the left knob to become a scroll wheel, a rebuild was unavoidable. At that point the
whole layout may as well live in the keymap file, in git, instead of half in board settings.

**And a gotcha worth its own paragraph:** Studio's saved changes survive reflashing and override the
new firmware. They're stored as references to key actions *inside the firmware that was running when
you saved*, so after a rebuild those references can point at nothing. One of my keys went silently
dead this way — Studio drew it blank, the firmware had Escape on it, and pressing it did nothing.
"Restore Stock Settings" (the trash icon) clears the lot.

<!-- IMAGE: Studio showing the blank key -->

## Detour 2: flashing a board with no reset button

<!-- SCAFFOLD: the chicken-and-egg. Keep it wry. -->

A nice!nano takes firmware in bootloader mode, normally entered by double-tapping reset. This case
has no reset button. Options, in order of preference:

1. **Bind a `Bootloader` key** in Studio and press it.
2. **Short RST to GND twice** with tweezers, if you're willing to open the case.
3. **Put a Bootloader key in the keymap**, so it's always there. I ended up with two, one per half,
   after the first one landed on a key that turned out to be dead.

Copying the firmware looks like a failure and isn't:

```
cp: could not copy extended attributes to /Volumes/NICENANO/zmk.uf2: Device not configured
```

The bootloader flashes and reboots the instant the file is written, so the drive disappears before
`cp` can copy the Mac's file metadata. The firmware is already on it.

## The knob: three bugs stacked on each other

<!-- SCAFFOLD: the best part of the story. Measurement over guessing. -->

Making the left knob a scroll wheel is one line of devicetree. Making it *feel* right took three
attempts, because I was tuning by feel through an accumulating pile of wrong assumptions.

**What I assumed:** the knob's electrical steps per click, how many scroll reports ZMK emits per
click, and how macOS scales them. **What I should have done first:** measure.

A ~40-line Swift program with a `CGEventTap` and an `IOHIDManager` logs every scroll event macOS
sees plus the raw USB reports from the keyboard. Ten slow clicks of the knob produced:

```
43.508 HID wheel page=1 usage=56 v=-4
43.509 CG scroll line=1 pt=1 cont=0
```

One report. For ten clicks. The three problems:

- **Trigger rate.** ZMK fires a scroll event every N electrical steps of the encoder; my N assumed a
  detent was four steps, but these knobs produce about one. So it took several clicks to fire once.
- **Rounding to nothing.** The scroll "speed" was so low that a single short event rounded down to
  zero, and the leftover was discarded when the event ended. Each click scrolled 0 or 2 lines,
  effectively at random.
- **macOS shrinks slow events.** A lone wheel report of 4 becomes one line on screen. Report *count*
  matters far more than the value in each one.

After the fix, the same test logged 240 reports, two per click, every click identical:

```
580.171 HID wheel page=1 usage=56 v=2
580.187 HID wheel page=1 usage=56 v=2
```

<!-- SCAFFOLD: the moral. Measure the actual signal, not your model of it. -->

## Reaching parity with the Dactyl

<!-- IMAGE: the two layouts side by side, keymap-drawer or similar -->

With the mechanics working, the layout became a translation exercise: a Vial `.vil` file on one side,
a ZMK `.keymap` on the other. The four alpha rows and both extra layers transfer exactly — a script
compared all 144 keys, which beats checking them by eye.

- **Base rows:** identical, punctuation included.
- **Nav layer:** ESDF and IJKL arrows, word and line jumps, Mission Control and Spaces.
- **Fn layer:** clipboard screenshots, F1–F12, media, brightness.
- **The tap/hold trick:** tap for right click, hold for the nav layer. The one hold behaviour I
  accept, because it's on a key I rarely tap by accident.

### Where parity ends: the thumbs

The Dactyl has 11 thumb keys. This board has 6, and the right thumb is busy driving the ball.

| | Dactyl | CCK Ball |
| --- | --- | --- |
| Left thumb | Space, Bksp, LClick, RClick/Nav, Cmd, Opt | Bksp, Space, RClick/Nav |
| Right thumb | Shift, Cmd, Fn | Fn, Shift, Cmd |

Something had to give. <!-- SCAFFOLD: which compromise you picked and why -->

## The auto-mouse layer

<!-- SCAFFOLD: the resolution. This is the interesting design idea; give it room. -->

The way out of the thumb shortage: the trackball driver can switch on a layer *by itself* when the
ball moves, and switch it off a set time after it stops. So the left thumb is Backspace / Space /
right click while typing, and middle / left / right click while the ball is moving. Nothing to hold,
and the keys are in the same place either way.

The one tunable is the timeout, and both ends of the range fail in their own way:

- **Too short:** stop, aim, click — and you type a space instead.
- **Too long:** finish mousing, reach for space, and you click instead.

I'm running 0.8 s. <!-- SCAFFOLD: update with how it actually feels after a week -->

## What I'd tell myself at the start

<!-- SCAFFOLD: 3-4 bullets, keep them earned rather than generic -->

- **Measure the signal before tuning it.** Three of my four knob attempts were guesses at a number I
  could have logged in ten minutes.
- **Firmware is the source of truth; GUI edits drift.** Studio's convenience costs you a copy of the
  layout that doesn't exist in git and silently outranks the one that does.
- **Put the bootloader key in the firmware**, before you need it.
- **Copying a layout is mostly mechanical** — and the interesting 10% is where the hardware differs,
  not where it matches.

<!-- IMAGE: final layout diagram, both layers -->

The whole layout, layer by layer, lives on its own page: [the CCK Ball field guide](/cck-ball/).

---

*Firmware and keymap: <!-- LINK: repo --> · Built on ZMK 0.3.0 with the pmw3610 driver.*
