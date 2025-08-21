import { useState } from "react";
import "./App.css";

function App() {
  const [emailText, setEmailText] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [suggestedReply, setSuggestedReply] = useState("");
  const [loading, setLoading] = useState(false);

  // Simulação de processamento (substituir por chamada à API depois)
  const handleProcess = async () => {
    setLoading(true);
    let text = emailText;

    // Se o usuário enviou arquivo, tente ler o texto (apenas .txt por enquanto)
    if (file) {
      if (file.type === "text/plain") {
        text = await file.text();
      } else {
        alert(
          "Por enquanto, apenas arquivos .txt são suportados para leitura direta."
        );
        setLoading(false);
        return;
      }
    }

    if (
      text.toLowerCase().includes("suporte") ||
      text.toLowerCase().includes("atualização")
    ) {
      setCategory("Produtivo");
      setSuggestedReply(
        "Olá! Sua solicitação foi recebida e será processada em breve."
      );
    } else {
      setCategory("Improdutivo");
      setSuggestedReply(
        "Obrigado pela mensagem! Não é necessária nenhuma ação no momento."
      );
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>FlowMail - AutoU</h1>
      <div className="form-section">
        <label>
          <strong>Upload de arquivo (.txt ou .pdf):</strong>
          <input
            type="file"
            accept=".txt,.pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>
        <div className="or-divider">ou</div>
        <label>
          <strong>Colar texto do email:</strong>
          <textarea
            rows={8}
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            placeholder="Cole aqui o texto do email..."
          />
        </label>
        <button
          onClick={handleProcess}
          disabled={loading || (!emailText && !file)}
        >
          {loading ? "Processando..." : "Processar Email"}
        </button>
      </div>
      {(category || suggestedReply) && (
        <div className="result-section">
          <h2>Resultado</h2>
          <p>
            <strong>Categoria:</strong> {category}
          </p>
          <p>
            <strong>Resposta sugerida:</strong> {suggestedReply}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
