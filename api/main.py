from fastapi import FastAPI
from pydantic import BaseModel
import requests

from config import HUGGINGFACE_API_URL, HUGGINGFACE_API_TOKEN
from nlp_utils import preprocess_text

app = FastAPI()

class EmailRequest(BaseModel):
    text: str

@app.post("/classify")
def classify_email(request: EmailRequest):
    # Pré-processamento NLP
    processed_text = preprocess_text(request.text)

    # Chamada à API Hugging Face
    headers = {"Authorization": f"Bearer {HUGGINGFACE_API_TOKEN}"}
    payload = {"inputs": processed_text}
    response = requests.post(HUGGINGFACE_API_URL, headers=headers, json=payload)
    result = response.json()

    # Interpretação do resultado (exemplo para modelo de sentimento)
    label = result[0]["label"] if isinstance(result, list) and "label" in result[0] else "unknown"
    if label == "POSITIVE":
        category = "Produtivo"
        reply = "Olá! Sua solicitação foi recebida e será processada em breve."
    else:
        category = "Improdutivo"
        reply = "Obrigado pela mensagem! Não é necessária nenhuma ação no momento."

    return {
        "category": category,
        "suggested_reply": reply,
        "huggingface_result": result
    }