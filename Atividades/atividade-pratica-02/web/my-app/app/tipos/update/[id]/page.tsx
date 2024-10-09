"use client"

import Input from "@/app/components/forms/input";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react"
import Link from "next/link";
import { getByIdTipo } from "@/app/repository/tipos/TipoRepository";


interface IUpdateTipoParams {
    params : {
        id: string
    }
}

export default function UpdateTipo( { params }: IUpdateTipoParams ) {
    
    const [ tipo, setTipo ] = useState('');
    const [ fator, setFator ] = useState('');

    const { push } = useRouter();
    

    useEffect( () => {

        getByIdTipo( params.id )
            .then((data) => {
                setTipo(data.tipo)
                setFator(data.fator)
            })

    }, [params])

    const handleSubmit = async (event : FormEvent) => {
        
        event.preventDefault()

        const data = {
            id: parseInt(params.id),
            tipo,
            fator
        }

        const requisicao : RequestInit = {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        }

        try {
            
            const response = await fetch('http://localhost:5000/tipossanguineos', requisicao)

            if (response.ok) {
                const tipo = await response.json();
                const { id } = tipo

                window.alert(`Tipo sanguíneo alterado com sucesso! Id: ${id}`)

                push('/tipos')
            }

        } catch (error) {
            window.alert('Erro na alteração do tipo sanguíneo!')
            console.error(error)
        }

    }

    return (

        <main>
            <h1 className="text-center font-bold py-4">Atualização de tipo sanguíneo:  {tipo}{fator} </h1>

            <form className="grid gap-4" onSubmit={handleSubmit} action="/cadastrar">

                <Input
                    label="Tipo"
                    name="tipo"
                    value={tipo}
                    placeholder="Insira o tipo sanguíneo [A, B, AB, O]"
                    setValue={(event) => {
                        setTipo(event.target.value)
                    }}
                
                />

                <Input
                    label="Fator"
                    name="fator"
                    value={fator}
                    placeholder="Insira o fator Rh [+ , -]"
                    setValue={(event) => {
                        setFator(event.target.value)
                    }}
                
                />

                <div className="flex gap-4">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">Atualizar</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"  type="reset">Limpar</button>
                <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  href="/tipos">Voltar</Link>
            </div>

            </form>

        </main>
    )
}