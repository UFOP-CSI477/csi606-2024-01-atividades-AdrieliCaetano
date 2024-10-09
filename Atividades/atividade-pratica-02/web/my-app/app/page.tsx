import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center content-center h-screen bg-red-100">
      <img className="mx-auto p-10"src="gota-de-sangue.png" alt="Gota de Sangue" width="300px" />
      <h1 className="p-4 text-4xl font-bold">Sistema de Controle de Doação de Sangue</h1>
      <div className="flex gap-5 justify-center my-10">
      <Link className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" href="/estados">Estados</Link>
      <Link className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" href="/cidades">Cidades</Link>
      <Link className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" href="/pessoas">Pessoas</Link>
      <Link className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" href="/tipos">Tipos Sanguíneos</Link>
      <Link className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" href="/doacoes">Doações</Link>
      <Link className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" href="/locais">Locais de Coleta</Link>
      </div>
    </div>
  );
}
