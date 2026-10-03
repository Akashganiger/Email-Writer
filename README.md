# MindMail - AI Email Assistant Platform

MindMail is a full-stack AI-powered email assistant designed to make email communication faster and more efficient.

The platform uses **React**, **Java Spring Boot**, and the **Gemini API** to generate intelligent email replies, summarize emails, suggest smart replies, extract action items, and generate emails based on different tones.

It also includes a **Chrome Extension** that brings the AI assistant directly into Gmail.

---

## 🚀 Features

- ✉️ **AI Email Reply Generation**
  - Generate context-aware email responses using AI.

- 📝 **Email Summarization**
  - Convert long emails into concise summaries.

- 💡 **Smart Replies**
  - Generate quick and relevant reply suggestions.

- ✅ **Action-Item Extraction**
  - Identify tasks and important actions from email content.

- 🎭 **Tone-Based Email Generation**
  - Generate emails using different tones such as:
    - Professional
    - Friendly
    - Formal
    - Casual

- 🌐 **Gmail Chrome Extension**
  - Use MindMail directly inside Gmail.
  - Generate AI-powered replies without leaving the Gmail interface.

- ⚡ **REST API Integration**
  - React frontend communicates with Spring Boot REST APIs for AI-powered processing.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3

### Backend
- Java
- Spring Boot
- REST APIs

### AI
- Google Gemini API
- Generative AI

### Browser Extension
- Chrome Extension
- JavaScript
- Gmail Integration

### Development Tools
- Git
- GitHub
- IntelliJ IDEA
- VS Code
- Postman

---

## 🏗️ System Architecture

                    ┌─────────────────────┐
                    │       Gmail         │
                    │                     │
                    │ Chrome Extension    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │                     │
                    │ Email UI            │
                    │ Smart Replies       │
                    │ Tone Selection      │
                    └──────────┬──────────┘
                               │
                         REST API Calls
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Spring Boot      │
                    │      Backend       │
                    │                     │
                    │ Email Processing    │
                    │ AI Service          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Gemini API       │
                    │                     │
                    │ AI Generation       │
                    │ Summarization       │
                    │ Smart Replies       │
                    └─────────────────────┘
                    
