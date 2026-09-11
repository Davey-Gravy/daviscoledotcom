+++
title = 'InvestView'
date = 2026-09-11T11:00:00-04:00
draft = true
summary = 'A self-hosted portfolio tracker that pulls brokerage holdings and transactions and pairs them with market data.'
tags = ['computing']
+++

<!-- TODO: the repo lives on your CoolSim GitHub account; move it to a personal account before linking it. The older statement-extractor repo has real account data committed; strip it before making that public. -->

InvestView is a full-stack portfolio tracker: a Django REST backend, a React frontend, Celery for scheduled jobs, and PostgreSQL and Redis, all in Docker Compose behind nginx. It imports transactions and cash balances from Schwab through their OAuth API, backfills historical portfolio snapshots from the transaction history, and pulls market data from Alpaca.

It replaced an earlier, blunter approach: a script that reads Schwab statement PDFs with pdfplumber and loads every holding and transaction into SQLite.
