"use client"

import IPessoa from "@/app/types/IPessoa";
import ILocal from "@/app/types/ILocal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react"
import { getAllPessoas } from "@/app/repository/pessoas/PessoaRepository";
import { getAllLocais } from "@/app/repository/locais/LocalRepository";
import { getByIdDoacao } from "@/app/repository/doacoes/DoacaoRepository";


interface IUpdateDoacaoParams {
    params : {
        id: string
    }
}
export default function UpdateDoacao( { params }: IUpdateDoacaoParams) {

    const [ pessoa_id, setPessoaId ] = useState('');
    const [ local_id, setLocalId ] = useState('');
    const [ data, setData ] = useState('');

    const [ pessoas, setPessoas ] = useState<IPessoa[]>([])
    const [ locais, setLocais ] = useState<ILocal[]>([])

    const { push } = useRouter();


    useEffect( () => {

        getAllPessoas()
            .then(data => setPessoas(data))

        getAllLocais()
            .then(data => setLocais(data))

        getByIdDoacao( params.id )
            .then((data) => {
                setLocalId(data.local.id)
                setPessoaId(data.pessoa.id)
                setData(data.data)
            })
    }, [params])
    
    async function handleSubmit(event : FormEvent) {

        event.preventDefault()

        const dados = {
            id: parseInt(params.id),
            pessoa_id: parseInt(pessoa_id),
            local_id: parseInt(local_id),
            data: data
        }

        const requisicao : RequestInit = {
            method: "PATCH",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(dados)
        }

        try {

            const response = await fetch('http://localhost:5000/doacoes', requisicao)

            if (response.ok) {

                const doacao = await response.json()

                const { id } = doacao

                window.alert(`Doação alterada com sucesso! Id: ${id}`)

                push('/doacoes')

            }

        } catch (error) {
            window.alert('Erro na alteração da doação!')
            console.error(error)
        }
    }

    return (
        <main>
            <h1 className="text-center font-bold py-4">Atualização de doação:</h1>

            <form className="grid gap-4" onSubmit={handleSubmit} action="/cadastrar">
            
            <div>
                <label className="font-bold" htmlFor="pessoa_id">Pessoa doadora:</label>
                <select 
                            name="pessoa_id"
                            id="pessoa_id"
                            value={pessoa_id} 
                            onChange={(event) => {
                                setPessoaId(event.target.value)
                            }}
                >

                    <option
                        value=""
                        defaultValue=""
                        disabled
                    >Selecione:</option>
                    {
                        pessoas.map((pessoa) => {
                            return(
                                <option 
                                    key={pessoa.id}
                                    value={pessoa.id}
                                >
                                    {pessoa.nome}
                                </option>
                            )
                        })
                    }
                </select>
            </div>

            <div>
                <label className="font-bold" htmlFor="local_id">Local de coleta:</label>
                <select 
                            name="local_id"
                            id="local_id"
                            value={local_id} 
                            onChange={(event) => {
                                setLocalId(event.target.value)
                            }}
                >

                    <option
                        value=""
                        defaultValue=""
                        disabled
                    >Selecione:</option>
                    {
                        locais.map((local) => {
                            return(
                                <option 
                                    key={local.id}
                                    value={local.id}
                                >
                                    {local.nome}
                                </option>
                            )
                        })
                    }
                </select>
            </div>

            <div className="flex gap-4">
            <label className="font-bold" htmlFor="data">Data da coleta:</label>
            <input
                className="
                border
                rounded
                bg-transparent
                text-base
                font-medium
                text-gray-900
                placeholder:text-gray-400
                outline
                outline-gray-300
                focus:ring-2
                focus:ring-blue-500
                "
                type="date" 
                name="data"
                onChange={(event) => {setData((new Date(event.target.value)).toISOString())}}
            />
            </div>

            <div className="flex gap-4">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">Atualizar</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"  type="reset">Limpar</button>
                <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  href="/doacoes">Voltar</Link>
            </div>
            </form>

        </main>
    )

}