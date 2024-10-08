'use client'

import React, { useEffect, useState } from 'react';
import Layout from '@/app/components/Layout';
import Input from '@/app/components/Input';
import Select from '@/app/components/Select';
import { SelectOption } from '@/app/components/Select';
import IUsuario from '@/app/types/IUsuario';
import { useRouter } from 'next/navigation';
import { getAllUsuarios } from '@/app/repository/usuarios/UsuarioRepository';



const HomePage: React.FC = () => {
    
    const [nome, setNome] = useState('');
    const [sigla_abreviacao, setSiglaAbreviacao] = useState('');
    const [usuario_id, setUsuarioId] = useState('');

    const [ usuarios, setUsuarios ] = useState<IUsuario[]>([])

    const { push } = useRouter()

    useEffect(() => {

      getAllUsuarios()
          .then( data => setUsuarios(data))
          .catch(error => console.error(error))

  }, [])

  const userOptions: SelectOption[] = usuarios.map(usuario => ({
    value: usuario.id.toString(),
    label: `${usuario.nome} ${usuario.sobrenome}`
  }));


    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      const data = {
        nome,
        sigla_abreviacao,
        usuario_id
      }
  
      const requisicao : RequestInit = {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
      }
  
      try {
  
        const response = await fetch('http://localhost:5000/disciplinas', requisicao)
        
        if (response.ok) {
          const disciplina = await response.json()
          const { id } = disciplina
  
          window.alert(`Disciplina criada com sucesso! Id: ${id}`)
  
          push('/disciplinas')
        } else {
          const erro = await response.json()
          const {error} = erro
          window.alert(`Erro: ${error}`)
        }
      } catch (error) {
        window.alert(`Erro na criação da disciplina`)
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
        <h2 className="text-2xl font-bold text-center mb-4">Criar Nova Disciplina</h2>

        <Input
          label="Nome"
          name="nome"
          placeholder="Digite nome o nome da disciplina"
          value={nome}
          setValue={(event) => {
            setNome(event.target.value)
          }}
        />

        <Input
          label="Sigla/Abreviação"
          name="sigla_abreviacao"
          placeholder="Digite a sigla ou abreviação da disciplina"
          value={sigla_abreviacao}
          setValue={(event) => {
            setSiglaAbreviacao(event.target.value)
          }}
        />


        <Select
          label="Usuário"
          options={userOptions}
          value={usuario_id}
          onChange={(e) => setUsuarioId(e.target.value)}
      />

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-all"
        >
          Criar
        </button>
      </form>
    </div>

    </Layout>
  );
}

export default HomePage;