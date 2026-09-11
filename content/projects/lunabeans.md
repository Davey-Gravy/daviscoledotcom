+++
title = 'lunabeans'
date = 2026-09-11T11:00:00-04:00
draft = true
summary = 'A one-day hackathon project: search YouTube, pull the transcripts, and summarize them with a local LLM.'
tags = ['computing']
+++

<!-- TODO: add the event name and what you personally built. Revoke the Google API key in search.py before linking the repo anywhere. -->

On April 28, 2024, four of us built lunabeans in a day. It searches YouTube, pulls each video's transcript, summarizes it with a local LLM through Ollama, and stores embeddings in MongoDB so you can search the summaries by meaning instead of by keyword. I wrote 12 of the team's 28 commits.

Python, the YouTube Data API, youtube-transcript-api, Ollama, sentence-transformers and MongoDB, run with Docker Compose.
