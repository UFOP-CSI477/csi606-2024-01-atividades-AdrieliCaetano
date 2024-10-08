'use client'

import IDisciplina from "../types/IDisciplina";
import { useEffect, useState } from "react"
import { getAllDisciplinas } from "../repository/disciplinas/DisciplinaRepository";
import Link from "next/link";
import IUsuario from "../types/IUsuario";
import { getAllUsuarios } from "../repository/usuarios/UsuarioRepository";
import Select, { SelectOption } from "./Select";

const DisciplinaInfo: React.FC = () => {

    const [usuario_id, setUsuarioId] = useState('')

    const [ disciplinas, setDisciplinas] = useState<IDisciplina[]>([])
    const [usuarios, setUsuarios ] = useState<IUsuario[]>([])
    const [disciplinas_filtradas, setDisciplinasFiltradas] = useState<IDisciplina[]>([])

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

        getAllDisciplinas()
            .then(data => setDisciplinas(data))

    }, [])

    useEffect(() =>{
      if(usuario_id) {
          const disciplinasDoUsuario = disciplinas
              .filter(disciplina => disciplina.usuario.id.toString() === usuario_id)
          setDisciplinasFiltradas(disciplinasDoUsuario)
      } else {
          setDisciplinasFiltradas([])
      }
  }, [usuario_id, disciplinas]);

  const userOptions: SelectOption[] = usuarios.map(usuario => ({
    value: usuario.id.toString(),
    label: `${usuario.nome} ${usuario.sobrenome}`
  }));

      const handleDelete = async (id: number) => {
        const requisicao : RequestInit = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const response = await fetch(`http://localhost:5000/disciplinas/${id}`, requisicao)

            if (response.ok) {
                window.alert(`Disciplina excluída com sucesso! Id: ${id}`)
                setDisciplinas(disciplinas.filter(
                    item => item.id != id 
                ))
            }

        } catch (error) {
            window.alert("Erro na exclusão da disciplina!")
            console.error(error)
        }

      };

    return (
        <div className="bg-terciary p-4">
          <div className="bg-blue-100 p-4">
            <Select
                label="Selecione o usuário para ver as disciplinas pertencentes a ele"
                options={userOptions}
                value={usuario_id}
                onChange={(e) => setUsuarioId(e.target.value)}
            />
          </div>
          {disciplinas_filtradas.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-10">
              {disciplinas_filtradas.map((disciplina) => (
                <div key={disciplina.id} className="border rounded-lg shadow-lg p-4 bg-white">
                  <h2 className="text-xl font-semibold mb-2">{disciplina.nome}</h2>
                  <div className="mt-4 flex justify-center gap-4">
                      <Link className="bg-primary text-white py-1 px-3 rounded hover:bg-pink-700" href={`/disciplinas/update/${disciplina.id}`}
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => { 
                          if (window.confirm(`Tem certeza que deseja excluir a disciplina ${disciplina.nome} cadastrada por  ${disciplina.usuario.nome} ${disciplina.usuario.sobrenome}?`)) {
                          handleDelete(disciplina.id)
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
          ) : (
            <p className="text-center text-gray-600 mt-10">
              Nenhuma disciplina para exibir.
            </p>
          )
          }
          </div>
      );
};
export default DisciplinaInfo;