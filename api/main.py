from fastapi import FastAPI
from pydantic import BaseModel
from nlp_utils import classify_email, generate_response

app = FastAPI(title="Email NLP API")

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