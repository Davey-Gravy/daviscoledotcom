+++
title = "Garbage-Collecting My AI Assistant's Memory"
date = 2026-09-11T11:00:00-04:00
draft = false
summary = 'My coding agents keep notes between sessions. When the notes outgrew what the agent reads at startup, it started forgetting without telling anyone, so I built a nightly cleanup.'
tags = ['computing']
+++

<!-- TODO: the repo is private because it holds the memories themselves. To link code, split the ~340 lines of tooling into a new public repo. -->

I use Claude Code as a lab assistant across about a dozen projects: research code, my homelab, side projects. Between sessions it keeps notes in a memory folder for each project, one fact per file, plus an index file it reads at the start of every session. That index is how it knows what it knows.

In early July, my biggest project's index had grown to 29.8 KB. The agent reads roughly the first 24.4 KB of that file at startup, and everything past that point silently dropped out of its context. No error, no warning. It just stopped knowing things it had written down, and kept confidently working without them. I trimmed that index by hand to 16.1 KB, and then built something so I'd never have to do that again.

## Memories fade; lessons remain

The design borrows from how people remember. Finished work shouldn't stay in full detail forever, but what it taught should stick around. The system has three parts.

**A guard on every write.** An 85-line shell hook runs whenever the agent writes a memory file. It checks the index size (a warning at 16 KB, an alarm at 20 KB), flags duplicate or broken links and files missing from the index, and sends any problem straight back to the session that caused it, while it still has the context to fix it. It has fired 556 times across 191 sessions.

**A nightly cleanup.** At 3 a.m., cron starts a headless Claude run that follows a 90-line policy. It skips any project touched in the last hour, so it never fights a live session. It folds raw end-of-session notes into proper entries. It cuts finished work down to a one-line lesson after about two weeks, and after four to six weeks moves the details to an archive and keeps the lesson in a file grouped by theme. Preferences, feedback and open work never fade. When an index goes over budget, the timers shorten to one and three weeks. The policy's phrasing is that escalation "changes *when* things fade, never *whether*."

**Git as the undo button.** Every run commits before and after, so `git log` is the report. Archiving moves files and never deletes them. The runner merges with the remote copy before the agent starts and skips the run if the two have diverged, and it double-checks mechanically for files the agent forgot to index. Anything odd goes to an anomalies file and a push notification.

One gotcha set the whole layout: Claude Code won't let a headless session write inside its own settings directory, so the memories had to move to a separate repo and be linked back in.

## Two months in

The repo has 305 commits since July 7, and 278 of them are the cleanup agent's own. It has run on 65 nights, usually for about ten minutes. It has archived 292 files and distilled 39 lesson files, leaving 236 live notes. My research project's index went from 16.6 KB to 6.1 KB. All of the tooling together is 339 lines.

## What it caught, and what it got wrong

The anomalies file is the best part. There were 73 anomaly reports in nine weeks, on 52 of 63 nights.

- **Night one** exited with an error before doing anything, because the command-line parser swallowed the policy file's header. Once that was fixed, it discovered it could read everything and write nothing, including the anomalies file itself.
- **It nagged, then muted itself.** It flagged a simulation run whose notes still said "active" forty days after launch. After five nights, it recommended muting its own warning, since repeating the same unresolved fact "isn't adding signal."
- **It corrected itself.** One night it retracted a flag it had raised two nights earlier, after finding newer evidence in a different note. It also caught a memory claiming a fix had shipped when later notes showed it hadn't.
- **It buried the lede.** For four nights, pushes to the remote failed because the runner never fetched first. The only sign was the phrase "git push failed" at the end of a roughly 2,000-character report line.
- **Sessions kept making orphans.** Twice, a live session deleted index lines without moving the files they pointed at: 35 files one night, 20 another. The lesson about exactly this was already written down, and got relearned anyway.
- **Its arithmetic drifts.** On September 7 it described something as starting "08-27 (~6 weeks)" ago.

## Is it working?

Partly. An audit on September 8 found that the notes are read less than they're written. 245 of 607 sessions opened at least one note. 122 of 237 notes written by sessions were never read again, and 28 of the 38 lesson files had never been opened. Notes written from the shell also slip past the guard entirely.

And the original problem is back. That same big index crossed the 20 KB alarm on August 31 and reached 25.3 KB on September 11, past the read limit again. The cleanup agent has flagged it as structural every night. Fading old entries can't keep up with a project that produces this much new work, and that one needs a person to decide something.
