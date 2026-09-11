+++
title = 'calcpad'
date = 2026-09-11T11:00:00-04:00
draft = true
summary = 'A notepad-style calculator for engineering students: write math in real notation and watch every line evaluate as you type.'
tags = ['computing', 'open-source']
+++

<!-- TODO: add a screenshot, say why you built it, and replace the template README on GitHub before publishing. -->

calcpad is a desktop calculator laid out like a document. Each line is a math block written in real notation, with fractions, exponents and Greek letters, rather than a string of parentheses. Every block shows its result as you type, variables defined in one block carry into the blocks below it, and the document autosaves to a file.

Built with Tauri 2 and React, using MathLive for the equation editor, the Cortex Compute Engine for the math, and KaTeX to display results.

[Source on GitHub](https://github.com/Davey-Gravy/calcpad)
