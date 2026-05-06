# LinkedIn Network Analyzer

> Explore, filter, and visualize your LinkedIn connections — entirely in your browser. No backend, no sign-in, no data ever leaves your device.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white&style=flat-square)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white&style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## Demo

> 🎬 *Video walkthrough coming soon*

---

## Step 1 — Export your LinkedIn connections

LinkedIn lets you download a copy of your connections data. Follow these steps:

1. Click the **Me** icon at the top of your [LinkedIn homepage](https://www.linkedin.com)
2. Select **Settings & Privacy** from the dropdown
3. Click **Data Privacy** in the left sidebar
4. Under *"How LinkedIn uses your data"*, click **Get a copy of your data**
5. Select **Connections** (or choose *"Want something in particular?"* and tick **Connections**)
6. Click **Request archive**
7. Check your email — LinkedIn sends a download link within a few minutes for the Connections file
8. Open the email and download the `.zip` archive
9. Unzip it and locate `Connections.csv`

> **Notes:**
> - The download link in the email expires after **72 hours**
> - Connection email addresses are only included if your contact opted in to share them
> - This feature is **not available on mobile** — use a desktop browser

---

## Step 2 — Run the analyzer

**Prerequisites:** Node.js 18+

```bash
# Clone the repo
git clone https://github.com/your-username/linkedin-network-analyzer.git
cd linkedin-network-analyzer

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser, then drag your `Connections.csv` onto the upload zone.

---

## Other commands

```bash
npm run build      # Production build → dist/
npm run preview    # Serve the production build locally
npx tsc --noEmit   # Type-check without building
```

---

## Privacy

All processing happens **in your browser**. Your CSV is never uploaded to any server. Closing the tab clears everything from memory.

---

## License

MIT
