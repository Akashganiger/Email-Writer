# AI Mail Assistant

An AI-powered email productivity platform that generates professional email replies using the Google Gemini API and integrates directly with Gmail through a custom Chrome Extension.

## 🚀 Features

- ✉️ **AI Email Reply Generation** – Generate context-aware professional email replies.
- 🎯 **Customizable Tone** – Generate replies based on the selected tone.
- 🌐 **Multilingual Support** – Generate and translate emails in English, Hindi, Kannada, Telugu, and Tamil.
- 🔌 **Gmail Integration** – Access AI features directly inside Gmail using the Chrome Extension.
- ⚡ **Automatic Reply Insertion** – Insert generated replies directly into the Gmail composer.
- 🔗 **REST API Integration** – Connect the web application, extension, and Gemini API through Spring Boot REST APIs.

## 🏗️ Architecture

Gmail → Chrome Extension → Spring Boot REST API → Gemini API → Generated Reply → Gmail Composer

## 🛠️ Tech Stack

**Frontend:** React.js  
**Backend:** Java, Spring Boot, REST APIs  
**AI:** Google Gemini API  
**Chrome Extension:** JavaScript, HTML5, CSS3  
**Database:** MySQL  
**Data Format:** JSON

## ⚙️ How It Works

1. Open an email in Gmail.
2. Click the **AI Reply** button added by the Chrome Extension.
3. The extension sends the email content to the Spring Boot backend.
4. The backend sends the request to the Gemini API.
5. Gemini generates a professional or multilingual reply.
6. The generated response is returned to the extension.
7. The reply is automatically inserted into the Gmail composer.

## 🔧 Setup

### Backend

Configure the Gemini API in `application.properties`:


gemini.api.url=YOUR_GEMINI_API_URL
gemini.api.key=YOUR_GEMINI_API_KEY

Run the Spring Boot application:

mvn spring-boot:run

Backend runs on:

http://localhost:8080
Chrome Extension
Open chrome://extensions/ in Chrome.
Enable Developer mode.
Click Load unpacked.
Select the Chrome Extension folder.
Open Gmail and use the AI Reply button.

Note: Never commit your Gemini API key to GitHub. Use environment variables or secure configuration.

🔮 Future Enhancements
Email Summarization
Smart Reply Suggestions
Grammar and Spelling Correction
Follow-up Email Generation
Email Priority Detection
Additional Regional Languages
👨‍💻 Project

AI Mail Assistant — A full-stack AI email productivity web application integrated with Gmail through a custom Chrome Extension.
