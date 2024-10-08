'use client'

import IUsuario from "../types/IUsuario"
import { useEffect, useState } from "react"
import { getAllUsuarios} from "../repository/usuarios/UsuarioRepository";
import Link from "next/link";

const UsuarioInfo: React.FC = () => {
    
    const [ usuarios, setUsuarios ] = useState<IUsuario[]>([])

    useEffect(() => {

        getAllUsuarios()
            .then(data => {
              const sortedUsuarios = data.sort((a: { nome: { toLowerCase: () => number; }; }, b: { nome: { toLowerCase: () => number; }; }) => {
                if (a.nome.toLowerCase() < b.nome.toLowerCase()) return -1;
                if (a.nome.toLowerCase() > b.nome.toLowerCase()) return 1;
                return 0;
              });
              setUsuarios(sortedUsuarios);
            })

    }, [])

      const handleDelete = async (id: number) => {
        const requisicao : RequestInit = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const response = await fetch(`http://localhost:5000/usuarios/${id}`, requisicao)

            if (response.ok) {
                window.alert(`Usuário excluído com sucesso! Id: ${id}`)
                setUsuarios(usuarios.filter(
                    item => item.id != id 
                ))
            }

        } catch (error) {
            window.alert("Erro na exclusão do usuário!")
            console.error(error)
        }

      };

    return (
        <div className="bg-terciary p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {usuarios.map((usuario) => (
              <div key={usuario.id} className="border rounded-lg shadow-lg p-4 bg-white">
                <h2 className="text-xl font-semibold mb-2">{usuario.nome} {usuario.sobrenome}</h2>
                <p className="text-gray-600">Email: {usuario.email}</p>
                <div className="mt-4 flex justify-center gap-4">
                    <Link className="bg-primary text-white py-1 px-3 rounded hover:bg-pink-700" href={`/usuarios/update/${usuario.id}`}
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => { 
                        if (window.confirm(`Tem certeza que deseja excluir o usuário de email: ${usuario.email} ?`)) {
                        handleDelete(usuario.id)
                        }
                    }}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                      Excluir
                    </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
};
  
  export default UsuarioInfo;