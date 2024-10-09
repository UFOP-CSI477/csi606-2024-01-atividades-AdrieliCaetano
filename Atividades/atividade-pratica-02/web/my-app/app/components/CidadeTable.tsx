'use client'

import Link from "next/link"
import ICidade from "../types/ICidade"
import { useEffect, useState } from "react"


const getAllCidades = async() => {

    const response = await fetch('http://localhost:5000/cidades', {
        cache: 'no-cache'
    })

    return response.json()

}

export default function CidadeTable() {

    // Lista de cidades
    // const cidades : ICidade[] = await getAllCidades()

    const [ cidades, setCidades ] = useState<ICidade[]>([])

    useEffect(() => {

        getAllCidades()
            .then(data => setCidades(data))

    }, [])

    const handleDelete = async( id : number ) => {

        const data = {
            id
        }

        const requisicao : RequestInit = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        // Invocar a requisição - delete
        try {
            const response = await fetch('http://localhost:5000/cidades', requisicao)

            if (response.ok) {
                // Tratar o resultado
                const cidade = await response.json();
                const { id } = cidade;

                window.alert(`Cidade excluída com sucesso! Id: ${id}`)

                // Atualizar a lista de cidades
                // Retirar o id excluído
                setCidades(cidades.filter(
                    item => item.id != id 
                ))
            }

        } catch (error) {
            window.alert("Erro na exclusão da cidade!")
            console.error(error)
        }

    }

    return(

        <table className="border-separate border-spacing-2 border border-slate-400">

            <thead>

                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Estado</th>
                    <th>Criado em</th>
                    <th>Atualizado em</th>
                    <th></th>
                    <th></th>
                </tr>

            </thead>

            <tbody>

                {
                    cidades.map((cidade)=>{
                        return(
                            <tr key={cidade.id}>
                                <td>{cidade.id}</td>
                                <td>{cidade.nome}</td>
                                <td>{cidade.estado.sigla}</td>
                                <td>{cidade.created_at?.toString()}</td>
                                <td>{cidade.updated_at?.toString()}</td>
                                <td>
                                    <Link

                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        href={`/cidades/update/${cidade.id}`}
                                    >
                                        Alterar
                                    </Link></td>
                                <td>
                                    <button

                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1.5 px-4 rounded"
                                    
                                    onClick={() =>{

                                        if (window.confirm("Confirma exclusão?")) {
                                            handleDelete(cidade.id)
                                        }

                                    }}
                                    
                                    >

                                    Excluir
                                    </button>




                                </td>
                            </tr>
                        )
                    })
                }

            </tbody>

        </table>

    )
}