+++
title = 'Model Y Finder'
date = 2026-09-11T11:00:00-04:00
draft = true
summary = 'Pulls used Tesla Model Y listings from seven sites into one page, estimates a fair price for each, and flags the underpriced ones.'
tags = ['computing']
+++

<!-- TODO: only Craigslist works today; the other six sites block this server. -->

My family is shopping for a used Model Y, and the listings are spread across seven sites that each filter and sort differently. So I built one page that gathers them.

- **Collection.** Scrapers for Tesla, CarGurus, Cars.com, Autotrader, Carvana, CarMax and Craigslist feed a SQLite database that tracks price history, spots when a car sells, and removes duplicates by VIN.
- **Pricing.** A model fits price against age, mileage, trim, 7-seat option and seller type, then scores each car by how far below the line it sits.
- **It refuses to guess.** With fewer than 25 comparable listings, or a fit that explains less than half the price variation, it shows blanks instead of scores. A confident "22% below market" built on thin data is worse than no number.
- **Alerts and sharing.** Email or push alerts when a car is new or drops in price, and a web page the family can use from anywhere in the house.

It's a FastAPI app with a command line, on a schedule.

So far only Craigslist works: the other six sites block requests from my server, and routing through a residential proxy would switch them on. With Craigslist alone it found 11 cars, all 360 to 390 miles away.
