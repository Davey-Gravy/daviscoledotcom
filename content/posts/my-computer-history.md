+++
title = 'My Computer History'
date = 2024-07-02T14:54:23-04:00
draft = false
tags = ['computing', 'personal']
summary = 'A colored, tangent-filled history of my history with computers'
+++

# Windows

## Early Days

I grew up a Windows boy.

My earliest computer memory was my grandparents' Windows 98 desktop, playing a World War 1 combat flight simulator game that is on the [r/tipofmyjoystick](https://www.reddit.com/r/tipofmyjoystick/)...

> Investigation
>
> After 15 minutes of digging, the game was [Master of the Skies: The Red Ace!!!](https://oldgamesdownload.com/master-of-the-skies-the-red-ace/)  
> Looking at game footagse, it's honestly quite impressive for a release year of 2000; large maps, dogfighting, bombing runs... games were much simpler back then...

The next set of memories would be with our family's Windows XP Compaq desktop, which I'd use to browse the online Pokédex to stare at Porygon, and attempting to play Toon Town with Pranav, a lost connection from my early childhood.

I'm now blanking on details until middle school, when I spent irresponsible amounts of time on CoolMathGames, miniclip.com, and other Flash game sites on my mom's iMac. Despite this time, I always felt like macOS was just *weird* compared to Windows.

## Getting Curious

Now in high school, I got my first personal laptop, an [Asus Zenbook UX302LA](https://www.notebookcheck.net/Review-Asus-Zenbook-UX302LA-C4003H-Ultrabook.108071.0.html), which came with an Intel i5-4200U, 8GB RAM, a 500GB hard drive, and Windows 8 (ew). It really couldn't do anything beyond basic tasks. Even flash games were a bit too much for it. 
I mainly used this device for writing papers, browsing the web, and rooting Android phones like the Moto G and OnePlus's X and 3.  

Man, the days of browsing [XDA Forums](https://xdaforums.com)... I still remember when [LineageOS](https://en.wikipedia.org/wiki/LineageOS) came out, succeeding the very popular [CyanogenMod](https://en.wikipedia.org/wiki/CyanogenMod). I 'member when phone companies used to cater to the enthusiast power-user commmunity, do you 'member? I 'member bricking my OnePlus X at midnight during the school week, and frantically running commands through `adb` in attempts to revive it. It took till 2 am that one time, but I did have a functional phone by the end of the hack session.

## Power User

Now a sophomore, and having been exposed to r/PCMR and DIY computer communities, I decided to build my first desktop, powered by an AMD FX-6300 and a Radeon R9 280. I have fond memories of finally putting everything together, hooking it up to our basement TV, and getting Battlefield 4 running on it. I would then play hundreds to thousands of hours of CS:GO, exposing myself to skin trading and betting on professional matches, as well as the vices associated with those.  
I would continue to upgrade and iterate on my PC like the Ship of Theseus, up until `<current year>`.

Going into college for mechanical engineering, I wanted a 2-in-1 form factor with power, and the Microsoft Surface Pro 5 had just come out, fitting the bill. I was vaguely aware that the Windows 2-in-1 sector was a bit of a mixed bag (understatement), but I had thought that Microsoft would have figured it out by their fifth iteration. Unfortunately I was incorrect, and the Surface Pro 5 ended up with poor battery life, performance that bordered on *barely* acceptable for SolidWorks and other intensive programs, and a half-baked tablet mode.

In search of a 2-in-1 with a better tablet experience, I got fooled twice by MSFT and tried the Surface Go, equipped with a measly Intel Pentium Gold. All this guy could really handle was light web applications. The form factor was really nice, but its performance made it a non-starter.

In my senior year, I then picked up a Asus ROG Strix G14 GA401. This might be the first laptop that I truly enjoyed using. The UI was snappy whether on battery or plugged in, it handled intensive CAD and engineering simulation programs well, and it retained a portable form-factor.  
Currently my girlfriend's brother is using this for zoomer games. 

This marks the end of my Windows laptop devotion. Through using it for several applications, including gaming, media creation (videos), streaming, and others, I became very familiar with working on Windows.  
I will be forced to continue using Windows on my gaming desktop, as several online games require Windows to be installed on baremetal, rather than on a virtual machine, but as long as corporate America operates on Windows, maintaining exposure will be a value-add.

# macOS

I then returned home from Iceland, started working full time, and found myself with all these spare funds. Apple had already released their M1 chips and everyone was singing its praises, so I was curious how next iteration, the M2 would perform. Upon its release, and learning that some aspects of the M1 laptop are in fact *better* than the M2, I started browsing eBay for refurbished M1 Pro MacBook Pros. I am currently writing this post with that very laptop, having experienced *zero* functional issues with it.  
I do specify "functional" issues, because, perhaps due to indoctrination into the Windows Hive Mind, I have a few qualms with macOS:

## Multitasking and window management

On native Windows, you use `Win + <arrow key>` to split the screen into up to 4 tiles. "Split View" was introduced in macOS Monterey, and splits the screen into two (and only two) resizable windows. This done by clicking and holding the Maximize button of the application window:

![split view](https://help.apple.com/assets/65A8106E7C69B635140E606E/65A81072C0272B1FFA02DE51/en_US/cbc9640c551e7e8d12556206a56b22a1.png "400px")

This also puts you in the maximized window mode, restricting access to the desktop and other apps unless you switch from the split view to your normal desktop window.

Meanwhile on Windows, you can access the desktop while two or three programs are tiled. This isn't even mentioning [PowerToys](https://learn.microsoft.com/en-us/windows/powertoys/), which enables further desktop environment customization.

## The goddamn Finder!!!! It sucks so much!!!

The Windows File Explorer is *much* more feature rich, including an address bar at the top that allows navigation to any directory:

![windows file explorer](https://www.teachucomp.com/wp-content/uploads/blog-5-6-2022-fileexplorerinwindows11.png)

On Mac, `cmd + shift + g` must be used to trigger a popup that allows absolute path navigation:
![command shift g](https://cdn.osxdaily.com/wp-content/uploads/2024/03/command-shift-g-go-to-folder-mac-shortcut-610x340.jpg)

In general, File Explorer &#8811; Finder.

## Program compatibility

Even ignoring the CPU architecture differences that generally separate Windows (amd64) and macOS (arm64), there has always been a gap in support for programs.  
Often, certain apps would be catered for Mac, while others for Windows. This is apparent in engineering software, where Windows and Linux enjoy more usage.
