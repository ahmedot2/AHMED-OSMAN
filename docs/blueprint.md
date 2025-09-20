# **App Name**: AHMED OSMAN

## Core Features:

- Profile Showcase: Dynamically display Ahmed Osman's professional background with parallax, staggered text, CV excerpts, accordion dives, and a hoverable Milestones Grid.
- Project Portfolio: Interactive, filterable masonry grid showcasing projects with refined cards: screenshots/links, tech stack badges, metrics/outcomes, parallax hover effects, and 'View Code' CTA linking to GitHub.
- Publication Highlights: Enhanced grid of book and paper cards with visual TOC/cover images, genre badges, short synopses, modal previews showing TOCs/full PDFs via Firebase Storage, and download links.
- Media Integration: Tabbed carousel for YouTube channels with embedded playlists/videos using YouTube API, real-time metrics (views, subscribers), CTAs, parallax scrolling on thumbnails, and auto-play muted teasers on hover.
- Contact Form with AI Summarizer: Advanced form for inquiries integrated with Firebase Firestore. A tool using an LLM auto-summarizes submissions and emails summaries. Includes anti-spam CAPTCHA, success animations, and 'Have a Chat' CTA with Calendly, phone, LinkedIn, and GitHub.
- CV Download: Prominent button in About and Footer sections to download the full CV PDF. Hover preview showing page 1 screenshot, with analytics tracking downloads via Firebase.
- Content Generation Tool: Leverage generative AI for adaptive personalization: Detect viewer's emotional state via optional webcam access (using MediaStream API for facial analysis). Rewrite bio/project descriptions dynamically on load/scroll. Fallback to neutral if no permission; include a toggle for privacy.

## Style Guidelines:

- Predominantly black (#000000) for a dramatic, high-contrast canvas, with subtle gradient transitions to beige (#F5F5DC) in lighter sections for visual breaks and depth.
- White (#FFFFFF) for all text, UI elements, and borders to ensure crisp readability and Swiss-style clarity on dark backgrounds.
- Vibrant reddish-orange (#FF4500) for interactive elements (links, buttons, highlights, badges) to convey energy and disruption, mirroring the reference's bold red text.
- 'Space Grotesk' sans-serif (or fallback to Helvetica Neue) for massive, bold, all-caps headlines with staggered positioning and letter-spacing for graphic impact.
- 'Inter' sans-serif for body text, descriptions, and labels, with variable weights for hierarchy – ensuring legibility at 16-18px base size.
- Ultra-minimalist icons (e.g., thin lines/dots from Heroicons) for vertical fixed nav bar on left (indicating sections with color shifts to #FF4500 on active). Add subtle glow/shadow on hover for micro-interactions.
- Single-page vertical scrolling with full-screen snapping sections (using CSS Scroll Snap). Incorporate parallax for backgrounds and elements. Ensure responsive grids with generous negative space.
- Scroll-triggered parallax; micro-interactions (glow/scales on hovers, loading spinners); macro transitions (smooth fades/slides between sections with easing); text reveals; image masking. Optimize for performance and accessibility.