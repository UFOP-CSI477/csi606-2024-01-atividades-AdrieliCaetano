'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import ILocal from "../types/ILocal";
import { getAllLocais } from "../repository/locais/LocalRepository";

export default function LocalTable() {

    const [ locais, setLocais ] = useState<ILocal[]>([])

    useEffect( () => {

        getAllLocais()
            .then(data => setLocais(data))

    }) 

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

        try {
            const response = await fetch('http://localhost:5000/locaiscoleta', requisicao)
    
            if (response.ok) {
                const local = await response.json();
                const { id } = local;
    
                window.alert(`Local de coleta excluído com sucesso! Id: ${id}`)

                setLocais(locais.filter(
                    item => item.id != id 
                ))
            }
    
        } catch (error) {
            window.alert("Erro na exclusão do local de coleta!")
            console.error(error)
        }

    }

    return(

        <table className="border-separate border-spacing-2 border border-slate-400">

            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Rua</th>
                    <th>Número</th>
                    <th>Complemento</th>
                    <th>Cidade</th>
                    <th>Criado em</th>
                    <th>Última atualização</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>

            <tbody>

                {
                    locais.map( (local) =>{

                        return(
                            <tr key={local.id}>
                                <td>{local.id}</td>
                                <td>{local.nome}</td>
                                <td>{local.rua}</td>
                                <td>{local.numero}</td>
                                <td>{local.complemento}</td>
                                <td>{local.cidade.nome}</td>
                                <td>{local.created_at}</td>
                                <td>{local.updated_at}</td>
                                <td>
                                    <Link
                                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        href={`/locais/update/${local.id}`}
                                    >
                                        Alterar
                                    </Link></td>
                                <td>
                                    <button

                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1.5 px-4 rounded"
                                    
                                    onClick={() =>{

                                        if (window.confirm("Confirma exclusão?")) {
                                            handleDelete(local.id)
                                        }

                                    }}         
                                    >
                                    Excluir
                                    </button>

                                </td>
                            </tr>
                        )

                    } )           

                }

            </tbody>
        </table>

    )

}