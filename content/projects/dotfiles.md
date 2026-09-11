+++
title = 'dotfiles'
date = 2026-09-11T11:00:00-04:00
draft = true
summary = 'My zsh setup: fuzzy-finder pickers, git aliases, and a one-command install on a new machine.'
tags = ['computing', 'open-source']
+++

My shell config, [public on GitHub](https://github.com/Davey-Gravy/dotfiles): zsh with fzf/fd pickers, git aliases, zellij completions, and an install script that checks for and installs the tools the config depends on (`install.sh --check` previews without changing anything).

It's tracked as a bare git repo, so the files live where they belong in my home directory with no symlinks, and a `dotfiles` alias is just `git` pointed at that repo. Secrets and per-machine overrides go in an untracked `.zshrc.local`.
