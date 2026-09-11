+++
title = "Garbage-Collecting My AI Assistant's Memory"
date = 2026-09-11T11:00:00-04:00
draft = true
summary = 'My coding agents keep notes between sessions. When the notes outgrew what the agent reads at startup, it started forgetting without telling anyone, so I built a nightly cleanup.'
tags = ['computing']
+++

<!-- TODO: the repo is private because it holds the memories themselves. To link code, split the ~340 lines of tooling into a new public repo. -->

I use Claude Code as a lab assistant across about a dozen projects: research code, my homelab, side projects. Between sessions it keeps notes in a memory folder for each project, one fact per file, plus an index file it reads at the start of every session.

In July, one project's index grew past about 24 KB, which is as much as the agent reads at startup. Entries past that point quietly dropped out of its context. There was no error and no warning; it just stopped knowing things it had written down.

## Memories fade; lessons remain

The fix borrows from how people remember. Finished work shouldn't stay in full detail forever, but what it taught should stick. The system has three parts:

1. **A guard on every write.** An 85-line shell hook runs whenever the agent writes a memory file. It checks the index size (a warning at 16 KB, an alarm at 20 KB), flags duplicate or broken links and files missing from the index, and sends any problem straight back to the session that caused it.
2. **A nightly cleanup.** At 3 a.m., cron starts a headless Claude run that follows a 90-line policy. It folds raw session notes into proper entries and cuts finished work down to a one-line lesson after about two weeks. After four to six weeks it moves the details to an archive and keeps the lesson in a file grouped by theme. Preferences, feedback and open work never fade.
3. **Git as the undo button.** Every run commits before and after, so `git log` is the report. Archiving moves files and never deletes them. Anything odd goes to an anomalies file and a push notification.

## Two months in

The repo has 305 commits since July 7, and 278 of them are the cleanup agent's own. All the tooling comes to 339 lines.

The anomalies file is the fun part. In its first days, the cleanup agent reported that it couldn't write anything, including the anomalies file itself, because I'd left file-writing permission out of its launch command. Later it flagged a simulation run whose notes still said "active" forty days after launch, and kept flagging it every night until it recommended muting its own warning, since repeating the same unresolved fact "isn't adding signal".
