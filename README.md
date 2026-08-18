# Kanto Motion Weaver

Build a highly technical, professional web application dashboard named "Kanto Motion Compiler". This is a visual compiler system that reverse-engineers videos into code.

Strict Design System (Kanto Empire Constitution):

- Core Colors: Background MUST be solid Kanto Black (#000000). Text and icons MUST be Kanto Cream (#F5F5DC) or Kanto White (#FFFFFF). 

- UI Archetype (Dynamic Flat UI): Strictly 8px border radius for all containers. Completely flat solid fills ONLY. Absolutely NO drop shadows, NO glow filters, and NO glassmorphism.

- Borders: Use crisp 1px solid structural dividers (#333333) to separate sections.

- Typography: Use "Playfair Display" (Italic) for the "Kanto" brand name, and "Inter" for all UI data, labels, and code blocks.

- Overall feel: Minimalist Monochromatic Brutalism, ruthlessly eliminating decorative noise.

Layout Requirements:

1. Header: Minimal top bar. Left side shows "Kanto Motion" (Logo in Serif Italic). Right side shows a subtle server connection status dot (Green for connected).

2. Initial State (Upload Zone): A large, centered, flat area with a 1px dashed border (#333333) for dragging and dropping an MP4 file. Include a minimal upload icon and text: "Deploy Video for Motion Compilation".

3. Active State (Split Dashboard): Once a file is uploaded, the screen should elegantly switch to a master control layout:

   - Left Column (Input & Analysis): A minimalist video player showing the uploaded video. Below it, a clean progress indicator displaying terminal-style text (e.g., "Extracting UI DOM...", "Reverse-Engineering GSAP Easing...").

   - Right Column (Output & Code): Divided into two vertical sections. The top half is a "Live Preview Canvas" (solid #111111 background) where the generated code will render. The bottom half is a dark-themed Code Editor with three toggleable tabs (HTML, CSS, JS/GSAP) displaying syntax-highlighted code.

Ensure the entire layout uses a responsive Grid/Flexbox system, maintaining expansive negative space and perfect alignment.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/363a7a27-87e2-431c-ac41-d327f9c8c140).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
