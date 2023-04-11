---
layout: post.njk
title: Remotely turning on my desktop
image: ./src/img/posts/remote_power_switch/no_lid.jpg
blurb: Using an ESP-32 connected an MQTT broker
date: 2023-03-20
---
# Remotely turning on my desktop

## The Problem
When I'm away from my desktop, I rely on [Chrome Remote Desktop](https://remotedesktop.google.com/) or [Moonlight](https://moonlight-stream.org/) (in conjunction with [ZeroTier](https://www.zerotier.com/)) to remotely access it.

However, my desktop need to be *powered on* in order for the above methods to work. Rather than keeping my desktop powered on 24/7, 
I need a way to *remotely* turn on my desktop whenever I want to connect to it.

## The Details
* Wake-on-LAN packets are one way to turn your computer on remotely. I tried setting this up, but I ran into network constraints that prevented this method from working.
    * Additionally, the PC still needs the network card to be on in order to listen for the magic packet.
* The motherboard of the PC has two pins that, when shorted, will toggle the PC on or off. If we can hook something up to short these pins, then we can turn
on/off the computer. 

## The Solution
I got my inspiration from [this video](https://www.youtube.com/watch?v=msQVvrFOUlw), which used an ESP connected to Adafruit IO (using the MQTT protocol) 
and wired to a relay in order remotely toggle the PC power pins. I more or less followed this concept.

### Small Aside: What is MQTT and how does it work?
In short, MQTT is a lightweight communication protocol for sending data between machines, designed for use cases that have limited network bandwidth or hardware resources.

Typically, MQTT uses TCP as its transport protocol. Think of MQTT as an organized group of drivers, and TCP as the cars the drivers use to do what they need to do.

In simple terms, MQTT allows for this:
1. I send data sent to an external server (called the MQTT broker)
2. External server sends that data to the connected clients (the subscribed MQTT clients)
3. Client receives data
4. The client and I did not have to be on the same network to communicate!

With slightly more jargon:
1. I publish data to the MQTT broker on a certain feed
    * The "feed" is nothing more than a name that differentiates groups of clients
2. MQTT broker sends data to clients that are subscribed to that feed
3. Clients receive data from the broker

## The Build

<div picture-grid="2">
{% image "./src/img/posts/remote_power_switch/old.jpg", "with breadboard" %}
{% image "./src/img/posts/remote_power_switch/done.jpg", "done" %}
</div>

I used an ESP32, Adafruit IO, and a 5V relay module.

I developed with PlatformIO, and my code can be [found here](https://github.com/k-xvin/esp32-mqtt-switch). 
This is the gist of it:
* Connect to the WiFi network
* Subscribe to the Adafruit IO MQTT feed
    * If we receive a certain value on the feed, activate the relay
* Reconnect to the WiFi network if we get disconnected
* Reconnect to the MQTT feed if we get disconnected
    * For monitoring's sake, publish a value to a seperate feed upon reconnect

It's simple, and it gets the job done. With this code, 
I've managed to keep the ESP-32 connected and running for over a week without any uptime issues. 

I put it all together on a breadboard, and it got the job done. This worked well, but it was a little unsightly.

A few weeks later, I caved and went ahead and put together an enclosure for it.

<div picture-grid="2">
{% image "./src/img/posts/remote_power_switch/drilled.jpg", "drilled container" %}
{% image "./src/img/posts/remote_power_switch/solder.jpg", "soldered pins" %}
</div>

<div picture-grid="2">
{% image "./src/img/posts/remote_power_switch/no_lid.jpg", "no lid" %}
{% image "./src/img/posts/remote_power_switch/with_lid.jpg", "with lid" %}
</div>

{% image "./src/img/posts/remote_power_switch/done.jpg", "done" %}

## In Conclusion
* I'm quite proud of how it turned out. 
* It's a fully finished project :)
* I learned about and got to use MQTT.


