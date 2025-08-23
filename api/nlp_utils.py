from transformers import pipeline
from config import CLASSIFICATION_MODEL, GENERATION_MODEL, LABELS

# Carrega os pipelines de NLP (carregados uma vez só)
classifier = pipeline("zero-shot-classification", model=CLASSIFICATION_MODEL)
generator = pipeline("text-generation", model=GENERATION_MODEL)

def classify_email(text: str) -> str:
    """Classifica um email como Produtivo ou Improdutivo."""
    result = classifier(text, LABELS)
    return result["labels"][0]  # retorna a label mais provável

def generate_response(category: str, email_text: str) -> str:
    """Gera uma resposta automática baseada na categoria."""
    if category == "Produtivo":
        prompt = (
            f"Você recebeu o seguinte email:\n\"{email_text}\"\n\n"
            "Responda de forma profissional, clara e objetiva."
        )
    else:
        prompt = (
            f"Você recebeu o seguinte email:\n\"{email_text}\"\n\n"
            "Escreva uma resposta educada e curta, recusando ou encerrando o assunto."
        )
    
    response = generator(prompt, max_length=100, num_return_sequences=1) 
    return response[0]["generated_text"]