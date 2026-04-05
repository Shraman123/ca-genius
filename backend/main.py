import os
import uuid
import google.generativeai as genai
from fastapi import FastAPI, Depends, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime
from pydantic import BaseModel
from dotenv import load_dotenv

import models, database

load_dotenv()

# Initialize Gemini
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.5-flash')

app = FastAPI(title="CA-Genius API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=database.engine)

class ChatRequest(BaseModel):
    message: str

class ClassifyRequest(BaseModel):
    document_text: str

class LoginRequest(BaseModel):
    email: str
    password: str

@app.post("/api/auth/login")
def login(req: LoginRequest):
    return {"access_token": "mock-jwt-token-xyz", "token_type": "bearer", "role": "CA"}

@app.post("/api/documents/upload")
async def upload_document(file: UploadFile = File(...), db: Session = Depends(database.get_db)):
    content = await file.read()
    try:
        text_data = content.decode("utf-8")
    except:
        text_data = "File was parsed as binary or PDF format (requires PyPDF integration)."
        
    doc_id = uuid.uuid4()
    return {
        "status": "success", 
        "document_id": str(doc_id), 
        "extracted_text": text_data[:2000],
        "message": f"File {file.filename} processed successfully."
    }

@app.post("/api/ai/classify")
def classify_transactions(req: ClassifyRequest):
    if not api_key:
        return {"error": "Missing Gemini API Key"}
        
    prompt = f"""
    Extract financial transactions from this unstructured text and output ONLY valid JSON format.
    The JSON should be an array of objects with keys: date, description, amount, type (credit/debit), category, gst_applicable (boolean).
    
    Text:
    {req.document_text}
    """
    
    try:
        response = model.generate_content(prompt)
        text_response = response.text
        if text_response.startswith("```json"):
            text_response = text_response.replace("```json", "").replace("```", "").strip()
            
        return {"status": "success", "classified_transactions": text_response}
    except Exception as e:
        return {"error": str(e)}

@app.post("/api/ai/chat")
def ai_chat(req: ChatRequest):
    if not api_key:
        return {"message": "System Error: Gemini API Key is missing. Check backend .env."}
        
    prompt = f"""You are 'CA-Genius', an elite Indian Chartered Accountant AI assistant. 
    Provide highly accurate, simple, and legally compliant advice regarding the problem based on the IT Act, Companies Act, and GST rules in India. Explain concepts professionally but effectively.
    User Question: {req.message}
    """
    
    try:
        response = model.generate_content(prompt)
        return {"message": response.text}
    except Exception as e:
        return {"message": f"AI Error: {str(e)}"}

@app.get("/api/tax/estimate")
def get_tax_estimate(db: Session = Depends(database.get_db)):
    return {
        "assessment_year": "2024-25",
        "estimated_liability": 145000,
        "recommendations": [
            "Claim 32AD machinery depreciation.",
            "Missing 80C limit max out by 40k."
        ]
    }
