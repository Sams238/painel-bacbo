import React, { useState } from "react";

function App() {
  const [sinal, setSinal] = useState("");
  const [carregando, setCarregando] = useState(false);

  const solicitarSinal = async () => {
    setCarregando(true);
    setSinal("");
    try {
      const resposta = await fetch("https://bacbo-xpto.onrender.com/api/sinal-bacbo");
      const dados = await resposta.json();
      setSinal(dados.sinal);
    } catch (error) {
      setSinal("Erro ao obter o sinal.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">🎲 Painel Bac Bo XPTO</h1>
        <p className="text-sm text-gray-400">Clique abaixo para gerar o próximo sinal com base no histórico em tempo real.</p>
        <button
          onClick={solicitarSinal}
          disabled={carregando}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition disabled:opacity-50"
        >
          {carregando ? "Calculando..." : "🚀 Solicitar Sinal"}
        </button>
        {sinal && (
          <div className="bg-gray-700 rounded-xl p-4 mt-4 border border-blue-500">
            <p className="whitespace-pre-line text-lg font-medium text-green-400">{sinal}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
