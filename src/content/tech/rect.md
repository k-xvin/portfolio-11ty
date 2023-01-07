---
layout: post.njk
title: RECT
image: ./src/img/posts/RECT/main.png
blurb: A game I made in high school in my programming class.
date: 2019-05-01
---
(Written on 01/07/2023, but dated earlier to fit the chronological order of projects)     
# RECT
<div picture-grid="2">
{% image "./src/img/posts/RECT/main.png", "main room" %}
{% image "./src/img/posts/RECT/room.png", "combat room" %}
</div>

RECT is a top-down roguelike adventure game focused on item synergies and bullet-hell-esque combat. It's
pretty much just a clone of [The Binding of Isaac: Rebirth](https://en.wikipedia.org/wiki/The_Binding_of_Isaac:_Rebirth).

The game is written in Java and it was made in a team of 3 in my AP Computer Science class, as a final project.

I've made the source code [available here](https://github.com/k-xvin/RECT), alongside some packaged .jar files of the game. It might be a little hard to get running, as it requires the JavaFX library, which isn't packaged with most Java runtimes past Java 8.

# What's in this thing
* Randomly generated rooms of enemies
    * However, there is no persistant layout of rooms for each floor/level. You walk into a new room, and the old room is gone.
* Several types of enemies with different attack patterns and behaviors
* 2 unique bosses
* 15 unique items that can synergize with each other

<div picture-grid="2">
{% image "./src/img/posts/RECT/boss1.png", "boss 1" %}
{% image "./src/img/posts/RECT/item2.png", "item 2" %}
{% image "./src/img/posts/RECT/item.png", "item 1" %}
{% image "./src/img/posts/RECT/boss2.png", "boss 2" %}
</div>