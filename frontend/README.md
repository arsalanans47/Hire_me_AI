# Portfolio Chat Frontend

A ChatGPT-style portfolio site built with React + Vite (JavaScript).

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Folder structure

```
frontend/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx              # React entry point
│   ├── App.jsx                # Top-level state + layout
│   ├── index.css              # Design tokens + all styles
│   ├── components/
│   │   ├── Sidebar.jsx        # Left nav (About/Contact/Projects/ATS/Resume)
│   │   ├── NavItem.jsx        # Single sidebar nav button
│   │   ├── Welcome.jsx        # Empty-state screen with suggestion cards
│   │   ├── MessageList.jsx    # Renders the chat thread
│   │   ├── MessageBubble.jsx  # Single message, dispatches by kind
│   │   ├── InputBar.jsx       # Bottom chat input + send button
│   │   ├── AboutCard.jsx      # "About Me" response card
│   │   ├── ContactCard.jsx    # "Contact Me" response card
│   │   ├── ProjectsCard.jsx   # "Projects" response card (GitHub links)
│   │   ├── AtsResultCard.jsx  # ATS score result card
│   │   ├── ScoreRing.jsx      # Circular score indicator
│   │   └── Chip.jsx           # Small pill/tag used across cards
│   └── components/            # Reusable chat and response components
```

## Customize

1. Start the backend API on `http://localhost:8000`.
2. The frontend loads resume data, chat responses, ATS analysis, and the PDF resume from the backend API.
