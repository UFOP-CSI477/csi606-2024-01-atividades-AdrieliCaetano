'use client';

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getByIdUsuario } from "../../../repository/usuarios/UsuarioRepository";
import Layout from "@/app/components/Layout";
import Input from "@/app/components/Input";


const UsuarioUpdate: React.FC = () => {
    
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('')
    const [email, setEmail] = useState('');

    const params = useParams()
    const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  
    const { push } = useRouter();

    useEffect(() => {
        if (id) {
            getByIdUsuario(id)
                .then(data => {
                    setNome(data.nome);
                    setSobrenome(data.sobrenome);
                    setEmail(data.email);
                })
                .catch(error => {
                    console.error("Erro ao buscar dados do usuário", error);
                });
        }
    }, [id]);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      const data = {
        nome,
        sobrenome,
        email
      }
  
      const requisicao : RequestInit = {
        method: "PATCH",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
      }
  
      try {
  
        const response = await fetch(`http://localhost:5000/usuarios/${id}`, requisicao)
        
        if (response.ok) {
          const usuario = await response.json()
          const { id } = usuario
  
          window.alert(`Usuário alterado com sucesso! Id: ${id}`)
  
          push('/usuarios')

        } else {
          const erro = await response.json()
          const {error} = erro
          window.alert(`Erro: ${error}`)
        }
      } catch (error) {
        window.alert(`Erro na alteração do usuário`)
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
        <h2 className="text-2xl font-bold text-center mb-4">Editar Usuário</h2>

        <Input
          label="Nome"
          name="nome"
          value={nome}
          placeholder="Digite seu primeiro nome"
          setValue={(event) => {
            setNome(event.target.value)
          }}
        />

        <Input
          label="Sobrenome"
          name="sobrenome"
          placeholder="Digite seu sobrenome"
          value={sobrenome}
          setValue={(event) => {
            setSobrenome(event.target.value)
          }}
        />

        <Input
          label="Email"
          name="email"
          placeholder="Digite seu email"
          value={email}
          type="email"
          setValue={(event) => {
            setEmail(event.target.value)
          }}
        />

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-all"
        >
          Editar
        </button>
      </form>
    </div>

    </Layout>
    )
}

export default UsuarioUpdate;