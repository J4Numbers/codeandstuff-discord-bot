# Codeandstuff Discord bot

Created by @J4Numbers

A bot for the Code and Stuff Discord server. This idea was born because people
joining the server have to wait for a mentor to notice that they have joined
before they can be checked off against the event list.

This process is completely manual at the moment (ignoring its relevance in a
non-time-based service), but can be automated _with the power of technology_.

> Due to how the online events are no-longer being run at this point in time,
> **this repository has been archived** until further notice. This means that
> the service is no longer running as of the **2nd of April, 2023**.
>
> The code itself is still available for future users to pick up themselves
> or to take inspiration from, and the Terraform has been mostly anonymised from
> the owner's account.
>
> Thank you for reading. Any further queries can be raised with the owner
> privately if required.

## What does it do

This bot uses both [Discord.JS][1] and the [Eventbrite API][2] to perform
actions within Discord with context to Eventbrite events.

This bot fills/will fill the following roles:
- Welcome new users to the server
- Confirm that new users have signed up to any currently active events
- Re-post newly created events from Code and Stuff
- Manage roles for events (add general attendee or mentor role to user specifically)
- Creates voice/text channel pairs for mentor/mentee pairings
- Cleans down all session channels after a session

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

The bot will respond on a few events:

* When someone new joins your server
* When someone attempts to `@mention` the bot, or directly message it
* When someone inputs a `!cas register` command in a specified channel
* When an organiser or mentor inputs a `!cas pair` command
* When an organiser or mentor inputs a `!cas clean` command
* When someone inputs a `!cas event` command
* When someone inputs a `!cas debug` command

The following commands are available for interactive use:

| command | Description |
| ------- | ----------- |
| `!cas clean` | Removes all session channels from the server |
| `!cas debug joiner ` | Simulate a new joiner event (**DEBUG ONLY**) |
| `!cas event` | Provide a list of all active events in Eventbrite |
| `!cas pair @[mentor] @[mentee]` | Load a mentor/mentee session for the mentioned parties |
| `!cas register [firstname] [lastname]` | Register yourself into the server under this name |

## How to install

> This section is for people who would like to run the bot on their own
> servers. This section _is not_ for people who would like to know how to
> interact with the bot.

Before starting, ensure that you have installed at least version `12.x.x` of
NodeJS onto your system. This is what will be used to run the bot. You will also
need to take a note of your private Eventbrite token (as found [here][3]),
create a new Discord development application, assign it as a bot, and take down 
the access token (as found [here][4]).

[3]: https://www.eventbrite.co.uk/platform/api-keys?internal_ref=login 'Eventbrite API'
[4]: https://discord.com/developers/applications 'Discord applications'

Once you have all of these, download the repository and create a new
`config/local.js` file with the following information:

```js
module.exports = {
  discord: {
    token: '[MY_DISCORD_TOKEN]',
    welcome_channel: '[WELCOME_CHANNEL_ID]',
    joined_channel: '[JOINED_CHANNEL_ID]',
    voice_channel_group: '[VOICE_CHANNEL_GROUP_ID]',
    text_channel_group: '[TEXT_CHANNEL_GROUP_ID]',
    attendee_role: '[ATTENDEE_ROLE_ID]',
    mentor_role: '[MENTOR_ROLE_ID]',
  },
  eventbrite: {
    token: '[MY_EVENTBRITE_TOKEN]',
    org_id: '[MY_ORG_ID]',
  },
}
```

Where the channel and role ids are taken from your server by right clicking on the various channels
and roles and clicking 'Copy ID'.

> Note: Copy ID only appears when a user has enabled 'Developer Mode' within the Appearance settings
> of Discord (under advanced).

* The _Welcome channel_ represents the channel that new users will join on entering the server.
* The _Joined channel_ represents the channel that users will be placed in after verification.
* The _Voice channel group_ represents the group of channels where voice channels for sessions should be generated.
* The _Text channel group_ represents the group of channels where text channels for sessions should be generated.
* The _Attendee role_ represents the role that attendee users are granted after being verified.
* The _Mentor role_ represents the role that mentor users are granted after being verified.

Once you have created the configuration file, then run the following commands
to start the bot:

```bash
npm i
npm run compile
npm run start
```
