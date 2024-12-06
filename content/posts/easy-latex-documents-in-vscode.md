+++
title = 'Easy LaTeX Documents in Vscode'
date = 2024-12-01T17:11:30-05:00
draft = false
+++

Something I realized too late in life is that Microsoft Word sucks.
It does the bare minimum of being dead simple and accessible, but when writing longer papers with many figures and references, I found Word clunky.

I had used $\LaTeX$ for my resume starting my sophomore year, but since I relied heavily on templates, I never used it for anything else.

Upon moving to Iceland, I met a fellow engineering student named Johannes, who was a huge $\LaTeX$ nut. 
The university had an Overleaf account, which he wrote homework and paper templates for, and he even recreated the university logo using TikZ.
I spent a good amount of time with him, and picked up his habit.

While Overleaf is a fine solution, I prefer having my documents local, which led me to develop this method.

# Dependencies

- [VSCode](https://code.visualstudio.com/download) / [VSCodium](https://vscodium.com/#install)
- [Tex Live](https://www.tug.org/texlive/)
- [LaTeX Workshop extension](https://marketplace.visualstudio.com/items?itemName=James-Yu.latex-workshop)

# macOS

If you don't already have the Homebrew package manager installed, start with this:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
Now install TeX Live, a popular TeX distribution:
```bash
brew install texlive
```
If you haven't installed [VSCode](https://code.visualstudio.com/download) already, click the link and install it.

Next, click the Extensions icon in the sidebar and search Latex Workshop.
Click install, and now you should be able to click the green run icon to generate PDFs from `.tex` files.