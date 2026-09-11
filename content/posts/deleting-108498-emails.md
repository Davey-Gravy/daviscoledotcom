+++
title = 'Deleting 108,498 Emails Without Losing One'
date = 2026-09-11T11:00:00-04:00
draft = true
summary = "I wrote a tool to clear thirteen years of junk out of my inbox. The backup rule held; the server's Trash did not."
tags = ['computing']
+++

<!-- TODO: decide whether to publish the code. If you do, start a fresh repo: the working folder holds a credentials file and the full mail backup. -->

My Comcast inbox held about 130,000 messages going back to 2013. When I finally sorted them, 82% turned out to be bulk mail: newsletters, promotions, and notifications from things I signed up for once.

Any mail client will delete those if you can say which ones they are. That's the hard part, so I wrote a tool for it: `mailclean`, about 1,600 lines of standard-library Python plus 69 tests.

## Rules first

Before it could delete anything, I wanted rules the tool can't break:

- **No deletion without a verified backup.** A message can only be deleted if a local `.eml` copy exists and its SHA-256 still matches the index. A headers-only backup can never authorize a deletion.
- **Delete means move to Trash.** The tool never permanently erases anything.
- **Dry run by default.** Nothing moves without `--confirm`.
- **Everything is logged** before the next batch starts.

## Telling a receipt from a newsletter

A bank statement and a marketing blast both come from `no-reply@`. For years the reliable difference was that only the blast carried mailing-list headers like `List-Unsubscribe`. That broke in February 2024, when Gmail and Yahoo started requiring `List-Unsubscribe` on commercial mail. Some shops also send order confirmations through the same bulk-mail services they use for marketing.

What worked:

- **Bounce addresses.** Bulk senders put a per-recipient tracking token in the return address (`s-<token>@bounce.linkedin.com`). Humans never look like that. It was the strongest single signal, especially for old mail that predates `List-Unsubscribe`.
- **Protecting conversations.** A soccer team's Google Group has the same list headers as a marketing blast. So any list I've actually replied to is spared, judged by the "answered" flag my mail client sets, not by `Re:` in the subject. An earlier version counted `Re:`, and affiliate spam gamed it immediately: "Re: Claim your free woodworking video".
- **Rescuing receipts.** Subjects with order numbers or real transaction events get pulled back out of the bulk pile, unless they also use marketing language ("20% off your order").

## Then I ran it too early

I ran the deletion against a 108,498-message plan before the receipt rescue was finished, so bank statements and shipping notices went too. The inbox went from 130,103 messages to 21,609.

Then I found the second problem. 108,498 messages left the inbox, but Trash only grew by about 75,700. Comcast had silently dropped roughly 32,800 of them, and there's no quota API to ask why.

It didn't matter, because of the first rule. All 108,498 deleted messages had verified local copies. I added a `restore` command that re-uploads from the backup with each message's original server timestamp, so restored mail sorts where it belongs instead of showing up as today's. It also strips flags that would get a message deleted again on arrival. 7,376 receipts and statements (387 MB) went back in.

## What I took from it

- The safety net that counts is the one you control. On Comcast, "move to Trash" is not an undo.
- Test new rules against the real mailbox, not against what you think is in it. Every regex I wrote from memory missed something: `confirm\b` misses "CONFIRMED", and `\bstatement` misses "eStatement".
