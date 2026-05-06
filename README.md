# ⚖️ AI Legislative Analyzer

> Bridging the gap between complex legal language and everyday understanding — powered by AI.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-TypeScript-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js)
![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC?logo=tailwind-css)

---

## 📌 Overview

**AI Legislative Analyzer** is a full-stack web application that transforms dense legal documents into structured, easy-to-understand summaries. Using an LLM under the hood, it extracts key components from legal text and presents them in clean, categorized summary cards — making legal information accessible to anyone, regardless of their legal background.

---

## 🚩 Problem Statement

Legal documents are notoriously lengthy and difficult to interpret. Extracting meaningful insights typically requires reading through pages of dense, technical language. AI Legislative Analyzer solves this by automatically analyzing legal text and organizing it into clearly defined sections that anyone can understand at a glance.

---

## ✨ Features

- 📋 **Text Input** — Paste any raw legal text directly into the interface
- 🤖 **AI-Powered Analysis** — Sends text to a backend LLM for intelligent summarization
- 🗂️ **Structured Summaries** — Output is organized into five predefined sections:
  - **Scope** — What the legislation covers
  - **Core Concepts** — Key definitions and principles
  - **Obligations** — What parties are required to do
  - **Exceptions** — Exemptions and special cases
  - **Penalties** — Consequences for non-compliance
- 🃏 **Summary Cards UI** — Clean, readable card-based layout for results
- ⏳ **Loading & Error States** — Graceful handling of async operations and failures
- 📄 **PDF Support** *(experimental)* — Planned and partially implemented via `pdfjs-dist`

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                            │
│              React + TypeScript + Tailwind CSS              │
│                                                             │
│   ┌─────────────┐        ┌──────────────────────────────┐  │
│   │   App.tsx   │──────▶ │  SummaryCard Component       │  │
│   │ (state mgmt)│        │  (renders structured output) │  │
│   └──────┬──────┘        └──────────────────────────────┘  │
└──────────┼──────────────────────────────────────────────────┘
           │ HTTP Request (legal text)
           ▼
┌─────────────────────────────────────────────────────────────┐
│                         Backend                             │
│                   Node.js / Express API                     │
│                                                             │
│        POST /analyze  ──────▶  LLM API (AI Model)          │
│                 ◀──────────── Structured Summary            │
└─────────────────────────────────────────────────────────────┘
```

### Flow

1. User pastes legal text into the frontend
2. Frontend sends a request to the backend API
3. Backend processes the text using an LLM
4. AI returns a formatted summary string
5. Frontend parses the response into structured sections
6. UI renders the sections as summary cards

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, TypeScript |
| Styling | Tailwind CSS |
| Backend | Node.js, Express |
| AI Integration | LLM API (OpenAI or compatible) |
| PDF Parsing *(optional)* | `pdfjs-dist` |

---

## 📁 Project Structure

```
ai-legislative-analyzer/
├── client/                     # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/
│   │   │   └── SummaryCard.tsx # Renders a single summary section
│   │   ├── App.tsx             # Main logic and state management
│   │   └── index.tsx
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                     # Backend (Node.js / Express)
│   ├── routes/
│   │   └── analyze.js          # POST /analyze endpoint
│   ├── services/
│   │   └── aiService.js        # LLM API integration
│   └── index.js
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- npm or yarn
- An API key for your LLM provider (e.g., OpenAI)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ai-legislative-analyzer.git
cd ai-legislative-analyzer
```

### Backend Setup

```bash
cd server
npm install

# Create your environment file
cp .env.example .env
# Add your LLM API key to .env
```

```env
# .env
LLM_API_KEY=your_api_key_here
PORT=5000
```

```bash
npm start
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

The app will be available at `http://localhost:5173` (or your configured port).

---

## 🔍 Parsing Logic

The backend returns a formatted summary string. The frontend parses it using keyword-based pattern matching to extract sections:

```
Scope → Core Concepts → Obligations → Exceptions → Penalties
```

These are converted into a structured object and rendered as individual `SummaryCard` components.

---

## ⚠️ Current Limitations

- Works best with clean, well-formatted text input
- PDF parsing may introduce noisy text that affects summary quality
- Relies on consistent AI output structure for accurate parsing
- No authentication or persistent storage implemented yet

---

## 🔮 Roadmap

- [ ] Robust PDF/text preprocessing and cleaning
- [ ] JSON-based AI responses for more reliable parsing
- [ ] User authentication and saved analysis history
- [ ] Multi-language support
- [ ] Side-by-side document comparison
- [ ] Cloud deployment with auto-scaling
- [ ] Advanced legal analytics (change highlighting, clause tracking)

---

## 🎯 Use Cases

- 🎓 **Law Students** — Quickly summarize acts and legislative sections
- 👨‍💻 **Developers** — Build and prototype legal-tech tools faster
- 🏛️ **General Public** — Understand government policies without a law degree
- 🔬 **Researchers** — Analyze and compare legal documents at scale

---

## 🤝 Contributing

Contributions are welcome! Please open an issue to discuss what you'd like to change, or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ to make legal text less painful</p>