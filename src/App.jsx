import { useState } from "react";
import "./App.css";

function App() {
  const [emailText, setEmailText] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [suggestedReply, setSuggestedReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleProcess = async () => {
    setLoading(true);
    let text = emailText;

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

    try {
      const response = await fetch("http://127.0.0.1:8000/process_email/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: text }),
      });
      if (!response.ok) {
        throw new Error("Erro ao chamar API");
      }

      const data = await response.json();
      setCategory(data.categoria);
      setSuggestedReply(data.resposta_sugerida);
    } catch (err) {
      console.error(err);
      alert("Erro ao processar email. Verifique o backend.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Email Classifier - AutoU</h1>
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
