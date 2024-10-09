import Link from "next/link";
import TipoTable from "../components/TipoTable";

export default function Tipo() {

    return(
        
        <main>

            <div className="flex justify-center bg-red-100 gap-5 p-4">
                <Link className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" href="/">Home</Link>
                <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="/tipos/create">Adicionar</Link>
            </div>

                <h1 className="text-center p-4 text-2xl font-bold ">Lista de tipos sanguíneos</h1>
            <div className="flex justify-center">
                <TipoTable></TipoTable>
            </div>

        </main>

    )
}