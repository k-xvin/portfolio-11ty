---
layout: post.njk
title: Experiments in Circle Packing
image: ./src/img/posts/circ_packing/1.jpg
blurb: Generative art variations on circle packing
date: 2022-11-12
---
# Experiments in Circle Packing
<div picture-grid="2">
{% image "./src/img/posts/circ_packing/1.jpg", "example 1"%}
{% image "./src/img/posts/circ_packing/2.jpg", "example 2"%}
{% image "./src/img/posts/circ_packing/3.jpg", "example 3"%}
{% image "./src/img/posts/circ_packing/4.jpg", "example 4"%}
</div>

## The Process

Circle packing has been something I've seen in some generative art pieces, but not something I've attempted to make before. I tend not to have a purely algorithmic approach to my work--I usually end up half-implementing what I had in mind, 
and running with my mistakes (and definitely not because I am too lazy to look for my errors).

The basic premise of circle packing is this:
* Expand circles frame by frame.
* If a circle is touching/intersecting another circle, stop expanding that circle.
* Don't draw new circles inside of existing circles.

To check for intersections, we can compare every new circle with its distance to every existing circle. This is O(n^1),
and there might be a more efficient solution.
* If the distance between the center of any two circles is greater than the sum of the two circles' radii, then the circles are intersecting.
    * // For every circle,
    * // if distance <= r0 + r2, then circles are intersecting

Of the four pieces I made, only one of them is proper circle packing. In the other pieces, I made a mistake where I only check for circle intersections 
with my starting pool of circles. Regardless, I got some results I was happy with.

Source code and full animations on OpenProcessing below.

<iframe src="https://openprocessing.org/sketch/1734084/embed/" width="400" height="400"></iframe>

<iframe src="https://openprocessing.org/sketch/1734946/embed/" width="400" height="400"></iframe>

<iframe src="https://openprocessing.org/sketch/1734952/embed/" width="400" height="400"></iframe>

<iframe src="https://openprocessing.org/sketch/1736190/embed/" width="400" height="400"></iframe>