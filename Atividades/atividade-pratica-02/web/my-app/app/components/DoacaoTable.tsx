'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import IDoacao from "../types/IDoacao";
import { getAllDoacoes } from "../repository/doacoes/DoacaoRepository";


export default function DoacaoTable() {

    const [doacoes, setDoacoes] = useState<IDoacao[]>([])

    useEffect( () => {

        getAllDoacoes()
            .then(data => setDoacoes(data))

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
            const response = await fetch('http://localhost:5000/doacoes', requisicao)
    
            if (response.ok) {
                const doacao = await response.json();
                const { id } = doacao;
    
                window.alert(`Doação excluída com sucesso! Id: ${id}`)

                setDoacoes(doacoes.filter(
                    item => item.id != id 
                ))
            }
    
        } catch (error) {
            window.alert("Erro na exclusão da doação!")
            console.error(error)
        }
    
    }

    return(

        <table className="border-separate border-spacing-2 border border-slate-400">

            <thead>
                <tr>
                    <th>Id</th>
                    <th>Pessoa doadora</th>
                    <th>Local de coleta</th>
                    <th>Data</th>
                    <th>Criado em</th>
                    <th>Última atualização</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>

            <tbody>

                {
                    doacoes.map( (doacao) =>{

                        return(
                            <tr key={doacao.id}>
                                <td>{doacao.id}</td>
                                <td>{doacao.pessoa.nome}</td>
                                <td>{doacao.local.nome}</td>
                                <td>{doacao.data}</td>
                                <td>{doacao.created_at}</td>
                                <td>{doacao.updated_at}</td>
                                <td>
                                    <Link
                                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        href={`/doacoes/update/${doacao.id}`}
                                    >
                                        Alterar
                                    </Link></td>
                                <td>
                                    <button

                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1.5 px-4 rounded"
                                    
                                    onClick={() =>{

                                        if (window.confirm("Confirma exclusão?")) {
                                            handleDelete(doacao.id)
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