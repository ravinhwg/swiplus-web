# Swiplus Web

> **Historical archive, 2021 codebase.**  
> This repository is preserved as a record of the original Swiplus web application and its development history. It is no longer maintained and should not be treated as production-ready software.

## What was Swiplus?

**Swiplus** was a visual blogging and social publishing platform built around **Decks**: sequences of 4:5 visual cards designed to be read horizontally rather than as a conventional vertically scrolling blog post.

The broader idea was to combine the visual structure of magazine-style publishing with the discovery and interaction of a social network.

This repository contains the **web client** for Swiplus. The mobile creator/editor lived in a separate React Native repository.

## What this codebase implemented

The web application includes:

- Following and chronological feeds for signed-in users
- An explorer/discovery feed
- Responsive deck grids
- Search across **users and decks**
- User profiles and follow/unfollow interactions
- Swipeable deck viewing with **Swiper**
- Likes and view counts
- Comments, replies and comment likes
- Notifications
- Deck creation via multi-image upload and card reordering
- Editing, publishing, unpublishing and deleting decks
- Profile editing and profile-picture upload
- Reporting/moderation flows
- Sharing to external social platforms
- Google/email authentication flows
- Server-rendered Open Graph and Twitter metadata for deck pages
- BlurHash-based image placeholders
- Responsive mobile and desktop navigation
- Storybook component development

## Technology

The archived application was built with:

| Area | Technology |
| --- | --- |
| Framework | Next.js 11 |
| UI | React 17 |
| Styling | Tailwind CSS 2 |
| Server state | React Query 3 |
| HTTP | Axios |
| Deck viewer | Swiper 6 |
| Forms | React Hook Form |
| Image placeholders | BlurHash |
| Component development | Storybook |
| Formatting / linting | Prettier, ESLint, Airbnb config |

## Architecture

This repository is the **frontend web client**, not the complete Swiplus backend.

API calls are routed through an `API_URL` environment variable and are grouped under `apiPlugs/`. The original backend services are not included here, so the archived application is **not expected to run end-to-end against the former production service**.

Examples of frontend API areas include:

```text
apiPlugs/
├── Auth.js
├── deck.js
├── report.js
├── search.js
└── user.js
```

The main Next.js routes include:

```text
pages/
├── index.js
├── search.js
├── create.js
├── notifications.js
├── settings.js
├── [profile].js
└── d/
    └── [deckId].js
```

## Decks

A Deck was a collection of image-based cards displayed at a **4:5 aspect ratio**. The web viewer used Swiper for horizontal navigation and supported likes, views, sharing and discussion around the publication.

Individual deck pages also generated Open Graph and Twitter metadata server-side so that a shared Deck could carry its title, description and thumbnail into external platforms.

## Historical UI

Original production screenshots have not survived.

Any screenshots published with this repository or in the associated portfolio/LinkedIn project are **reconstructions based on the surviving source code** rather than untouched historical captures.

<!--
If you add the reconstructed screenshots to the repository, a suggested layout is:

docs/
└── reconstructed-ui/
    ├── web-discovery.png
    └── web-deck-viewer.png

Then uncomment:

![Reconstructed Swiplus discovery feed](docs/reconstructed-ui/web-discovery.png)
![Reconstructed Swiplus deck viewer](docs/reconstructed-ui/web-deck-viewer.png)
-->

## Development history

This repository is intentionally preserved as a historical artifact. The original commit history is part of the project record and has not been squashed into a modern rewrite.

**[Browse the original commit history](../../commits/main)**

The code therefore reflects the choices, experiments and limitations of the project at the time it was built.

## Running the archive

The dependency tree is from 2021 and contains packages that are now outdated. The former backend is also not included.

If you choose to experiment with the code, do so in an isolated development environment rather than deploying it directly to production.

Historically, the project used the standard Next.js scripts:

```bash
npm install
npm run dev
```

and expected an API endpoint through:

```text
API_URL=<backend-url>
```

No currently functioning Swiplus backend is provided by this repository.

## Why this repository is public

I have made the original code public as a portfolio and learning artifact rather than rewriting it to look like a modern project.

It documents an early attempt to build a complete creator/social product and shows the actual engineering progression behind it — including the parts that would be designed differently today.

## Status

**Archived / no longer maintained.**

Do not use this repository as the basis of a production deployment without a full dependency, authentication and security review.

## Related repository

The companion **Swiplus Mobile** repository contains the React Native visual creator/editor used to build Decks on a phone.

## License

No licence is declared here unless a `LICENSE` file is added to the repository. A public repository is viewable source, but an OSI-approved licence should be added if you intend to release the code as open-source software.
