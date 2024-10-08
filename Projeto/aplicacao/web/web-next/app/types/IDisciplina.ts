import IUsuario from "./IUsuario"

interface IDisciplina {
    id: number
    nome: string
    sigla_abreviacao: string
    usuario: IUsuario
}

export default IDisciplina