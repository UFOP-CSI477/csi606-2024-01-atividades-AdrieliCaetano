'use client'

import React, { useEffect, useState } from 'react';
import Layout from '@/app/components/Layout';
import Input from '@/app/components/Input';
import Select, { SelectOption } from '@/app/components/Select';
import IUsuario from '@/app/types/IUsuario';
import IDisciplina from '@/app/types/IDisciplina';
import { getAllUsuarios } from '@/app/repository/usuarios/UsuarioRepository';
import { getAllDisciplinas } from '@/app/repository/disciplinas/DisciplinaRepository';
import { useRouter } from 'next/navigation';

const HomePage: React.FC = () => {

  const [titulo, setTitulo] = useState('')
  const [ descricao, setDescricao] = useState('')
  const [ data, setData] = useState('')
  const [ tipo, setTipo] = useState('')
  const [ status, setStatus] = useState('')
  const [ usuario_id, setUsuarioId] = useState('')
  const [ disciplina_id, setDisciplnaId] = useState('')

  const [usuarios, setUsuarios] = useState<IUsuario[]>([])
  const [disciplinas, setDisciplinas] = useState<IDisciplina[]>([])
  const [disciplinasFiltradas, setDisciplinasFiltradas] = useState<SelectOption[]>([])

  const { push } = useRouter()

  useEffect(() => {
    getAllUsuarios()
      .then( data => setUsuarios(data))
      .catch(error => console.error(error))

    getAllDisciplinas()
      .then( data => setDisciplinas(data))
  }, [])

  useEffect(() => {
    if (usuario_id) {
      const disciplinasDoUsuario = disciplinas
        .filter(disciplina => disciplina.usuario.id.toString() === usuario_id)
        .map(disciplina => ({
          value: disciplina.id.toString(),
          label: `${disciplina.nome} - ${disciplina.sigla_abreviacao}`
        }));
      setDisciplinasFiltradas(disciplinasDoUsuario);
    } else {
      setDisciplinasFiltradas([]); 
    }
  }, [usuario_id, disciplinas]);

  const userOptions: SelectOption[] = usuarios.map(usuario => ({
    value: usuario.id.toString(),
    label: `${usuario.nome} ${usuario.sobrenome}`
  }));


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dados = {
      titulo, 
      descricao,
      data,
      tipo,
      status,
      usuario_id,
      disciplina_id

    }

    const requisicao : RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    }

    try {
      
      const  response = await fetch('http://localhost:5000/atividades', requisicao)

      if (response.ok){
        const atividade = await response.json()
        const { id } = atividade

        window.alert(`Atividade criada com sucesso! Id: ${id}`)
  
        push('/atividades')

        } else {
          const erro = await response.json()
          const {error} = erro
          window.alert(`Erro: ${error}`)
        }        

    } catch (error) {
      window.alert(`Erro na criação da atividade`)
        console.error(error)
      }
    
  };

  return (
    <Layout>
        <div className="flex items-center justify-center min-h-screen">
        <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Criar Nova Atividade</h2>

        <Input
          label="Título"
          name="titulo"
          placeholder="Digite título da atividade"
          value={titulo}
          setValue={(event) => setTitulo(event.target.value)}
        />

        <div className="flex flex-col gap-2">
            <label htmlFor='descricao' className="text-lg font-semibold text-foreground">
            Descrição
            </label>
            <textarea
                name="descricao"
                id="descricao"
                value={descricao}
                placeholder="Insira informações relevantes sobre a atividade. Ex.: Estudar capítulos 7 e 8 para a prova; Desenvolver uma RESTful API para o trabalho..."
                rows={4}
                onChange={(e) => setDescricao(e.target.value)}
                className="
                  w-full
                  px-4
                  py-2
                  bg-background
                  border
                  border-gray-300
                  rounded-md
                  text-base
                  font-medium
                  text-foreground
                  placeholder-gray-500
                  shadow-sm
                  focus:outline-none
                  focus:ring-2
                  focus:ring-primary
                  focus:border-primary
                  transition-all
                  duration-300
                  resize-y
                "
            />
        </div>

        <Input
          type='date'
          label="Data limite"
          name="data"
          value={data}
          setValue={(event) => setData(event.target.value)}
        />

        

        <Input
          label="Tipo"
          name="tipo"
          value={tipo}
          placeholder="Ex.: Prova presencial, tarefa no moodle..."
          setValue={(event) => setTipo(event.target.value)}
        />


        <Select
          label="Usuário"
          options={userOptions}
          value={usuario_id}
          onChange={(e) => setUsuarioId(e.target.value)}
        />

        <Select
          label="Disciplina"
          options={disciplinasFiltradas}
          value={disciplina_id}
          onChange={(e) => setDisciplnaId(e.target.value)}
        />
    
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-all"
        >
          Enviar
        </button>
      </form>
    </div>

    </Layout>
  );
};

export default HomePage;