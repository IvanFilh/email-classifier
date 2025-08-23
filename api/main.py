from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from nlp_utils import classify_email, generate_response

app = FastAPI(title="Email NLP API")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "API rodando!"}

class EmailRequest(BaseModel):
    content: str

@app.post("/process_email/")
def process_email(request: EmailRequest):
    email_text = request.content
    category = classify_email(email_text)
    response = generate_response(category, email_text)
    
    return {
        "categoria": category,
        "resposta_sugerida": response
    }