# CA-Genius 🚀

**CA-Genius** is an AI-powered SaaS platform designed for Indian Chartered Accountants (CAs) to automate tax compliance and advisory. It features a scalable Next.js frontend, a robust FastAPI backend, and powerful AI capabilities using Google's Gemini 1.5 API.

## Features ✨
- **Intelligent Document Parsing**: Automatically extract structured data from tax documents (Form 16, Bank Statements, etc.) using Gemini 1.5 vision and text capabilities.
- **AI Tax Advisory Chatbot**: Interactive chat assistant equipped with Indian taxation knowledge to help CAs with quick queries.
- **Modern Dashboard**: A clean, premium, glassmorphism-inspired UI built with Next.js, Framer Motion, and Tailwind CSS.
- **FastAPI Backend**: High-performance backend routing, Database management, and GenAI orchestration.

## Tech Stack 🛠️
### Frontend
- Next.js (App Router)
- React
- Tailwind CSS
- Framer Motion

### Backend
- FastAPI
- Python 3
- Gemini 1.5 API (via google-genai)

## Getting Started 💻

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- Gemini API Key

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure your `.env` file with your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
5. Run the FastAPI development server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Next.js development server:
   ```bash
   npm run dev
   ```

## License 📄
This project is for educational/demonstration purposes.
