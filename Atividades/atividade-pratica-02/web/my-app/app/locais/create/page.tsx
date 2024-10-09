"use client"

import Input from "@/app/components/forms/input";
import { getAllCidade } from "@/app/repository/cidades/CidadeRepository";
import ICidade from "@/app/types/ICidade";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react"

export default function CreateLocal() {

    const [ nome, setNome ] = useState('');
    const [ rua, setRua ] = useState('');
    const [ numero, setNumero ] = useState('');
    const [ complemento, setComplemento ] = useState('');
    const [ cidade_id, setCidadeId ] = useState('');


    const [ cidades, setCidades ] = useState<ICidade[]>([])

    const { push } = useRouter();

    useEffect( () => {

        getAllCidade()
            .then(data => setCidades(data))

    }, [])
    
    async function handleSubmit(event : FormEvent) {

        event.preventDefault()

        const data = {
            nome,
            rua,
            numero,
            complemento,
            cidade_id: parseInt(cidade_id),
        }

        const requisicao : RequestInit = {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        }

        try {

            const response = await fetch('http://localhost:5000/locaiscoleta', requisicao)

            if (response.ok) {

                const local = await response.json()

                const { id } = local

                window.alert(`Local de coleta inserido com sucesso! Id: ${id}`)

                push('/locais')

            }

        } catch (error) {
            window.alert('Erro na inclusão do local de coleta!')
            console.error(error)
        }
    }

    return (
        <main>
            <h1 className="text-center font-bold py-4">Cadastro de local de coleta:  {nome} </h1>

            <form className="grid gap-4" onSubmit={handleSubmit} action="/cadastrar">
            
            <Input 
                label="Nome"
                name="nome"
                value={nome}
                setValue={(event) => {
                    setNome(event.target.value)
                }}
            />

            <Input 
                label="Rua"
                name="rua"
                value={rua}
                setValue={(event) => {
                    setRua(event.target.value)
                }}
            />

            <Input
                label="Número"
                name="numero"
                value={numero}
                setValue={(event) => {
                    setNumero(event.target.value)
                }}
            />

            <Input
                label="Complemento"
                name="complemento"
                value={complemento}
                setValue={(event) => {
                    setComplemento(event.target.value)
                }}
            />

            <div>
                <label className="font-bold" htmlFor="cidade_id">Cidade:</label>
                <select 
                            name="cidade_id"
                            id="cidade_id"
                            value={cidade_id} 
                            onChange={(event) => {
                                setCidadeId(event.target.value)
                            }}
                >

                    <option
                        value=""
                        defaultValue=""
                        disabled
                    >Selecione:</option>
                    {
                        cidades.map((cidade) => {
                            return(
                                <option 
                                    key={cidade.id}
                                    value={cidade.id}
                                >
                                    {cidade.nome}-{cidade.estado.sigla}
                                </option>
                            )
                        })
                    }
                </select>
            </div>

            <div className="flex gap-4">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">Cadastrar</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"  type="reset">Limpar</button>
                <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  href="/locais">Voltar</Link>
            </div>
            </form>

        </main>
    )

}