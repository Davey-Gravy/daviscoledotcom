+++
title = 'How to Deploy a Blog'
date = 2025-01-19T20:17:46-05:00
draft = false
+++

This post outlines how to deploy a Hugo blog using GitHub and CloudFlare Pages. This is because I prefer managing my domains on CloudFlare, and they make it really easy to set up a free worker to run a static website.

## Configure Hugo locally

### Install Hugo

Hugo is "The world's fastest framework for building websites". It's a simple static site generator, which is perfect for a personal blog or portfolio, something I think most professionals would benefit from having.

This is what I've found easy. If you prefer Astro, NextJS, Gatsby, etc., go for it, many steps will be very similar.

#### macOS

```zsh
brew install hugo
```

#### Ubuntu/Debian derivatives

Since `apt` lags behind most other package managers, grab the `.deb` directly from Github:

```zsh
# replace <version>
wget https://github.com/gohugoio/hugo/releases/download/v0.<version>.0/hugo_0.<version>.0_linux-amd64.deb
sudo apt install -y hugo_0.<version>.0_linux-amd64.deb
```

#### Windows

Just use WSL and follow above.

### Create a Hugo site

Create a repos directory:

```zsh
mkdir ~/repos && cd repos
```

Now create your first Hugo site:

```zsh
hugo new site mySite
```

A new directory, `~/repos/mySite` should be present and populated with Hugo files.

Next, create a theme:

```zsh
hugo new theme myTheme
```

The `themes/` directory should contain `myTheme` now.

Finally, append `theme = 'myTheme'` to hugo.toml:

```zsh
echo "theme = 'myTheme'" >> hugo.toml
```

The web server now can be started with `hugo serve`, and is accessible at `localhost:1313`.

We have a working site!

At this point, it would be smart to start a Git repository to store our known working revision:

```zsh
# in ~/repos/mySite
git init .
git add .
git commit -m "first commit"
```

We don't have a Git remote yet, so no need to push. We will be addressing that now.

## Preparing Hugo for the cloud

### Revision control

I assume that if you've made it this far, that you probably have a GitHub account. Create a new repo called mySite and set it as the Git remote, then push to the `main` branch:

```zsh
# replace <username> 
git remote add origin https://github.com/<username>/mySite.git
git push -u origin main
```

### Web hosting

Many of you won't have a Cloudflare account. [Create an account](https://www.cloudflare.com/). 
This may be useful for you going forward.
Cloudflare offers free static website hosting though [Pages](https://pages.cloudflare.com/)

Once signed into [dash.cloudflare.com](https://dash.cloudflare.com), scroll down the sidebar and select *Compute (Workers)* -> *Workers & Pages*.

Select *Create*, choose the *Pages* tab, then import your repository.
Link your GitHub account then choose *mySite*.

Set the web framework to Hugo and continue.

#### Custom domains (optional)

If you'd like to remove `.pages.dev` from your website URL

choose and register a domain you like under *Domain Registration* in the left sidebar. They're cheap, on the order of $10/year, so don't have so much anxiety choosing the right one.

At the dashboard homepage, find *Compute (Workers)* and click *Workers & Pages*. Click *Create*.

Choose the *Pages* tab and connect your GitHub repo. Leave everything default and let it build and deploy.

Congratulations! You've just deployed a web application to the cloud with continuous integration!

Now you can point your custom domain to this Page, which will give it HTTPS and an SSL certificate.
