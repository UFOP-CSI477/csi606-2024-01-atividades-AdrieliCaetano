'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import ITipo from "../types/ITipo";
import { getAllTipos } from "../repository/tipos/TipoRepository";


export default function TipoTable() {

    const [tipos, setTipos] = useState<ITipo[]>([])

    useEffect( () => {

        getAllTipos()
            .then(data => setTipos(data))

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
            const response = await fetch('http://localhost:5000/tipossanguineos', requisicao)
    
            if (response.ok) {

                const tipo = await response.json();
                const { id } = tipo;
    
                window.alert(`Tipo sanguíneo excluído com sucesso! Id: ${id}`)

                setTipos(tipos.filter(
                    item => item.id != id 
                ))
            }
    
        } catch (error) {
            window.alert("Erro na exclusão do tipo sanguíneo!")
            console.error(error)
        }
    }

    return(

        <table className="border-separate border-spacing-2 border border-slate-400">

            <thead>
                <tr>
                    <th>Id</th>
                    <th>Tipo</th>
                    <th>Fator</th>
                    <th>Criado em</th>
                    <th>Última atualização</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>

            <tbody>

                {
                    tipos.map( (tipo) =>{

                        return(
                            <tr key={tipo.id}>
                                <td>{tipo.id}</td>
                                <td>{tipo.tipo}</td>
                                <td>{tipo.fator}</td>
                                <td>{tipo.created_at}</td>
                                <td>{tipo.updated_at}</td>
                                <td>
                                    <Link
                                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        href={`/tipos/update/${tipo.id}`}
                                    >
                                        Alterar
                                    </Link></td>
                                <td>
                                    <button

                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1.5 px-4 rounded"
                                    
                                    onClick={() =>{

                                        if (window.confirm("Confirma exclusão?")) {
                                            handleDelete(tipo.id)
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