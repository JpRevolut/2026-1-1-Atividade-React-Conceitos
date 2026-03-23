"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getProdutosTodos } from "@/services/api";

export default function Home() {
  const [produtos, atualizarProdutos] = useState([]); // Iniciando como array vazio
  const [pesquisa, setPesquisa] = useState(""); // Estado para o input

  useEffect(() => {
    getProdutosTodos().then((resultado) => {
      atualizarProdutos(resultado.data.products);
    });
  }, []);

  // Lógica de filtro: Sempre que 'pesquisa' ou 'produtos' mudar, essa lista atualiza
  const produtosFiltrados = produtos.filter((produto) =>
    produto.title.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen">
      <header className="w-full flex flex-col items-center py-8 border-b">
        <h1 className="text-2xl font-bold mb-4">Pesquisa de produtos</h1>
        
        {/* INPUT DE PESQUISA */}
        <input
          type="text"
          placeholder="Digite o nome do produto..."
          className="p-2 border border-gray-300 rounded-md w-80 text-black"
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />
      </header>

      <main className="flex flex-1 w-full max-w-5xl flex-col items-center py-10 px-6">
        {/* GRID DE CARTÕES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {produtosFiltrados.map((produto) => (
            <div key={produto.id} className="border p-4 rounded-lg shadow-sm bg-white dark:bg-zinc-900 flex flex-col gap-2">
              <img 
                src={produto.images[0]} 
                alt={produto.title} 
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="font-bold text-lg">{produto.title}</h2>
              <p className="text-sm text-gray-500 line-clamp-2">{produto.description}</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-green-600 font-bold">R$ {produto.price}</span>
                <span className="text-yellow-500 text-sm">★ {produto.rating}</span>
              </div>
            </div>
          ))}
        </div>

        {/* MENSAGEM CASO NÃO ENCONTRE NADA */}
        {produtosFiltrados.length === 0 && (
          <p className="mt-10 text-gray-500">Nenhum produto encontrado.</p>
        )}
      </main>
    </div>
  );
}