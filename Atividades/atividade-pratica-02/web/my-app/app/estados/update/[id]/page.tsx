"use client"

import Input from "@/app/components/forms/input";
import { getByIdEstado } from "@/app/repository/estados/EstadoRepository";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react"


interface IUpdateEstadoParams {
    params : {
        id: string
    }
}
export default function UpdateEstado( {params} : IUpdateEstadoParams) {

    const [ nome, setNome ] = useState('');    
    const [ sigla, setSigla ] = useState('');

    const { push } = useRouter();

    useEffect(() => {

        getByIdEstado(params.id)
            .then( data => {
                setNome(data.nome)
                setSigla(data.sigla)
            } )
    }, [params])

    async function handleSubmit(event : FormEvent) {

        event.preventDefault()
        // Validação dos dados
        // ...

        const data = {
            id: parseInt(params.id),
            nome,
            sigla
        }

        // Invocar a API - gravar UF
        const requisicao : RequestInit = {
            method: "PATCH",
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

                window.alert(`Estado atualizado com sucesso! Id: ${id}`)

                // Redirecionar
                push('/estados')

            }

        } catch (error) {
            // Caso contrário, reporta erro.
            window.alert('Erro na atualização do Estado!')
            console.error(error)
        }


    }

    return (
        <main>
            <h1 className="text-center font-bold py-4">Atualizar estado: {nome}-{sigla}</h1>

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
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">Atualizar</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"  type="reset">Limpar</button>
                <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  href="/estados">Voltar</Link>
            </div>
            </form>
        </main>
    )

}