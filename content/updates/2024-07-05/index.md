+++
title = '2024 07 05'
date = 2024-07-05T13:38:51-04:00
draft = true
+++

This update is being used to test a video shortcode:

{{< video src="/updates/2024-07-05/my_video.mp4" type="video/mp4" preload="auto" >}}

Thanks to [this link](https://roneo.org/en/hugo-create-a-shortcode-for-local-videos/)

<!--more-->

I am also testing Mermaid.js diagrams:

```mermaid
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
```

Also inline syntax highlighting?

```python
def add (x1, x2):
    return x1 + x2
```