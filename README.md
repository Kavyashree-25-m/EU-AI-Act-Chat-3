# EU AI Act Chat

Frontend-only React + Vite prototype for an EU AI Act compliance assistant.

## Updated flow

### Ask
Question → visible AI thinking phase → detailed long-form answer → expandable evidence trail.

### Classify
Email → Q1 → Q2 → Q3 → Q4 → Q5 → Q6 → Review → classification thinking phase → result.

The email step is always shown, even when a previously entered email exists. A saved address is only used as a prefill.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Build

```bash
npm run build
```

Production output is generated in `dist/`.
