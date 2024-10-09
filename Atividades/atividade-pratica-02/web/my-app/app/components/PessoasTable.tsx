'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import IPessoa from "../types/IPessoa";
import { getAllPessoas } from "../repository/pessoas/PessoaRepository";




export default function PessoaTable() {

    const [pessoas, setPessoas] = useState<IPessoa[]>([])

    useEffect( () => {

        getAllPessoas()
            .then(data => setPessoas(data))

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
            const response = await fetch('http://localhost:5000/pessoas', requisicao)
    
            if (response.ok) {
                const pessoa = await response.json();
                const { id } = pessoa;
    
                window.alert(`Pessoa excluída com sucesso! Id: ${id}`)

                setPessoas(pessoas.filter(
                    item => item.id != id 
                ))
            }
    
        } catch (error) {
            window.alert("Erro na exclusão da pessoa!")
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
                    <th>RG</th>
                    <th>Cidade</th>
                    <th>Tipo Sanguíneo</th>
                    <th>Criado em</th>
                    <th>Última atualização</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>

            <tbody>

                {
                    pessoas.map( (pessoa) =>{

                        return(
                            <tr key={pessoa.id}>
                                <td>{pessoa.id}</td>
                                <td>{pessoa.nome}</td>
                                <td>{pessoa.rua}</td>
                                <td>{pessoa.numero}</td>
                                <td>{pessoa.complemento}</td>
                                <td>{pessoa.rg}</td>
                                <td>{pessoa.cidade.nome}</td>
                                <td>{pessoa.tipo.tipo}{pessoa.tipo.fator}</td>
                                <td>{pessoa.created_at}</td>
                                <td>{pessoa.updated_at}</td>
                                <td>
                                    <Link
                                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        href={`/pessoas/update/${pessoa.id}`}
                                    >
                                        Alterar
                                    </Link></td>
                                <td>
                                    <button

                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1.5 px-4 rounded"
                                    
                                    onClick={() =>{

                                        if (window.confirm("Confirma exclusão?")) {
                                            handleDelete(pessoa.id)
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