"use client"

import Input from "@/app/components/forms/input";
import { getAllEstados } from "@/app/repository/estados/EstadoRepository";
import { useRouter } from "next/navigation";
import IEstado from "@/app/types/IEstado";
import { FormEvent, useEffect, useState } from "react"

import { getByIdCidade } from "@/app/repository/cidades/CidadeRepository";
import Link from "next/link";

interface IUpdateCidadeParams {
    params : {
        id: string
    }
}

export default function CidadeUpdate( { params } : IUpdateCidadeParams) {
    
    const [ nome, setNome ] = useState('');
    const [ estado_id, setEstadoId ] = useState('')

    const { push } = useRouter();

    const [ estados, setEstados ] = useState<IEstado[]>([])

    useEffect(() => {

        getAllEstados()
            .then( data => setEstados(data))
            .catch(error => console.error(error))

        getByIdCidade( params.id )
            .then( data => {
                setNome(data.nome)
                setEstadoId(data.estado_id)
            })

    }, [params])

    // Invocar a API/backend - atualizar a cidade
    const handleSubmit = async (event : FormEvent) => {
        
        event.preventDefault()
        //Validar
        
        // Definir o objeto
        const data = {
            id: params.id,
            nome,
            estado_id
        }

        // Definir a requisição - atualização
        const requisicao : RequestInit = {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        }

        // Invocar a requisição
        try {
            
            const response = await fetch('http://localhost:5000/cidades', requisicao)

            if (response.ok) {
                // Tratar o resultado 
                const cidade = await response.json();
                const { id } = cidade

                window.alert(`Cidade atualizada com sucesso! Id: " ${id}`)

                push('/cidades')
            }

        } catch (error) {
            window.alert('Erro na atualização da cidade!')
            console.error(error)
        }

    }
    
    return (

        <main>
            <h1 className="text-center font-bold py-4">Atualização de cidade:  {nome} </h1>

            <form className="grid gap-4" onSubmit={handleSubmit} action="/cadastrar">

                <Input
                    label="Nome"
                    name="nome"
                    value={nome}
                    placeholder="Insira o nome da cidade"
                    setValue={(event) => {
                        setNome(event.target.value)
                    }}
                
                />

                <div>
                    <label className="font-bold" htmlFor="estado_id">Estado:</label>
                    <select 
                        name="estado_id"
                        id="estado_id"
                        value={estado_id} 
                        onChange={(event) => {
                            setEstadoId(event.target.value)
                        }}
                    >

                        <option
                            value=""
                            selected
                            disabled
                        >Selecione:</option>

                        {
                            estados.map((estado) => {
                                return(
                                    <option 
                                        key={estado.id}
                                        value={estado.id}
                                    >
                                        {estado.nome}-{estado.sigla}
                                    </option>
                                )
                            })
                        }

                    </select>
                </div>

                <div className="flex gap-4">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">Atualizar</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"  type="reset">Limpar</button>
                <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  href="/cidades">Voltar</Link>
            </div>

            </form>

        </main>
    )
}