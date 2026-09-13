+++
title = 'Deleting 108,498 Emails Without Losing One'
date = 2026-09-11T11:00:00-04:00
draft = false
summary = "I wrote a tool to clear thirteen years of junk out of my inbox. The backup rule held; the server's Trash did not."
tags = ['computing']
+++

<!-- TODO: decide whether to publish the code. If you do, start a fresh repo: the working folder holds a credentials file and the full mail backup. -->

My Comcast inbox held 130,095 messages going back to 2013. Every single one was marked as read, so "unread" was no help, and only 3,103 of them (2.4%) had ever been replied to. Volume peaked in 2022, when 18,202 messages arrived. The junk had been winning for years: bulk mail was 45% of what arrived in 2013, 62% by 2016, and 88% by 2022.

Any mail client will delete mail if you can tell it which mail. That's the hard part. A filter that deletes "newsletters" either misses most of them or eats your receipts. So I wrote `mailclean`, about 1,600 lines of standard-library Python plus 69 tests, to back the mailbox up, sort it offline, and only then delete.

## Rules first

Before it could delete anything, I wanted rules the tool couldn't break:

- **No deletion without a verified backup.** A message can only be deleted if a local `.eml` copy exists and its SHA-256 still matches the index.
- **Delete means move to Trash.** The tool never permanently erases anything.
- **Dry run by default.** Nothing moves without `--confirm`.
- **Everything is logged** before the next batch starts.

IMAP has a nasty trap here. Comcast doesn't support IMAP's MOVE command, so "delete" means flag the message and then expunge the folder. Unless the server supports the UIDPLUS extension, a bare expunge destroys *every* flagged message in that folder, not just yours. So the tool refuses to run if it finds messages flagged for deletion that it didn't flag itself.

## Headers first

Downloading 130,000 full messages over IMAP is tens of gigabytes. The headers alone are about 0.4 GB and came down at around 76 messages a second, about half an hour for the lot. So the tool indexes headers first, plans the deletion from headers alone, and only then downloads full bodies for the messages it plans to delete, at about 188 a second. A headers-only record can never authorize a deletion, and both passes resume where they left off.

The header pass crashed 3,500 messages in, on a 2013 message with raw 8-bit bytes in a header, which Python's email library returns as an object instead of a string. I fixed it, resumed, and it's a regression test now.

## Telling a receipt from a newsletter

A bank statement and a marketing blast both come from `no-reply@`. For years the reliable difference was that only the blast carried mailing-list headers like `List-Unsubscribe`. That broke in February 2024, when Gmail and Yahoo started requiring `List-Unsubscribe` on commercial mail, and some shops send order confirmations through the same bulk-mail services they use for marketing.

Across the inbox, a `List-Unsubscribe` header showed up on 86,240 messages, a bulk-mail return address on 80,270, a bulk email service's headers on 78,090, and a no-reply sender on 63,821. What each of those actually means:

- **Tracking return addresses.** When a marketing platform sends you mail, the return address usually carries a token unique to you, so a bounce can be traced back to one recipient: something like `s-<long random string>@bounce.linkedin.com`. People never have addresses like that. It was the strongest single signal, especially for 2013-era mail that predates `List-Unsubscribe`. I kept the test conservative, matching only long, digit-heavy or UUID-shaped tokens.
- **Bulk-mail services.** A list of 30 sending services (Amazon SES and the like) covers most of the rest.
- **The one I couldn't use.** Comcast stamps every message with a one-letter spam code. I spent a while trying to decode it before noticing that one letter, F, was on 64.6% of the inbox while the Junk folder held three messages. Whatever F means, it isn't "spam". The tool records the letter and ignores it unless something else agrees.
- **Protecting conversations.** A soccer team's Google Group carries exactly the same list headers as a marketing blast. So any list I've actually replied to is spared, judged by the "answered" flag my mail client sets, not by `Re:` in the subject. An earlier version counted `Re:`, and affiliate spam gamed it immediately: "Re: Claim your free woodworking video". A list also needs at least three messages and 5% of them answered, so one stray reply can't protect a 4,000-message blast.
- **Rescuing receipts.** An audit of the plan found 3,467 receipts, shipping notices, statements and invoices queued for deletion. A rule that pulls back subjects with an order or reference number or a concrete transaction, unless they also use marketing language ("20% off your order"), brought that down over three rounds: 3,467, then 1,468, then 677, then 573. Most of what's left is the audit over-matching real marketing, so the error now leans toward keeping mail. That's the right direction.

## Then I ran it too early

On August 16, I ran the deletion against a 108,498-message plan, before the receipt rescue existed. It took 14 minutes, 543 batches of 200. The inbox went from 130,103 messages to 21,609: 6.4 GB gone. By the classifier's final rules, that was 102,460 bulk messages, 6,034 transactional ones (receipts, statements, shipping notices), 4 spam, and zero personal mail.

Then I found the second problem. 108,498 messages left the inbox, but Trash only grew by about 75,700. Comcast had silently dropped roughly 32,800 of them, and there's no quota API to ask why.

It didn't matter, because of the first rule. All 108,498 deleted messages had verified local copies. I added a `restore` command that re-uploads from the backup with each message's original server timestamp, so restored mail sorts where it belongs instead of showing up as today's, and that strips any flags that would get a message deleted again on arrival. By 8:38 that evening, 7,376 receipts and statements (387 MB) were back, with no failures and no duplicates.

Even the audit log fibbed a little. A second run against a smaller plan logged moves for messages that were already gone, so the log recorded 209,626 moves for 108,498 messages. The tool now checks which messages still exist before it moves anything.

## What I took from it

- **The safety net that counts is the one you control.** On Comcast, "move to Trash" is not an undo.
- **Test new rules against the real mailbox, not the one in your head.** Every pattern I wrote from memory missed something: `confirm\b` misses "CONFIRMED", and `\bstatement` misses "eStatement".
- **Err toward keeping.** A missed newsletter costs one more click. A deleted receipt can cost a lot more, and you won't notice until you need it.
