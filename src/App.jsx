import { useState } from "react";
import "./App.css";

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

function App() {
  return (
    <>
      <div></div>

      <div className="card"></div>
    </>
  );
}

export default App;
