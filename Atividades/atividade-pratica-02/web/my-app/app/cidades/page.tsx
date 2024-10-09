import Link from "next/link";
import CidadeTable from "../components/CidadeTable";

export default function Cidade() {

    return(
        
        <main>

            <div className="flex justify-center bg-red-100 gap-5 p-4">
                <Link className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" href="/">Home</Link>
                <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="/cidades/create">Adicionar</Link>
            </div>

                <h1 className="text-center p-4 text-2xl font-bold ">Lista de Cidades</h1>
            <div className="flex justify-center">
                <CidadeTable/>
            </div>

        </main>

    )
}