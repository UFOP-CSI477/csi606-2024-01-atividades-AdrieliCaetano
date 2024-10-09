"use client"

import Input from "@/app/components/forms/input";
import { getAllCidade } from "@/app/repository/cidades/CidadeRepository";
import { getByIdPessoa } from "@/app/repository/pessoas/PessoaRepository";
import { getAllTipos } from "@/app/repository/tipos/TipoRepository";
import ICidade from "@/app/types/ICidade";
import ITipo from "@/app/types/ITipo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react"

interface IUpdatePessoaParams {
    params : {
        id: string
    }
}

export default function UpdatePessoa( {params}: IUpdatePessoaParams) {

    const [ nome, setNome ] = useState('');
    const [ rua, setRua ] = useState('');
    const [ numero, setNumero ] = useState('');
    const [ complemento, setComplemento ] = useState('');
    const [ rg, setRg ] = useState('');
    const [ cidade_id, setCidadeId ] = useState('');
    const [ tipo_id, setTipoId ] = useState('');

    const [ cidades, setCidades ] = useState<ICidade[]>([])
    const [ tipos, setTipos ] = useState<ITipo[]>([])

    const { push } = useRouter();


    useEffect( () => {

        getAllCidade()
            .then(data => setCidades(data))

        getAllTipos()
            .then(data => setTipos(data))

        getByIdPessoa(params.id)
            .then((data) => {
                setNome(data.nome)
                setRua(data.rua)
                setNumero(data.numero)
                setComplemento(data.complemento)
                setRg(data.rg)
                setCidadeId(data.cidade_id)
                setTipoId(data.tipo_id)
            })
    }, [params])

    useEffect
    
    async function handleSubmit(event : FormEvent) {

        event.preventDefault()

        const data = {
            id: parseInt(params.id),
            nome,
            rua,
            numero,
            complemento,
            rg,
            cidade_id: parseInt(cidade_id),
            tipo_id: parseInt(tipo_id)
        }

        const requisicao : RequestInit = {
            method: "PATCH",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        }

        try {

            const response = await fetch('http://localhost:5000/pessoas', requisicao)

            if (response.ok) {

                const pessoa = await response.json()

                const { id } = pessoa

                window.alert(`Pessoa alterada com sucesso! Id: ${id}`)

                push('/pessoas')

            }

        } catch (error) {
            window.alert('Erro na alteração da pessoa!')
            console.error(error)
        }

    }

    return (
        <main>
            <h1 className="text-center font-bold py-4">Atualização de pessoa:</h1>

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

            <Input
                label="RG"
                name="rg"
                value={rg}
                setValue={(event) => {
                    setRg(event.target.value)
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

            <div>
                <label className="font-bold" htmlFor="tipo_id">Tipo Sanguíneo:</label>
                <select 
                            name="tipo_id"
                            id="tipo_id"
                            value={tipo_id} 
                            onChange={(event) => {
                                setTipoId(event.target.value)
                            }}
                >

                    <option
                        value=""
                        defaultValue=""
                        disabled
                    >Selecione:</option>
                    {
                        tipos.map((tipo) => {
                            return(
                                <option 
                                    key={tipo.id}
                                    value={tipo.id}
                                >
                                    {tipo.tipo}{tipo.fator}
                                </option>
                            )
                        })
                    }
                </select>
            </div>


            <div className="flex gap-4">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">Atualizar</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"  type="reset">Limpar</button>
                <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  href="/pessoas">Voltar</Link>
            </div>
            </form>

        </main>
    )

}