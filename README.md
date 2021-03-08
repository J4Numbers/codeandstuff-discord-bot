# Codeandstuff Discord bot

Created by @J4Numbers

A bot for the Code and Stuff Discord server. This idea was born because people
joining the server have to wait for a mentor to notice that they have joined
before they can be checked off against the event list.

This process is completely manual at the moment (ignoring its relevance in a
non-time-based service), but can be automated _with the power of technology_.

## What does it do

This bot uses both [Discord.JS][1] and the [Eventbrite API][2] to perform
actions within Discord with context to Eventbrite events.

This bot fills/will fill the following roles:
- Welcome new users to the server
- Confirm that new users have signed up to any currently active events
- Re-post newly created events from Code and Stuff
- Manage roles for events (all events and current event)

[1]: https://discord.js.org/#/
[2]: https://www.eventbrite.com/platform/api#

## What it does not do

This bot _does not_ completely replace the role of moderators in letting new
people into the event, as mistakes can happen when signing up to the event,
such as making a mistake when entering your name, or if new joiners have
trouble using the bot.

This bot _does not_ sign people into the event. It is purely a front-door
watchdog (at the moment).

## How to use

## How to install

> This section is for people who would like to run the bot on their own
> servers. This section _is not_ for people who would like to know how to
> interact with the bot.

Before starting, ensure that you have installed at least version `12.x.x` of
NodeJS onto your system. This is what will be used to run the bot.

To install and use, download the repository or package to your server and run
the following commands:

```bash
npm i
npm run compile
npm run start
```
