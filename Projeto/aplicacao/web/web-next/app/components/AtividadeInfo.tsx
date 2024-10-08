'use client'

import IUsuario from "../types/IUsuario"
import IAtividade from "../types/IAtividade"
import IDisciplina from "../types/IDisciplina"
import { useEffect, useState } from "react"
import Select, { SelectOption } from "./Select"
import { getAllUsuarios } from "../repository/usuarios/UsuarioRepository"
import { getAllAtividades } from "../repository/atividades/AtividadeRepository"
import Link from "next/link"
import Input from "./Input"
import dayjs from "dayjs"
import { getAllDisciplinas } from "../repository/disciplinas/DisciplinaRepository"


const AtividadeInfo: React.FC = () => {

    const [usuario_id, setUsuarioId] = useState('')

    const [atividades, SetAtividades] = useState<IAtividade[]>([])
    const [usuarios, setUsuarios ] = useState<IUsuario[]>([])
    const [ disciplinas, setDisciplinas] = useState<IDisciplina[]>([])
    const [atividades_filtradas, SetAtividadesFiltradas] = useState<IAtividade[]>([])
    const [disciplinas_filtradas, setDisciplinasFiltradas] = useState<IDisciplina[]>([])

    const [dataInicio, setDataInicio] = useState<string>('')
    const [dataFim, setDataFim] = useState<string>('')
    const [disciplina_id, setDisciplinaId] = useState('')

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
      
      getAllAtividades()
            .then( data => SetAtividades(data))

    }, [])

    useEffect(() =>{
      

      let atividadesFiltradas = atividades.filter(atividade => atividade.usuario.id.toString() === usuario_id);

      if(usuario_id) {
        const disciplinasDoUsuario = disciplinas
            .filter(disciplina => disciplina.usuario.id.toString() === usuario_id)
        setDisciplinasFiltradas(disciplinasDoUsuario)
      } else {
        setDisciplinasFiltradas([])
      }

        if (dataInicio) {
            atividadesFiltradas = atividadesFiltradas.filter(atividade =>
                new Date(atividade.data) >= new Date(dataInicio)
            );
        }

        if (dataFim) {
            atividadesFiltradas = atividadesFiltradas.filter(atividade =>
              dayjs(atividade.data).isBefore(dayjs(dataFim).add(1, 'day'))
            );
        }

        if (disciplina_id) {
          atividadesFiltradas = atividadesFiltradas.filter(atividade => atividade.disciplina.id.toString() === disciplina_id)
        }

        atividadesFiltradas = atividadesFiltradas.sort((a, b) => {
            if (a.status === b.status) {
                return new Date(a.data).getTime() - new Date(b.data).getTime();
            }
            return a.status ? 1 : -1;
        });

        SetAtividadesFiltradas(atividadesFiltradas);

    }, [usuario_id, atividades, dataInicio, dataFim, disciplina_id]);

    const limparFiltros = () => {
      setDataInicio('');
      setDataFim('');
      setDisciplinaId('');
      SetAtividadesFiltradas(atividades.filter(atividade => atividade.usuario.id.toString() === usuario_id));
  };

    const userOptions: SelectOption[] = usuarios.map(usuario => ({
        value: usuario.id.toString(),
        label: `${usuario.nome} ${usuario.sobrenome}`
      }));

      const DisciplinaOptions: SelectOption[] = disciplinas_filtradas.map(disciplina => ({
        value: disciplina.id.toString(),
        label: `${disciplina.nome} - ${disciplina.sigla_abreviacao}`
      }));

    const handleToggleStatus = async (id: number, newStatus: boolean) => {
        const requisicao: RequestInit = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status: newStatus }) 
        };
      
        try {
          const response = await fetch(`http://localhost:5000/atividades/${id}`, requisicao);
          if (response.ok) {
            SetAtividades(atividades.map(item => 
              item.id === id ? { ...item, status: newStatus } : item
            ));
            SetAtividadesFiltradas(atividades_filtradas.map(item => 
              item.id === id ? { ...item, status: newStatus } : item
            ));
          } else {
            const erro = await response.json()
            const {error} = erro
            window.alert(`Erro ao atualizar status da atividade: ${error}`)
          }
        } catch (error) {
          window.alert('Erro ao atualizar status da atividade');
          console.error(error);
        }
      };

    const handleDelete = async (id: number) => {

        const requisicao : RequestInit = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const response = await fetch(`http://localhost:5000/atividades/${id}`, requisicao)

            if (response.ok) {
                window.alert(`Atividade excluída com sucesso! Id: ${id}`)
                SetAtividades(atividades.filter(
                    item => item.id != id 
                ))
                SetAtividadesFiltradas(atividades_filtradas.filter(item => item.id != id))
            }

        } catch (error) {
            window.alert("Erro na exclusão da atividade!")
            console.error(error)
        }
        
    }

    return(
        <main>
            <div className="bg-terciary p-4">
                <div className="bg-blue-100 p-4">
                    <Select
                        label="Selecione o usuário para ver as atividades pertencentes a ele"
                        options={userOptions}
                        value={usuario_id}
                        onChange={(e) => setUsuarioId(e.target.value)}
                    />
                    <p className="text-lg font-semibold text-foreground my-4">Filtrar por data:</p>
                    <div className="my-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Input 
                          type="date"
                          label="Data Início"
                          name="datainicio"
                          setValue={(e) => setDataInicio(e.target.value)}>
                        </Input>
                      </div>
                      <div>
                        <Input 
                            type="date"
                            label="Data Fim"
                            name="datafim"
                            setValue={(e) => setDataFim(e.target.value)}>
                        </Input>
                      </div>
                    </div>
                    <div className=" py-4">
                      <Select
                          label="Filtrar por disciplina:"
                          options={DisciplinaOptions}
                          value={disciplina_id}
                          onChange={(e) => setDisciplinaId(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-center mt-4">
                        <button 
                            onClick={limparFiltros}
                            className="bg-gray-400 text-black py-2 px-4 rounded hover:bg-gray-500"
                        >
                            Limpar Filtros
                        </button>
                    </div>      
                </div>
                {atividades_filtradas.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-10">
                    {atividades_filtradas.map((atividade) => (
                      <div key={atividade.id}    className="border rounded-lg shadow-lg p-4 bg-white">
                        <div className={`mt-2 py-2 px-3 rounded ${atividade.status ? 'bg-green-500' : 'bg-yellow-300'} text-white mb-2`}>
                            <p className={`text-sm text-white`}
                            >{atividade.status ? 'Concluída' : 'Pendente'}
                            </p>
                        </div>
                        <h2 className="text-xl font-semibold mb-2">{atividade.titulo} - {atividade.disciplina.sigla_abreviacao}</h2>
                        <h2 className="font-semibold mb-2">Data: {new Date(atividade.data).toLocaleDateString()}</h2>
                        <p className="text-gray-600">{atividade.descricao}</p>
                        <p className="text-sm text-gray-400">Disciplina: {atividade.disciplina.nome}</p>
                        <p className="text-sm text-gray-400">Tipo: {atividade.tipo}</p>
                        <button
                                onClick={() => handleToggleStatus(atividade.id, !atividade.status)}
                                className="my-4 bg-blue-200 text-black py-0 px-2 rounded-full font-semibold border-4 border-gray-100 hover:border-indigo-300"
                            >
                                {atividade.status ? 'Marcar como pendente' : 'Marcar como concluída'}
                            </button>
                        <div className="mt-4 flex justify-center gap-4">

                            <Link className="bg-primary text-white py-1 px-3 rounded hover:bg-pink-700" href={`/atividades/update/${atividade.id}`}
                            >
                              Editar
                            </Link>
                            <button
                              onClick={() => { 
                                if (window.confirm(`Tem certeza que deseja excluir a atividade ${atividade.titulo} cadastrada por  ${atividade.usuario.nome} ${atividade.usuario.sobrenome}?`)) {
                                handleDelete(atividade.id)
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
                      Nenhuma atividade para exibir.
                    </p>
                  )}

            </div>
        </main>
    )
}

export default AtividadeInfo;