"use client"

import Input from "@/app/components/forms/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react"

export default function CreateEstado() {

    const [ nome, setNome ] = useState('');    
    const [ sigla, setSigla ] = useState('');

    const { push } = useRouter();
    
    async function handleSubmit(event : FormEvent) {

        event.preventDefault()
        // Validação dos dados
        // ...

        const data = {
            nome,
            sigla
        }

        // Invocar a API - gravar UF
        const requisicao : RequestInit = {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        }

        try {

            const response = await fetch('http://localhost:5000/estados', requisicao)
            // Se tudo correto, redirecionar lista de Ufs

            if (response.ok) {

                const estado = await response.json()

                const { id } = estado

                window.alert(`Estado inserido com sucesso! Id: ${id}`)

                // Redirecionar
                push('/estados')

            }

        } catch (error) {
            // Caso contrário, reporta erro.
            window.alert('Erro na inclusão do Estado!')
            console.error(error)
        }


    }

    return (
        <main>
            <h1 className="text-center font-bold py-4">Cadastro de estado: {nome}-{sigla}</h1>

            <form className="grid gap-4" onSubmit={handleSubmit} action="/cadastrar">

            <Input 
                label="Nome"
                name="nome"
                placeholder="Insira o nome do estado"
                value={nome}
                setValue={(event) => {
                    setNome(event.target.value)
                }}
            />

            <Input
                label="Sigla"
                name="sigla"
                value={sigla}
                placeholder="Sigla da Unidade Federativa"
                setValue={(event) => {
                    setSigla(event.target.value)
                }}
            />

            <div className="flex gap-4">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">Cadastrar</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"  type="reset">Limpar</button>
                <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  href="/estados">Voltar</Link>
            </div>
            </form>

        </main>
    )

}