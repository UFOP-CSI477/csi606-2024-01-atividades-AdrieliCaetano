import IEstado from "./IEstado"


interface ICidade {
    id: number
    nome: string
    created_at?: string
    updated_at?: string

    estado : IEstado
}

export default ICidade