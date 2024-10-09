'use client'
// http://localhost:5000/estados
// axios - lib externa

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllEstados } from "../repository/estados/EstadoRepository";


interface IEstado {
    id: number;
    nome: string;
    sigla: string;
    created_at: string;
    updated_at: string;
}


export default function EstadoTable() {

    const [estados, setEstados] = useState<IEstado[]>([])

    useEffect( () => {

        getAllEstados()
            .then(data => setEstados(data))

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
    
        // Invocar a requisição - delete
        try {
            const response = await fetch('http://localhost:5000/estados', requisicao)
    
            if (response.ok) {
                // Tratar o resultado
                const estado = await response.json();
                const { id } = estado;
    
                window.alert(`Estado excluída com sucesso! Id: ${id}`)
    
                // Atualizar a lista de cidades
                // Retirar o id excluído
                setEstados(estados.filter(
                    item => item.id != id 
                ))
            }
    
        } catch (error) {
            window.alert("Erro na exclusão do estado!")
            console.error(error)
        }
    
    }

    return(

        <table className="border-separate border-spacing-2 border border-slate-400">

            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Sigla</th>
                    <th>Criado em</th>
                    <th>Última atualização</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>

            <tbody>

                {
                    estados.map( (estado) =>{

                        return(
                            <tr key={estado.id}>
                                <td>{estado.id}</td>
                                <td>{estado.nome}</td>
                                <td>{estado.sigla}</td>
                                <td>{estado.created_at}</td>
                                <td>{estado.updated_at}</td>
                                <td>
                                    <Link
                                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        href={`/estados/update/${estado.id}`}
                                    >
                                        Alterar
                                    </Link></td>
                                <td>
                                    <button

                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1.5 px-4 rounded"
                                    
                                    onClick={() =>{

                                        if (window.confirm("Confirma exclusão?")) {
                                            handleDelete(estado.id)
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